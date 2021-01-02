import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Potion } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

const potions: Potion[] = [
    {
        "name":"Potion of Strength",
        "description":"Increases player's melee attack damage.",
        "image":"data/images/Potion_of_Strength.gif",
        "price":10
    },
    {
        "name":"Potion of Healing",
        "description":"Restores health.",
        "image":"data/images/Potion_of_Healing.gif",
        "price":10
    },
    {
        "name":"Potion of Invisibility",
        "description":"Renders the player invisible. Equipped and wielded items are still visible.",
        "image":"data/images/Potion_of_Invisibility.gif",
        "price":10
    },
    {
        "name":"Potion of Slow Falling",
        "description":"Causes the player to fall at a slower rate and not take any damage when hitting the ground.",
        "image":"data/images/Potion_of_Slow_Falling.gif",
        "price":10
    },
    {
        "name":"Potion of Night Vision",
        "description":"Makes everything appear to be at the maximum light level,",
        "image":"data/images/Potion_of_Night_Vision.gif",
        "price":10
    },
    {
        "name":"Potion of Leaping",
        "description":"Increases jump height.",
        "image":"data/images/Potion_of_Leaping.gif",
        "price":10
    },
    {
        "name":"Potion of Fire Resistance",
        "description":"Gives immunity to damage from fire, lava, magma blocks, campfires, and blazes' ranged attacks.",
        "image":"data/images/Potion_of_Fire_Resistance.gif",
        "price":10
    },
    {
        "name":"Potion of Slowness",
        "description":"Slows the player to 85% speed.",
        "image":"data/images/Potion_of_Slowness.gif",
        "price":10
    },
    {
        "name":"Potion of Poison",
        "description":"Depletes health by 1♥ every 1.25 seconds.",
        "image":"data/images/Potion_of_Poison.gif",
        "price":10
    }
];

console.log(potions);

const router = new Router();
router
    .get("api/potions", context => {
        context.response.body = potions
    })
    .get("api/potions/:name", context => {
        const index = potions.findIndex(p => p.name == context.params.id);
        if (index >= 0){
            context.response.body = potions[index]
        } else {
            context.response.status = 404
            context.response.body = `ID ${context.params.id} not found`
        }
    });

export const api = router.routes();