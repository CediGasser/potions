/// <reference lib="dom" />

export async function deleteCart() {
    const data = {
    "firstname": (<HTMLInputElement>document.getElementById("firstname")).value,
    "lastname": (<HTMLInputElement>document.getElementById("lastname")).value,
    "email": (<HTMLInputElement>document.getElementById("email")).value
    }

    const response = await fetch("/api/cart", {
        method: "delete",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.status == 200) {
        location.href = "/index.html";
        alert("Bestellung abgesendet.");
    } else {
        alert(await response.text());
    }
}