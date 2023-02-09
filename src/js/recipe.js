export default class Recipe {
  static getRecipe(id) {
    return fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions`)
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