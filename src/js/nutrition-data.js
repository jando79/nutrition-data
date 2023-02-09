export default class NutritionData {
  static getData(cuisine) {
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${process.env.API_KEY}`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status}`;
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
