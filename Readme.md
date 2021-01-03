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
`/api/potions/:id` returns one Potion with according id. Example: `/api/potions/3`

`GET`
`/api/images/:name` returns image of a Potion: `/api/images/Potion_of_Slow_Falling.gif`

## Templating ##
Eine Herausforderung war, das HTML zu Modularisieren. Es soll nicht immer wieder das Selbe HTML-Grundgerüst gebaut werden, das wäre ja dann redundant. Für das erhielten wir lediglich das Stichwort "Templating". Da ich nicht eine grobe Template-Engine einbauen wollte, habe ich selbst etwas kleines in `fileserver.ts` entwickelt.

## Typen ##
```json
type Potion = {
    name: string,
    description: string,
    image: string,
    price: number,
    id: number
}
```