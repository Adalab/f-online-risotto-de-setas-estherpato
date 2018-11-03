
'use strict';

let recipeName = document.querySelector('.recipe-name');
let ingredientsList = document.querySelector('.ingredients-list');
const selectAllButton = document.querySelector('.select-all-btn');
const unselectAllButton = document.querySelector('.unselect-all-btn');


let price = 0;
let total = 0;
let itemPrice = 0;
let quantity = 1;
let multipleItems = 0;
let shipping = 0;

function sumUp(price) {
    shipping = 7;
    total = price + shipping;
    console.log('total', total)
}

function getMultiply() {
    if (this.value !== 1) {
        alert('solo puedes seleccionar uno');
        this.value = 1;
    }


    //     let checkboxes = document.querySelectorAll('.ingredients-checkbox');
    //     const itemPriceAttr = this.attributes.getNamedItem('price');
    //     const inputCounterWhich = this.attributes.getNamedItem('input-which');
    //     const inputCounterNumber = parseInt(inputCounterWhich);
    //     console.log(inputCounterNumber)
    //     const itemPrice = parseFloat(itemPriceAttr.value);
    //     for (let i = 0; i < checkboxes.length; i++) {
    //         const inputCheckWhich = checkboxes[i].attributes.getNamedItem('input-which');
    //         const inputCheckNumber = parseInt(inputCheckWhich)
    //         console.log(inputCheckNumber)
    //         if (inputCheckNumber === inputCounterNumber) {
    //             console.log('hey')
    //             //     if (inputCheckWhich === inputCounterWhich) {
    //             //         quantity = parseInt(this.value);
    //             //         multipleItems = itemPrice * quantity;
    //             //         sumUp(multipleItems);
    //         }
    //     }
}

function getChecked() {
    itemPrice = parseFloat(this.value);
    if (this.checked) {
        price += itemPrice
        sumUp(price);
    } else if (!this.checked) {
        price -= itemPrice
        sumUp(price);
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
    }
}

function unselectAllHandler(e) {
    e.preventDefault();
    let checkboxes = document.querySelectorAll('.ingredients-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
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