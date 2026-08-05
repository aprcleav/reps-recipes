import FavsData from "./FavsData.mjs";
import { getLocalStorage } from "./utilities.mjs";

const favs = new FavsData();
const favItems = getLocalStorage("favs") || [];

favs.displayFavs(favItems);
