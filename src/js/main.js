// URL base de la API de Rick and Morty para búsqueda
const BASE_API_URL = "https://rickandmortyapi.com/api/character";

// Referencias a elementos del DOM
const mainContainer = document.querySelector("#main-content"); 
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// --- FUNCIÓN DE RENDERIZADO (Mostrar Errores) ---
function displayError(message) {
    // Limpiamos el contenido y mostramos la alerta de Bootstrap
    mainContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger error-alert" role="alert">
                <h4 class="alert-heading">❌ Error</h4>
                <p>${message}</p>
                <hr>
                <p class="mb-0 small">Detalle: Si el problema persiste, revisa la consola para ver el error de red.</p>
            </div>
        </div>
    `;
}


// --- FUNCIÓN DE RENDERIZADO (ÉXITO) ---
function renderCharacters(data) {
    mainContainer.innerHTML = ''; 

    // Manejo de error si la API no devuelve resultados para la búsqueda
    if (!data.results || data.results.length === 0) {
        displayError("No se encontraron resultados para su búsqueda.");
        return;
    }

    // Iteramos y renderizamos las tarjetas
    data.results.forEach(character => {
        const article = document.createRange().createContextualFragment(/*html*/`
        <div class="col">
            <div class="card h-100">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title text-primary">${character.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Status:</strong> ${character.status}</li>
                    <li class="list-group-item"><strong>Gender:</strong> ${character.gender}</li>
                    <li class="list-group-item"><strong>Location:</strong> ${character.location.name}</li>
                </ul>
            </div>
        </div>
        `);
        mainContainer.append(article);
    });
}


// --- FUNCIÓN DE PETICIÓN PRINCIPAL (SIMPLIFICADA) ---
// Ahora llama a renderCharacters directamente.
function getCharacters(searchTerm) {

    // CONSTRUCCIÓN DE LA URL
    const finalUrl = searchTerm 
        ? `${BASE_API_URL}/?name=${encodeURIComponent(searchTerm)}`
        : BASE_API_URL;

    // Muestra un spinner de carga (Bootstrap)
    mainContainer.innerHTML = `
        <div class="col-12 text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Buscando...</span>
            </div>
            <p class="mt-2 text-muted">Buscando personajes...</p>
        </div>
    `;

    fetch(finalUrl)
    .then(response => {
        // MANEJO DE ERRORES HTTP (404, 500, etc.)
        if (!response.ok) {
             if (response.status === 404) {
                 throw new Error("No se encontraron resultados para ese nombre.");
            }
            throw new Error(`Error en el servidor: Estado ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // PROCESAMIENTO EXITOSO: Llama a la función de renderizado
        renderCharacters(data); 
    })
    .catch(error => {
        // CAPTURA DE ERRORES (Red o Errores Lanzados)
        console.error("Error durante la carga de la información:", error.message);
        displayError(error.message); 
    })
    .finally(() => {
        console.log("Petición finalizada");
    });
}


// --- LÓGICA DE EVENTOS (Simplificada en una función anónima) ---

// 💡 Escucha el clic del botón de búsqueda
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Llama a la función principal
        getCharacters(searchTerm);
    } else {
        displayError("Por favor, introduce un nombre de personaje para buscar.");
    }
});

// Escucha la tecla Enter en el input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            getCharacters(searchTerm);
        } else {
            displayError("Por favor, introduce un nombre de personaje para buscar.");
        }
    }
});

// Mensaje inicial al cargar la página
mainContainer.innerHTML = `
    <div class="col-12 text-center my-5">
        <h3 class="text-muted">Usa el buscador para empezar.</h3>
    </div>
`;
