const { files, diagnostics } = await Deno.emit("./src/frontend/app.ts", {
  bundle: "module",
});

await Deno.writeTextFile("./src/frontend/build.app.js", files["deno:///bundle.js"]);
