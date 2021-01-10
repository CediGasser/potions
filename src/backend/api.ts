import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Potion, Cart, CartItem } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

async function loadPotions(): Promise<Potion[]> {
    const jsonFile = await Deno.readTextFile(`${Deno.cwd()}/src/backend/data/potions.json`);
    return JSON.parse(jsonFile);
}

async function getTotal(cart: Cart): Promise<number> {
    let total = 0;
    cart.items.forEach(async item => {
        const index = potions.findIndex(p => p.id == item.id);
        const price = potions[index].price;
        total += price * item.amount;
    });
    return total;
}

const potions: Potion[] = await loadPotions();

const router = new Router();
router
    .get("/api/potions", async context => {
        context.response.body = potions;
    })
    .get("/api/potions/:id", async context => {
        const index = potions.findIndex(p => p.id.toString() == context.params.id);
        if (index >= 0){
            context.response.body = potions[index];
        } else {
            context.response.status = 404;
            context.response.body = `Potion with ID: ${context.params.id} not found`;
        }
    })
    .get("/api/images/:image", async context => {
        const image = await Deno.readFile(`${Deno.cwd()}/src/backend/data/images/${context.params.image}`);
        context.response.body = image;
        context.response.headers.set('Content-Type', 'image/png');
    })
    .get("/api/cart", async context => {
        if (await context.state.session.get("cart") == undefined) {
            let cart: Cart = {
                totalPrice: 0,
                items: []
            };
            await context.state.session.set("cart", cart);
        }
        const cart = await context.state.session.get("cart");
        context.response.body = cart;
    })
    .post("/api/cart/:id", async context => {
        const itemId = Number(context.params.id);
        if (itemId != undefined && potions.findIndex(p  => p.id == itemId) >= 0) {
            var cart = await context.state.session.get("cart");
            if (cart == undefined) { 
                cart = {
                    totalPrice: 0,
                    items: []
                };
                await context.state.session.set("cart", cart);
            }
            const index = cart.items.findIndex((item: CartItem) => item.id == itemId);
            if (cart.items[index] == undefined) {
                cart.items.push({ amount:1, id:itemId });
            } else {
                cart.items[index].amount += 1;
            }
            cart.totalPrice = await getTotal(cart);
            context.state.session.set("cart", cart);
            context.response.status = 200;
            context.response.body = cart;
        } else {
            context.response.status = 404;
            context.response.body = `Potion with ID: ${itemId} not found`;
        }
    })
    .delete("/api/cart/:id", async context => {
        const itemId = Number(context.params.id);
        const cart = await context.state.session.get("cart");
        const index = cart.items.findIndex((item: CartItem) => item.id == itemId);
        if (itemId != undefined && index >= 0) {
            if (cart.items[index].amount == 1) {
                cart.items = cart.items.filter((item: CartItem) => item.id !== itemId);
            } else {
                cart.items[index].amount -= 1;
            }
            cart.totalPrice = await getTotal(cart);
            context.state.session.set("cart", cart);
            context.response.status = 200;
            context.response.body = cart;
        } else {
            context.response.status = 404;
            context.response.body = `Potion with ID: ${itemId} not found in cart`;
        }
    })
    .delete("/api/cart", async context => {
        context.state.session.set("cart", {
            totalPrice: 0,
            items: []
        });
        context.response.status = 200;
        context.response.body = context.state.session.get("cart");
    });

export const apiRouter = router;