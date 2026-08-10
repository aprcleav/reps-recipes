import { getLocalStorage, setLocalStorage } from "./utilities.mjs";
import ExerciseData from "./ExerciseData.mjs";
import MealData from "./MealData.mjs";

const exercises = new ExerciseData();
const meals = new MealData();

export default class FavsData {
    constructor() {
    }

    // Displays favorites as cards
    displayFavs(favs) {
        const favCards = document.querySelector("#fav-cards");
        favCards.innerHTML = "";
        if (favs.length > 0) {
            favs.forEach((fav) => {
                let card = document.createElement("div");
                let imgContainer = document.createElement("div");
                let img = document.createElement("img");
                let name = document.createElement("h2");
                let removeButton = document.createElement("button");

                card.setAttribute("class", "card");
                name.textContent = fav.name;
                imgContainer.setAttribute("class", "img-container");
                img.setAttribute("src", fav.img);
                img.setAttribute("alt", fav.name);
                // img.setAttribute("width", "200");
                img.setAttribute("loading", "lazy");
                removeButton.setAttribute("id", "remove-button");
                removeButton.textContent = "Remove";

                card.appendChild(imgContainer);
                imgContainer.appendChild(img);
                card.appendChild(name);
                card.appendChild(removeButton);

                // Displays modal with recipe or exercise when card is clicked
                imgContainer.addEventListener("click", async () => {
                    if (fav.id.includes("exr")) {
                        const exercise = await exercises.getExerciseById(fav.id);
                        exercises.exerciseTemplate(exercise.data);
                    } else {
                        const meal = await meals.getMealById(fav.id);
                        meals.mealTemplate(meal.meals[0]);
                    }
                });

                removeButton.addEventListener("click", () => {
                    this.removeFav(fav.id);
                });

                favCards.appendChild(card);

            });
        } else {
            favCards.innerHTML = `<p class="no-favs">You don't have any favorites saved yet.</p>`;
        }
        
    }

    removeFav(favId) {
        const favItems = getLocalStorage("favs") || [];
        const updatedFavs = favItems.filter((fav) => fav.id !== favId);

        setLocalStorage("favs", updatedFavs);
        this.displayFavs(updatedFavs);

    }
}
