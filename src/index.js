import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NutritionData from './js/nutrition-data.js';
import Ingredients from './js/ingredients.js';
import Nutrition from './js/nutrition.js';
import Recipe from './js/recipe.js';

// Business Logic

function getData(cuisine) {
  NutritionData.getData(cuisine)
    .then(function (response1) {
      if (response1) {
        printElements(response1, cuisine);
      } else {
        printError(response1, cuisine);
      }
    });
}

function getIngredients(id) {
  Ingredients.getIngredients(id)
    .then(function (response2) {
      if (response2) {
        printIngredients(response2, id);
      } else {
        printError(response2, id);
      }
    });
}

function getNutrition(id) {
  Nutrition.getNutrition(id)
    .then(function (response3) {
      if (response3) {
        printNutrition(response3, id);
      } else {
        printError(response3, id);
      }
    });
}

function getRecipe(id) {
  Recipe.getRecipe(id)
    .then(function (response4) {
      if (response4) {
        printRecipe(response4, id);
      } else {
        printError(response4, id);
      }
    });
}


// UI Logic
function printError(request, search) {
  document.querySelector('#showResult').innerText = `There was an error accessing cuisines ${search}: ${request.status} ${request.statusText}`;
}

function printElements(response1) {
  console.log(response1.results);
  let id = "";
  let title = "";
  let image = "";
  const element = document.getElementById("div1");
  for (let x in response1.results) {

    id = response1.results[x].id;
    addP(id);

    title = response1.results[x].title;
    addP(title);

    image = response1.results[x].image;
    let img1 = document.createElement("img");
    img1.src = image;
    element.appendChild(img1);
    addP("");
  }
}

function printIngredients(response2) {
  console.log(response2.ingredients);
  let name = "";
  let amount = "";
  let image = "";
  const element = document.getElementById("div1");
  for (let x in response2.ingredients) {

    name = response2.ingredients[x].name;
    addP(name);

    amount = response2.ingredients[x].amount;
    addP(amount);

    image = response2.ingredients[x].image;
    let img1 = document.createElement("img");
    img1.src = image;
    element.appendChild(img1);
    addP("");
  }
}

function printNutrition(response3) {
  console.log(response3.nutrients);
  let name = "";
  let amount = "";
  let unit = "";
  let percentOfDailyNeeds = "";
  const element = document.getElementById("div1");
  for (let x in response3.nutrients) {

    name = response3.nutrients[x].name;
    addP(name);

    amount = response3.nutrients[x].amount;
    addP(amount);

    unit = response3.nutrients[x].unit;
    addP(unit);

    percentOfDailyNeeds = response3.nutrients[x].percentOfDailyNeeds;
    addP(percentOfDailyNeeds);
  }
}

function printRecipe(response4) {
  console.log(response4.name);
  console.log(response4.steps);
  let equipment = "";
  let temperature = "";
  let ingredients = "";
  let number = "";
  let step = "";
  const element = document.getElementById("div1");
  for (let x in response4.steps) {

    equipment = response4.steps[x].equipment.name;
    addP(equipment);

    temperature = response4.steps[x].temperature.number;
    addP(temperature);

    ingredients = response4.steps[x].ingredients;
    addP(ingredients);

    number = response4.steps[x].number;
    addP(number);

    step = response4.steps[x].step;
  }
}

function addP(text) {
  const element = document.getElementById("div1");
  const para = document.createElement("p");
  const node = document.createTextNode(text);
  para.appendChild(node);
  element.appendChild(para);
}


function handleFormSubmission(event) {
  event.preventDefault();
  let cuisine = document.querySelector("input[name='cuisine']:checked").value;
  document.getElementById("div1").innerHTML = "";
  getData(cuisine);
}

function handleFormSubmission1(event) {
  event.preventDefault();
  let id = document.getElementById("id").value;
  document.getElementById("div1").innerHTML = "";
  getIngredients(id);
  getNutrition(id);
  getRecipe(id);
}

window.addEventListener("load", function () {
  document.querySelector('form#radio-form').addEventListener("submit", handleFormSubmission);
  document.querySelector("form#food-id").addEventListener("submit2", handleFormSubmission1);
});