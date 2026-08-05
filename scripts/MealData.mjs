import { getData, getLocalStorage, setLocalStorage } from "./utilities.mjs";


export default class MealData {
    constructor() {
        this.options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6797faa94emshf02bb3d46934713p1aff6fjsn8a6b4028de73',
                'x-rapidapi-host': 'themealdb.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        }

    }


    // Move these functions to utilities and make them work for both APIs?
    getMealData(keyword) {
        const url = `https://themealdb.p.rapidapi.com/search.php?s=${keyword}`;
        return getData(url, this.options);
    }

    getMealById(id) {
        const url = `https://themealdb.p.rapidapi.com/lookup.php?i=${id}`;
        return getData(url, this.options);
    }

    getRandomMeal() {
        const url = 'https://themealdb.p.rapidapi.com/random.php';
        return getData(url, this.options);

    }

    // Display single meals in a modal that can be closed with a button
    mealTemplate(meal) {
        console.log('Meal data received:', meal);

        const mealDetails = document.querySelector("#meal-details");
        mealDetails.innerHTML = `
        <img src="${meal.strMealThumb}/medium" alt="${meal.strMeal}">
        <h2>${meal.strMeal.toUpperCase()}</h2>
        <h3>Ingredients</h3>
            <p>${meal.strMeasure1} ${meal.strIngredient1}</p>
            <p>${meal.strMeasure2} ${meal.strIngredient2}</p>
            <p>${meal.strMeasure3} ${meal.strIngredient3}</p>
            <p>${meal.strMeasure4} ${meal.strIngredient4}</p>
            <p>${meal.strMeasure5} ${meal.strIngredient5}</p>
            <p>${meal.strMeasure6} ${meal.strIngredient6}</p>
            <p>${meal.strMeasure7} ${meal.strIngredient7}</p>
            <p>${meal.strMeasure8} ${meal.strIngredient8}</p>
            <p>${meal.strMeasure9} ${meal.strIngredient9}</p>
            <p>${meal.strMeasure10} ${meal.strIngredient10}</p>
            <p>${meal.strMeasure11} ${meal.strIngredient11}</p>
            <p>${meal.strMeasure12} ${meal.strIngredient12}</p>
            <p>${meal.strMeasure13} ${meal.strIngredient13}</p>
            <p>${meal.strMeasure14} ${meal.strIngredient14}</p>
            <p>${meal.strMeasure15} ${meal.strIngredient15}</p>
            <p>${meal.strMeasure16} ${meal.strIngredient16}</p>
            <p>${meal.strMeasure17} ${meal.strIngredient17}</p>
            <p>${meal.strMeasure18} ${meal.strIngredient18}</p>
            <p>${meal.strMeasure19} ${meal.strIngredient19}</p>
            <p>${meal.strMeasure20} ${meal.strIngredient20}</p>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        <p><a href="${meal.strSource}">Source</a></p>
        <button id="close-modal" type="button">Close</button>
        <button id="add-fav" type="button">Add Favorite</button>
        <span id="message"><span>
        `;

        // Add meal to localStorage when "Add Favorite" button is clicked
        const addFav = document.getElementById("add-fav");
        const message = document.getElementById("message");
        addFav.addEventListener("click", () => {
            const favItems = getLocalStorage("favs") || [];
            const itemExists = favItems.find((favItem) => favItem.id === meal.idMeal);
            // Only save to favorites if the item doesn't already exist in localStorage
            if (!itemExists) {
                favItems.push({
                    "name": meal.strMeal,
                    "id": meal.idMeal,
                    "details": meal.strSource,
                    "img": meal.strMealThumb
                });

                setLocalStorage("favs", favItems);
                // Display confirmation message when meal is added to favorites
                message.innerHTML = "Your meal was added to favorites!"
            } else {
                // Display a different message if item is already in favorites
                message.innerHTML = "That meal is already in your favorites.";
            }
        });  

        mealDetails.showModal();

        const closeModal = mealDetails.querySelector("#close-modal");
        closeModal.addEventListener("click", () => {
            mealDetails.close();
        });
    }

    // Displays meals (from search results) as cards
    displayMeals(meals) {
        const mealCards = document.querySelector("#meal-cards");
        mealCards.innerHTML = "";
        meals.forEach((meal) => {
            // Only returns healthy meals, not desserts.
            if (meal.strCategory !== "Dessert") {
                let card = document.createElement("div");
                let imgContainer = document.createElement("div");
                let img = document.createElement("img");
                let name = document.createElement("h2");

                card.setAttribute("class", "card");
                name.textContent = meal.strMeal;
                imgContainer.setAttribute("class", "img-container");
                img.setAttribute("src", `${meal.strMealThumb}/medium`);
                img.setAttribute("alt", meal.strMeal);
                img.setAttribute("width", "300");
                img.setAttribute("loading", "lazy");

                card.appendChild(imgContainer);
                imgContainer.appendChild(img);
                card.appendChild(name);

                // Displays modal with recipe when card is clicked
                card.addEventListener("click", () => {
                    this.mealTemplate(meal);
                });

                mealCards.appendChild(card);
            } else {
                mealCards.innerHTML = "No meals found. Please try another search."
            }
            
        })
    }
}
