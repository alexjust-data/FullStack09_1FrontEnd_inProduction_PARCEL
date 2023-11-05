'use strict';

export function renderCharacters(house, characters) {
    const houseElement = document.getElementById(house);
    const charactersList = document.createElement('div');
    charactersList.classList.add('charactersList');
    houseElement.appendChild(charactersList);
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');
        characterElement.innerHTML = `
            <div class="characterImage">
                <img src="${character.image}" alt="${character.name}">
            </div>
        `;
        charactersList.appendChild(characterElement);
    });
}