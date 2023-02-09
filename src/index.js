import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NutritionData from './js/nutrition-data.js';

// Business Logic

function getData(cuisine) {
  NutritionData.getData(cuisine)
    .then(function (response) {
      if (response) {
        printElements(response, cuisine);
      } else {
        printError(response, cuisine);
      }
    });
}



// UI Logic
function printError(request, search) {
  document.querySelector('#showResult').innerText = `There was an error accessing cuisines ${search}: ${request.status} ${request.statusText}`;
}

function printElements(response) {
  console.log(response.results);
  let id = "";
  let title = "";
  let image = "";
  const element = document.getElementById("div1");
  for (let x in response.results) {

    id = response.results[x].id;
    addP(id);

    title = response.results[x].title;
    addP(title);

    image = response.results[x].image;
    let img1 = document.createElement("img");
    img1.src = image;
    element.appendChild(img1);
    addP("");
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

window.addEventListener("load", function () {
  document.querySelector('form#radio-form').addEventListener("submit", handleFormSubmission);
});