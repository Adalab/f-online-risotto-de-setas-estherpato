'use strict';

function getRecipe() {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(res => res.json())
    .then(data => {
        const recipe = data.recipe
        console.log(recipe)
    })
}

getRecipe();



