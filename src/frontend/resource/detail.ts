/// <reference lib="dom" />

import { Potion } from "../../common/types.ts";
import { loadCartTotal } from "../app.ts";

export async function loadDetail() {
    const id = new URLSearchParams(window.location.search).get("potionId"); 
    const response = await fetch(`/api/potions/${id}`);
    const potion: Potion = await response.json();

    console.log(potion);

    document.getElementById("potionName").textContent = potion.name;
    document.getElementById("potionImage").setAttribute("src", potion.image);
    document.getElementById("potionDescription").textContent = potion.description;
    if (potion.oldPrice >= 0) {
        document.getElementById("potionOldPrice").textContent = "CHF " + potion.oldPrice.toFixed(2);
    }
    document.getElementById("potionPrice").textContent = "CHF " + potion.price.toFixed(2);
}

export async function addToCart() {
    const id = new URLSearchParams(window.location.search).get("potionId");
    await fetch(`/api/cart/${id}`, {
        method: "post"
    });
    loadCartTotal();
}