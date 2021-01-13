/// <reference lib="dom" />

import { Potion, Cart, CartItem } from "../../common/types.ts";
import { loadCartTotal } from "../app.ts";

export async function loadCart() {
    const resp = await fetch("/api/cart");
    const cart: Cart = await resp.json()
    const cartItems: CartItem[] = cart.items;
    const table = document.getElementById("cartTable");

    table.innerHTML = `
    <thead>
    <tr>
        <th>Item</th>
        <th>Unit price</th>
        <th>Amount</th>
        <th>Total</th>
    </tr>
    </thead>`
    cartItems.forEach(async function (cartItem) {
            const resp = await fetch(`/api/potions/${cartItem.id}`);
            const item: Potion = await resp.json();

            const tr: Node = createCartRow(cartItem, item);
            table.appendChild(tr);
        });
    table.innerHTML += `<tfoot><tr id="lastCartRow"><td>Total</td><td></td><td></td><td>CHF ${cart.totalPrice.toFixed(2)}</td></tr><tfoot>`
}

function createCartRow(cartItem: CartItem, potion: Potion): Node {
    const tr = document.createElement("tr");
    tr.id = cartItem.id.toString();

    const tdName = document.createElement("td");
    tdName.innerText = potion.name;

    const tdUnitPrice = document.createElement("td");
    tdUnitPrice.innerText = "CHF " + potion.price.toFixed(2);

    const tdAmount = document.createElement("td");
    const btnMinus = document.createElement("button");
    btnMinus.setAttribute("class", "button");
    btnMinus.innerText = "-";
    btnMinus.addEventListener("click", async event => await minusItemInCart(event));
    const pAmount = document.createElement("p");
    pAmount.innerText = cartItem.amount.toString();
    const btnPlus = document.createElement("button");
    btnPlus.setAttribute("class", "button");
    btnPlus.addEventListener("click", async event => await plusItemInCart(event));
    btnPlus.innerText = "+";
    tdAmount.appendChild(btnMinus);
    tdAmount.appendChild(pAmount);
    tdAmount.appendChild(btnPlus);

    const tdTotal = document.createElement("td");
    tdTotal.innerText = "CHF " + (cartItem.amount * potion.price).toFixed(2);

    tr.appendChild(tdName);
    tr.appendChild(tdUnitPrice);
    tr.appendChild(tdAmount);
    tr.appendChild(tdTotal);

    return tr
}

async function plusItemInCart(event: any) {
    const id = event.srcElement.closest("tr").id;
    await fetch(`/api/cart/${id}`, { 
        method: "post" 
    });
    loadCart();
    loadCartTotal();
}

async function minusItemInCart(event: any) {
    const id = event.srcElement.closest("tr").id;
    await fetch(`/api/cart/${id}`, { 
        method: "delete" 
    });
    loadCart();
    loadCartTotal();
}