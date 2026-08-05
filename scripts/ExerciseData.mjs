import { getData, getLocalStorage, setLocalStorage } from "./utilities.mjs";

export default class ExerciseData {
    constructor() {
        this.options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6797faa94emshf02bb3d46934713p1aff6fjsn8a6b4028de73',
                'x-rapidapi-host': 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        }

    }

    // Returns search results by keyword as a promise
    getExerciseData(keyword) {
        const url = `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises/search?search=${keyword}`;
        return getData(url, this.options);
    }

    // Returns individual exercise data as a promise
    getExerciseById(exerciseId) {
        const url = `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises/${exerciseId}`;
        return getData(url, this.options);
    }

    // Returns a random exercise from an array of all exercises
    async getRandomExercise() {
        const url = "https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises";
        const response = await getData(url, this.options);
        const exercises = response.data || response;
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        console.log(`Random Exercise: ${randomExercise}`);
        return randomExercise;
    }

    // Display single exercises in a modal that can be closed with a button
    exerciseTemplate(exercise) {
        console.log('Exercise data received:', exercise);

        const exerciseDetails = document.querySelector("#exercise-details");
        const instructions = (exercise.instructions || []).map(instruction => `<li>${instruction}</li>`).join("");
        const targetMuscles = (exercise.targetMuscles || []).map(targetMuscle => `<li>${targetMuscle}</li>`).join("");
        const secondaryMuscles = (exercise.secondaryMuscles || []).map(secondaryMuscle => `<li>${secondaryMuscle}</li>`).join("");
        const exerciseTips = (exercise.exerciseTips || []).map(exerciseTip => `<li>${exerciseTip}</li>`).join("");
        const variations = (exercise.variations || []).map(variation => `<li>${variation}</li>`).join("");
        exerciseDetails.innerHTML = `
        <iframe src="${exercise.videoUrl}" allow="autoplay">
        </iframe>
        <h2>${exercise.name}</h2>
        <h3>Overview</h3>
            <p>${exercise.overview}</p>
        <h3>Instructions</h3>
        <ol>
            ${instructions}
        </ol>
        <h3>Target Muscles</h3>
        <ul>
            ${targetMuscles}
        </ul>
        <h3>Secondary Muscles</h3>
        <ul>
            ${secondaryMuscles}
        </ul>
        <h3>Exercise Tips</h3>
        <ul>
            ${exerciseTips}
        </ul>
        <h3>Variations</h3>
        <ol>
            ${variations}
        </ol>
        <button id="close-modal" type="button">Close</button>
        <button id="add-fav" type="button">Add Favorite</button>
        <span id="message"><span>
        `;

        // Add meal to localStorage when "Add Favorite" button is clicked
        const addFav = document.getElementById("add-fav");
        const message = document.getElementById("message");
        addFav.addEventListener("click", () => {
            const favItems = getLocalStorage("favs") || [];
            const itemExists = favItems.find((favItem) => favItem.id === exercise.exerciseId);
            // Only save to favorites if the item doesn't already exist in localStorage
            if (!itemExists) {
                favItems.push({
                    "name": exercise.name,
                    "id": exercise.exerciseId,
                    "details": exercise.overview,
                    "img": exercise.imageUrl
                });

                setLocalStorage("favs", favItems);

                // Display confirmation message when meal is added to favorites
                message.innerHTML = "Your exercise was added to favorites!"
            } else {
                // Display a different message if item is already in favorites
                message.innerHTML = "That exercise is already in your favorites.";
            }
        }); 

        exerciseDetails.showModal();

        const closeModal = exerciseDetails.querySelector("#close-modal");
        closeModal.addEventListener("click", () => {
            exerciseDetails.close();
        });

    }

    // Displays exercises (from search results) as cards
    displayExercises(exercises) {
        const exerciseCards = document.querySelector("#exercise-cards");
        exerciseCards.innerHTML = "";
        exercises.forEach((exercise) => {
            let card = document.createElement("div");
            let imgContainer = document.createElement("div");
            let img = document.createElement("img");
            let name = document.createElement("h2");

            card.setAttribute("class", "card");
            name.textContent = exercise.name;
            imgContainer.setAttribute("class", "img-container");
            img.setAttribute("src", exercise.imageUrl);
            img.setAttribute("alt", exercise.name);
            img.setAttribute("loading", "lazy");

            card.appendChild(imgContainer);
            imgContainer.appendChild(img);
            card.appendChild(name);

            // Displays modal with exercise details when card is clicked
            card.addEventListener("click", async () => {
                const currentExercise = await this.getExerciseById(exercise.exerciseId);
                this.exerciseTemplate(currentExercise.data);
            });

            exerciseCards.appendChild(card);
        })
    }

}