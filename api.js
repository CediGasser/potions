import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts"
const app = new Application()
const router = new Router()

let potions = [
    {name: "Healing"},
    {name: "Speed"},
];

router
    .get("/potions", context => context.response.body = potions)
    .get("/potions/:id", context => {
        const index = potions.findIndex(p => p.id == context.params.id);
        if (index >= 0){
            context.response.body = potions[index]
        } else {
            context.response.status = 404
            context.response.body = `ID ${context.params.id} not found`
        }
    });

app.use(router.routes());
app.use(async context => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/frontend`,
      index: "index.html",
    });
  });
app.listen({ port: 8000 });
