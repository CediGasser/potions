export { loadPotions } from "./resource/index.ts";
export { loadDetail, addToCart } from "./resource/detail.ts";
export { loadCart } from "./resource/cart.ts";
export { deleteCart } from "./resource/checkout.ts";

export async function loadCartTotal() {
    const p = document.getElementById("cartTotal");
    const resp = await fetch("/api/cart");
    p.innerText = "CHF " + parseFloat((await resp.json()).totalPrice).toFixed(2);
}