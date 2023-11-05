'use strict';
import { getCharacters } from './api.js';
import { renderCharacters } from './view.js';

const HOUSES = [
    'gryffindor',
    'hufflepuff',
    'ravenclaw',
    'slytherin'
];

function loadCharacters() {
    HOUSES.forEach(house => {
        getCharacters(house)
            .then(data => {
                renderCharacters(house, data.filter(i => i.image).slice(0, 8));
            });
    });
}

loadCharacters();