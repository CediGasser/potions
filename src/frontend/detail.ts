/// <reference lib="dom" />

import { Potion } from "../common/types.ts";

export async function loadDetail(id: number) {
    const response = await fetch(`/api/potions/${id}`);
    const potion: Potion = await response.json();
    console.log(potion);
}