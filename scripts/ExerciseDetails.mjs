export default class ExerciseDetails {
    constructor() {

    }

    async getExerciseData(keyword) {
        try {
            const response = await fetch(`https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises/search?search=${keyword}`);
            const data = await response.json();
            console.log(data.Result);
            return data.Result;
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    async getExerciseById(id) {
        try {
            const response = await fetch(`https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises/%7${id}%7D`);
            const data = await response.json();
            console.log(data.Result);
            return data.Result;
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    async getRandomExercise() {
        try {
            const response = await fetch(`https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises`);
            const data = await response.json();
            console.log(data.Result);
            return data.Result;
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }
}