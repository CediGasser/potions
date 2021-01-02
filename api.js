await fetch(`src/backend/potions.json`)
    .then(response=>response.json())
    .then(jsonObject=>console.log(jsonObject));