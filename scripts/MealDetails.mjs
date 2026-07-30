

export default class MealDetails {
    constructor() {

    }

    getOptions() {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6797faa94emshf02bb3d46934713p1aff6fjsn8a6b4028de73',
                'x-rapidapi-host': 'themealdb.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        }
        return options;
    }

    async getData(url) {
        const options = this.getOptions();

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    randomMealTemplate(meal) {
        `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
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
    <p>${srtInstructions}</p>
    <p><a href="${meal[0].strSource}">Source</a></p>
    `
    }
    

    getMealData(keyword) {
        const url = `https://themealdb.p.rapidapi.com/search.php?s=${keyword}`;
        this.getData(url);
    }

    getMealById(id) {
        const url = `https://themealdb.p.rapidapi.com/lookup.php?i=${id}`;
        this.getData(url);
    }

    getRandomMeal() {
        const url = 'https://themealdb.p.rapidapi.com/random.php';
        this.getData(url);

        const randomButton = document.querySelector(".random");
        randomButton.addEventListener("click", () => {
            return this.randomMealTemplate()
        })
        
    }
}
