import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NutritionData from './js/nutrition-data.js';
import Recipe from './js/recipe.js';

// Business Logic

function getData(cuisine) {
  NutritionData.getData(cuisine)
    .then(function (response1) {
      if (response1.toString().includes("Error")) {
        printError(response1);
      } else {
        console.log("we are here");
        printElements(response1);
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
function printError(response1) {
  response1 = response1.toString();
  document.getElementById('showResult').innerText = `There was an error accessing cuisines: ${response1}`;
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

function printRecipe(response4) {
  let title = response4.title;
  addP1(title);
  addP1("Ingredients:")
  for (let x in response4.extendedIngredients) {
    let name = response4.extendedIngredients[x].name;
    let amount = response4.extendedIngredients[x].amount;
    let unit = response4.extendedIngredients[x].unit;
    const element = document.getElementById("div2");
    const para = document.createElement("p");
    const node = document.createTextNode(name + " - " + amount + " " + unit);
    para.appendChild(node);
    element.appendChild(para);
  }

  let instructions = response4.instructions;
  addP1(instructions);
}

function addP(text) {
  const element = document.getElementById("div1");
  const para = document.createElement("p");
  const node = document.createTextNode(text);
  para.appendChild(node);
  element.appendChild(para);
}

function addP1(text) {
  const element = document.getElementById("div2");
  const para = document.createElement("p");
  const node = document.createTextNode(text);
  para.appendChild(node);
  element.appendChild(para);
}



function handleFormSubmission(event) {
  event.preventDefault();
  let cuisine = document.querySelector("input[name='cuisine']:checked").value;
  document.getElementById("div1").innerHTML = "";
  document.getElementById("recipes").removeAttribute("class");
  getData(cuisine);
}

function handleFormSubmission1(event) {
  event.preventDefault();
  let id = document.getElementById("id").value;
  console.log(id);
  console.log("we are here");
  document.getElementById("div1").innerHTML = "";
  //getIngredients(id);
  //getNutrition(id);
  getRecipe(id);
}

window.addEventListener("load", function () {
  document.querySelector('form#radio-form').addEventListener("submit", handleFormSubmission);
  document.getElementById("submitButton").addEventListener("click", handleFormSubmission1);
});