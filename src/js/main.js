const API_URL = "https://rickandmortyapi.com/api/character";

const mainContainer = document.querySelector("#main-content"); 
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

function getCharacters(done) {
fetch(API_URL)
.then(response => response.json())
.then(data => done(data.results))
}

getCharacters(characters =>
    characters.forEach(character => {

        console.log(character);
        
    
        const article  = document.createRange().createContextualFragment(
              /*html*/`
            <article style="border: 1px solid #ccc; padding: 15px; margin: 10px; width: 300px; display: inline-block;">
                
                <div> 
                    <img src ="${character.image}" alt="${character.name}" style="width: 100%; border-radius: 8px;">
                </div>

                <h3>${character.name}</h3>
                <p><strong>Estado:</strong> ${character.status}</p>
                <p><strong>Especie:</strong> ${character.species}</p>
                <p><strong>Origen:</strong> ${character.origin.name}</p>

            </article>
            `);

            mainContainer.append(article)
})
);

