export function renderWithTemplate(template, parentElement) {
    parentElement.innerHTML = template;
}

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("header.html");
    const footerTemplate = await loadTemplate("footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    // Navigation & hamburger Menu
    const nav = document.createElement("nav");
    nav.setAttribute("class", "navigation");
    nav.setAttribute("id", "nav-bar");

    nav.innerHTML = `
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="recipes.html">Recipes</a></li>
        <li><a href="exercises.html">Exercises</a></li>
        <li><a href="favorites.html">Favorites</a></li>
    </ul>`

    // Insert nav after header element
    headerElement.insertAdjacentElement("afterend", nav);
    const navButton = document.querySelector("#ham-button");
    const navBar = document.querySelector("#nav-bar");

    navButton.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navBar.classList.toggle("show");
    });

    // Footer 
    const year = document.querySelector("#year");
    const today = new Date();
    year.innerHTML = today.getFullYear();
    document.getElementById("last-modified").innerHTML = document.lastModified;
}

// Return API options data
export function getOptions(host) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6797faa94emshf02bb3d46934713p1aff6fjsn8a6b4028de73',
            'x-rapidapi-host': host,
            'Content-Type': 'application/json'
        }
    }
    return options;
}

// Returns API promise
export async function getData(url, host) {
    const options = this.getOptions(host);

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Get and set localStorage for saving favorites
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


