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
    if (potion.oldPrice >= 0) {
        document.getElementById("potionOldPrice").textContent = "CHF " + potion.oldPrice;
    }
    document.getElementById("potionPrice").textContent = "CHF " + potion.price;

}