'use strict';

const ENDPOINT = 'https://hp-api.onrender.com/api/characters/house/';

export function getCharacters(house) {
    return fetch(ENDPOINT + house)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        });
};