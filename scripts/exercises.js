import ExerciseData from "./ExerciseData.mjs";

const exercises = new ExerciseData();

// Get user input from the search bar & display search results
const searchButton = document.querySelector(".search-icon");
const searchBar = document.querySelector("#search");

async function runSearch() {
    const keyword = searchBar.value.trim();

    if (keyword) {
        try {
            const searchResult = await exercises.getExerciseData(keyword);
            if (searchResult && searchResult.data) {
                exercises.displayExercises(searchResult.data);
            } else {
                const exerciseCards = document.querySelector("#exercise-cards");
                exerciseCards.innerHTML = "<p>No exercises found. Please try a different search.</p>"
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