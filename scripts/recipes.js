import MealData from "./MealData.mjs";

const meals = new MealData();

// Display random recipe when "get random" button is clicked
const randomButton = document.querySelector(".random");
randomButton.addEventListener("click", async () => {
    const randomMeal = await meals.getRandomMeal();
    meals.mealTemplate(randomMeal.meals[0]);
});


// Get user input from the search bar & display search results
const searchButton = document.querySelector(".search-icon");
const searchBar = document.querySelector("#search");

async function runSearch() {
    const keyword = searchBar.value.trim();

    if (keyword) {
        try {
            const searchResult = await meals.getMealData(keyword);
            if (searchResult && searchResult.meals) {
                meals.displayMeals(searchResult.meals);
            } else {
                const mealCards = document.querySelector("#meal-cards");
                mealCards.innerHTML = "<p>No meals found. Please try a different search.</p>"
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

// Search runs when search icon is clicked
searchButton.addEventListener("click", runSearch);

//Search runs when Enter key is pressed
searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        runSearch();
    }
});