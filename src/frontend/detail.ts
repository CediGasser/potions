/// <reference lib="dom" />

import { Potion } from "../common/types.ts";

export async function loadDetail() {
    const id = new URLSearchParams(window.location.search).get("potionId"); 
    const response = await fetch(`/api/potions/${id}`);
    const potion: Potion = await response.json();

    console.log(potion);

    document.getElementById("potionName").textContent = potion.name;
    document.getElementById("potionImage").setAttribute("src", potion.image);
    document.getElementById("potionDescription").textContent = potion.description;
    document.getElementById("potionPrice").textContent = "CHF " + potion.price;
    if (potion.olcPrice != undefined) {
        document.getElementById("potionOldPrice").textContent = "CHF " + potion.olcPrice;
    }
}