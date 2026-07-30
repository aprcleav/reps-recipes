import MealDetails from "./MealDetails.mjs";

function randomMealTemplate(meal) {
    `<img src="${meal[0].strMealThumb}" alt="${meal[0].strMeal}">
    <h2>${meal[0].strMeal}</h2>
    <h3>Ingredients</h3>
    <p>${meal[0].strMeasure1} ${meal[0].strIngredient1}</p>
    <p>${meal[0].strMeasure2} ${meal[0].strIngredient2}</p>
    <p>${meal[0].strMeasure3} ${meal[0].strIngredient3}</p>
    <p>${meal[0].strMeasure4} ${meal[0].strIngredient4}</p>
    <p>${meal[0].strMeasure5} ${meal[0].strIngredient5}</p>
    <p>${meal[0].strMeasure6} ${meal[0].strIngredient6}</p>
    <p>${meal[0].strMeasure7} ${meal[0].strIngredient7}</p>
    <p>${meal[0].strMeasure8} ${meal[0].strIngredient8}</p>
    <p>${meal[0].strMeasure9} ${meal[0].strIngredient9}</p>
    <p>${meal[0].strMeasure10} ${meal[0].strIngredient10}</p>
    <h3>Instructions</h3>
    <p>${meal[0].strInstructions}</p>
    <p><a href="${meal[0].strSource}">Source</a></p>
    `
}
// Need to get user input from the search bar, then call getMealData() and display the results

// Use a modal to display individual recipes? I think so. Add the "add to favorites" button in the modal. Search results will be listed as cards. I think it would be cool to change the favorite icon from an empty heart to a full on it fit is saved in localStorage.

// need to add an event listener to the "get random button" so it will fetch a random recipe.

// I need to write a function that displays the meal data as a card.

const meal = new MealDetails();

const randomMeal = meal.getRandomMeal();
randomMealTemplate(randomMeal);

