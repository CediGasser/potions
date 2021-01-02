import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Potion } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

async function loadPotions(): Promise<Potion[]> {
    const jsonFile = await Deno.readTextFile(`${Deno.cwd()}/src/backend/data/potions.json`);
    return JSON.parse(jsonFile);
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
    });

export const apiRouter = router;