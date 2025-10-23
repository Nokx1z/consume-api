const BASE_API_URL = "https://rickandmortyapi.com/api/character";

const mainContainer = document.querySelector("#main-content"); 
const searchInput = document.getElementById("search-input"); 
const searchButton = document.getElementById("search-button");

function displayError(m) {
    mainContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center error-alert" role="alert">
                <strong>Error:</strong> ${m}
            </div>
        </div>
    `;
}

function renderCharacters(cs) {
    mainContainer.innerHTML = ''; 

    cs.forEach(character => {
        const article = document.createRange().createContextualFragment(
              /*html*/`
            <article style="border: 1px solid #ccc; padding: 15px; margin: 10px; width: 300px; display: inline-block;">
                
                <div> 
                    <img src ="${character.image}" alt="${character.name}" style="width: 100%; border-radius: 8px;">
                </div>

                <h3>${character.name}</h3>
                <p><strong>Estado:</strong> ${character.status}</p>
                <p><strong>Especie:</strong> ${character.species}</p>
                <p><strong>Origen:</strong> ${character.origin.name}</p>
                <p><strong>Genero:</strong> ${character.gender}</p>

            </article>
            `);
        mainContainer.append(article);
    });
}   

function getCharacters(s = '') {
    mainContainer.innerHTML = '<div class="col-12 text-center my-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

    const url = s.trim() 
        ? `${BASE_API_URL}/?name=${s.trim()}`
        : BASE_API_URL;

    fetch(url)
    .then(r => {
        if (!r.ok) {
            if (r.status === 404) {
                throw new Error(`No se encontró ningún personaje con el nombre "${s}".`);
            }
            throw new Error(`Error en el servidor: Estado ${r.status}`);
        }
        return r.json();
    })
    .then(d => {
        if (d.results) {
            renderCharacters(d.results);
        }
    })
    .catch(e => {
        console.error("Fallo en la petición:", e.message);
        displayError(e.message); 
    });
}

searchButton.addEventListener('click', () => {
    const s = searchInput.value.trim();
    getCharacters(s);
});

searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();
    }
});

getCharacters();
