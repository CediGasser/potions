/// <reference lib="dom" />

import { Potion } from "../common/types.ts";

export async function loadPotions() {
    const response = await fetch("/api/potions");
    const potions: Potion[] = await response.json();
    
    const overviewDiv = document.getElementById("potionOverview");
    potions.forEach(potion => {
        overviewDiv.appendChild(createPotionCard(potion));
    });
}

function createPotionCard(potion: Potion): Node{
    const div = document.createElement("div");
    const a = document.createElement("a");

    const img = document.createElement("img");
    div.appendChild(img);

    const textDiv = document.createElement("div");
    div.appendChild(textDiv);

    if (potion.oldPrice >= 0){
        const oldPrice = document.createElement("p");
        oldPrice.innerText = "CHF " + potion.oldPrice.toFixed(2);
        textDiv.appendChild(oldPrice);
        oldPrice.setAttribute("class", "potionCardOldPrice");
    }

    const price = document.createElement("p");
    textDiv.appendChild(price);
    price.setAttribute("class", "potionCardPrice");

    const text = document.createElement("p");
    textDiv.appendChild(text);
    text.setAttribute("class", "potionCardName");

    div.appendChild(a);

    div.setAttribute("class", "potionCard");

    a.href = `detail.html?potionId=${potion.id}`;

    img.setAttribute("class", "potionCardImg");
    img.src = potion.image;

    price.innerText = "CHF " + potion.price.toFixed(2);

    textDiv.setAttribute("class", "potionCardTextDiv");

    text.innerText = potion.name;

    return div;
}