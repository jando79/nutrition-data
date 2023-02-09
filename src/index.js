import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NutritionData from './js/nutrition-data.js';

// Business Logic

function getData (cuisine) {
  NutritionData.getData(cuisine)
  .then(function(response) {
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
  document.querySelector('#showResult').innerText = response;
}


function handleFormSubmission(event) {
  event.preventDefault();
  let cuisine = document.querySelector("input[name='cuisine']:checked").value;
  getData(cuisine);
}

window.addEventListener("load", function () {
  document.querySelector('form#radio-form').addEventListener("submit", handleFormSubmission);
});