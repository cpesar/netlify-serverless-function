const dotenv = require('dotenv').config();

const searchBar = document.querySelector('.search-bar');
const submitBtn = document.querySelector('.submit-btn');
const photoWrapper = document.querySelector('.photo-wrapper');

submitBtn.addEventListener('click', () => {
    getPhoto(searchBar.value)
    searchBar.value = '';
    photoWrapper.innerHTML = '';
})

window.addEventListener('keydown', (e) => {
    if (e.key === 13) {
        getPhoto(searchBar.value)
        searchBar.value = '';
        photoWrapper.innerHTML = "";
    }
})

async function getPhoto(keyword) {
    let apiURL = `/.netlify/functions/getPhotos?keyword=${keyword}`;

    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: { accept: 'application/json' },
        });
        const data = await response.json();

        for (let i = 0; i < data.length; i++) {
            let imageElement = document.createElement('img');
            imageElement.setAttribute('src', `${data.imageURL[i].webformatURL}`);
            photoWrapper.appendChild(imageElement);
        }
    } catch (error) {
        console.log(error);
    }
}