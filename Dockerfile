FROM hayd/deno:latest
COPY . /app
WORKDIR /app
RUN deno run --unstable --allow-write --allow-read --allow-net tools/builder.ts
CMD ["run", "--allow-net", "--allow-read", "./src/webserver.ts"]