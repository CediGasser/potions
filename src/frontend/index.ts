/// <reference lib="dom" />

import { Potion } from "../common/types.ts";

export async function loadPotions() {
    const response = await fetch("/api/potions");
    const potions: Potion[] = await response.json();
    console.log(potions);
}