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

// Get and set localStorage for saving favorites
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


