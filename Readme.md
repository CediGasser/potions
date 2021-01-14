# Webshop Projekt für Modul 133
Ziel ist eine Web Applikation mit JavaScript bzw. TypeScript umzusetzen, welche folgende
Herausforderungen beinhaltet:
- Aufteilung in Frontend und Backend (API)
- Anzeige von Daten aus einer Datenquelle (In-Memory-Speicher)
- Navigation innerhalb mehrerer Pages (mit gleichbleibendem Grunddesign -> Selbes Stylesheet)
- Session-Handling
- Formularvalidierung

## Applikations-Start ##
Sie können die Applikation unter Ubuntu durch Ausführen des Start-Scripts starten:
`./start.sh`

Alternativ können Sie die beiden Zeilen des Scripts auch manuell ausführen:

`deno run --allow-read --allow-write --unstable ./tools/builder.ts`

(transpiliert und bundled die Frontend-JavaScript-Datei).

`deno run --allow-net --allow-read ./src/webserver.ts`

(startet den Webserver)

## Applikation aufrufen ##
Nachdem die Applikation gestart wurde, können Sie diese unter `http://localhost:8000` aufrufen

## API Dokumentation ##
`GET`
`/api/potions` returns the list of all Potions from `potions.json`

`GET`
`/api/potions/:id` returns one Potion from `potions.json` with according id. Example request: `/api/potions/3`

`GET`
`/api/images/:name` returns image of a Potion. Example request: `/api/images/Potion_of_Slow_Falling.gif`

`GET`
`/api/cart` return cart from session.

`POST`
`/api/cart/:id` adds a Potion to the cart. Example request: `/api/cart/3` adds the potion with id `3` to the cart.

`DELETE`
`/api/cart/:id` removes a Potion from the cart. Example request: `/api/cart/3` removes the Potion with id `3` from the cart.

`DELETE`
`/api/cart` clears cart if the data provided is valid. Example request body: `{"firstname": "Max", "lastname": "Muster", "email": "max.muster@example.com" }`

## Templating ##
Eine Herausforderung war, das HTML zu Modularisieren. Es soll nicht immer wieder das Selbe HTML-Grundgerüst gebaut werden, das wäre ja dann redundant. Für das erhielten wir lediglich das Stichwort "Templating". Da ich nicht eine grobe Template-Engine einbauen wollte, habe ich selbst etwas kleines in `fileserver.ts` entwickelt.

## Typen ##
Diese Typen in `common/types.ts` werden vom front- und backend importiert.
```js
export type Potion = {
    name: string,
    description: string,
    image: string,
    price: number,
    oldPrice: number,
    id: number
}

export type CartItem = {
    id: number,
    amount: number
}

export type Cart = {
    totalPrice: number,
    items: CartItem[]
}
```