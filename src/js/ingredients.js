export default class Ingredients {
  static getIngredients(id) {
    return fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json`)
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