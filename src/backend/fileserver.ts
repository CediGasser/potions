import { send, Context } from "https://deno.land/x/oak@v6.4.0/mod.ts";

export const fileserver = async (context: Context<Record<string, any>>) => {
    
    const frontendPath = "/src/frontend";

    if(context.request.url.pathname == "/"){
        context.request.url.pathname = "/index.html";
    }
    if(context.request.url.pathname.endsWith(".html")){
        const template = await Deno.readTextFile(`${Deno.cwd()}${frontendPath}/resource/template.html`);
        const page = await Deno.readTextFile(`${Deno.cwd()}${frontendPath}${context.request.url.pathname}`);

        context.response.body = template.replace("<!-- Here goes the content -->", page);
        
    } else{
        await send(
            context,
            context.request.url.pathname,
            { 
                root: `${Deno.cwd()}${frontendPath}`,
                index: "index.html"
            }
        );
    }
};