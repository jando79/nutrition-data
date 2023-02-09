export default class Nutrition {
  static getNutrition(id) {
    return fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        return response.json();
      }
  })
  .catch(function(error) {
    return error;
  });
}
}