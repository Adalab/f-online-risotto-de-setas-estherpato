'use strict';

let recipeName = document.querySelector('.recipe-name');
let ingredientsList = document.querySelector('.ingredients-list');
const selectAllButton = document.querySelector('.select-all-btn');
const unselectAllButton = document.querySelector('.unselect-all-btn');
let itemsNumber = document.querySelector('.items-number');
let printPrice = document.querySelector('.price');
let printShipping = document.querySelector('.shipping');
let printTotal = document.querySelector('.total');
let buyButton = document.querySelector('.buy-btn');

let price = 0;
let total = 0;
let itemPrice = 0;
let quantity = 1;
let multipleItems = 0;
let shipping = 0;


function printText(items, price, shipping, total) {
    itemsNumber.innerHTML = 'Items:' + ' ' + items;
    printPrice.innerHTML = 'Subtotal' + ' ' + price.toFixed(2) + ' ' + '€';
    printShipping.innerHTML = 'Gastos de envío' + ' ' + shipping + ' ' + '€';
    printTotal.innerHTML = 'Total' + ' ' + total.toFixed(2) + ' ' + '€';
    buyButton.innerHTML = 'Comprar ingredientes:' + ' ' + total.toFixed(2) + ' ' + '€';
}

function getMultiply() {
    if (this.value !== 1) {
        alert('solo puedes seleccionar uno');
        this.value = 1;
    }
}

function getChecked() {
    itemPrice = parseFloat(this.value);
    shipping = 7;
    if (this.checked) {
        price += itemPrice
        total = price + shipping;
        printText(1, price, shipping, total);
    } else if (!this.checked) {
        price -= itemPrice
        if (price === 0) {
            shipping = 0
            total = price + shipping;
        } else {
            total = price + shipping;
        }
        printText(1, price, shipping, total);
    }
}

function paintRecipeData(recipe) {
    recipeName.innerHTML = recipe.name

    // Ingredientes
    recipe.ingredients.map((ingredient, index) => {
        const newItem = document.createElement('div');

        const newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.name = 'ingredients';
        newInput.value = ingredient.price;
        newInput.classList.add('ingredients-checkbox');
        newInput.setAttribute('input-which', index);
        newInput.addEventListener('click', getChecked);

        const newCounter = document.createElement('input');
        newCounter.type = 'number';
        newCounter.name = 'counter';
        newCounter.value = 1;
        newCounter.min = 0;
        newCounter.setAttribute('price', ingredient.price);
        newCounter.setAttribute('input-which', index);
        newCounter.classList.add('ingredients-counter')
        newCounter.addEventListener('change', getMultiply);

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

        newItem.appendChild(newCounter);
        newItem.appendChild(newInput);
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

function selectAllHandler(e) {
    e.preventDefault();
    let checkboxes = document.querySelectorAll('.ingredients-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        itemPrice = parseFloat(checkboxes[i].value)
        price += itemPrice;
    }
    shipping = 7;
    total = price + shipping;
    printText(1, price, shipping, total)
}

function unselectAllHandler(e) {
    e.preventDefault();
    let checkboxes = document.querySelectorAll('.ingredients-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    printText(0, 0, 0, 0)
}

function purchaseHandler(e) {
    e.preventDefault();
    if (total !== 0) {
        alert('Tu compra ha sido realizada');
    } else {
        alert('Por favor, selecciona al menos un producto');
    }
}

function getRecipe() {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
        .then(res => res.json())
        .then(data => {
            const recipe = data.recipe
            paintRecipeData(recipe);
        })
}

getRecipe();

selectAllButton.addEventListener('click', selectAllHandler);
unselectAllButton.addEventListener('click', unselectAllHandler);
buyButton.addEventListener('click', purchaseHandler);