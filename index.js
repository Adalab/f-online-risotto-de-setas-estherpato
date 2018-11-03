
'use strict';

let recipeName = document.querySelector('.recipe-name');
let ingredientsList = document.querySelector('.ingredients-list');

function getRecipe() {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
        .then(res => res.json())
        .then(data => {
            const recipe = data.recipe
            paintRecipeData(recipe);
        })

}

function paintRecipeData(recipe) {
    recipeName.innerHTML = recipe.name

    // Ingredientes
    recipe.ingredients.map(ingredient => {
        const newItem = document.createElement('div');

        const newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.name = 'ingredients';
        newInput.value = ingredient.price;

        const newProduct = document.createElement('p');
        const newProductName = document.createTextNode(ingredient.product);
        newProduct.appendChild(newProductName);

        const newBrand = document.createElement('p');
        const newBrandName = document.createTextNode(ingredient.brand)
        newBrand.appendChild(newBrandName);


        const newQuantity = document.createElement('p');
        const newQuantityText = document.createTextNode(ingredient.quantity);
        newQuantity.appendChild(newQuantityText)

        const newPrice = document.createElement('p');
        const newPriceText = document.createTextNode(ingredient.price + ' €');
        newPrice.appendChild(newPriceText);

        newItem.appendChild(newInput)
        newItem.appendChild(newProduct);
        if (ingredient.brand !== undefined) {
            newItem.appendChild(newBrand);
        }
        newItem.appendChild(newQuantity);
        newItem.appendChild(newPrice);
        newItem.appendChild(newInput);
        ingredientsList.appendChild(newItem);
    })

}

getRecipe();



