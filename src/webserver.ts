import { Application } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { apiRouter, usableSession } from "./backend/api.ts";
import { fileserver } from "./backend/fileserver.ts";

const app = new Application();

app.use(usableSession);
app.use(apiRouter.routes());
app.use(fileserver);

const port = 443

console.log(`Server running on http://localhost:${port}`);
app.listen({ port: port });
