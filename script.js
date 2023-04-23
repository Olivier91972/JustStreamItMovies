// Deuxième partie de liens fetch
const url = "http://localhost:8000/api/v1/"
const urtAllTopRated = 'titles/?sort_by=-imdb_score'
const urtFamilyTopRated = 'titles/?genre_contains=family&sort_by=-imdb_score'
const urtMusicRated = 'titles/?genre_contains=music&sort_by=-imdb_score'
const urtAdventureRated = 'titles/?genre_contains=adventure&sort_by=-imdb_score'

// Constantes html
const bestMovieTitle = document.getElementsByClassName("bestMovieTitle")
const bestMovieDesc = document.getElementsByClassName("bestMovieDesc")
const bestMovieImage = document.getElementsByClassName("bestMovieImage")
const bestMovieInfo = document.getElementsByClassName("bestMovieInfo")
const highestScoresMoviesImage = document.getElementsByClassName("highestScoresMoviesImage")
const familyMoviesImage = document.getElementsByClassName("familyMoviesImage")
const musicMoviesImage = document.getElementsByClassName("musicMoviesImage")
const adventureMoviesImage = document.getElementsByClassName("adventureMoviesImage")

// carousels
var slide = document.getElementsByClassName("slide");
var leftArrow = document.querySelectorAll(".carousel__left");
var rightArrow = document.querySelectorAll(".carousel__right");

document.querySelectorAll(".carousel__right").forEach(item => {
    item.addEventListener('click', event => {
        item.parentElement.getElementsByTagName("div")[0].scrollBy(312,0);
    })
})

document.querySelectorAll(".carousel__left").forEach(item => {
    item.addEventListener('click', event => {
        item.parentElement.getElementsByTagName("div")[0].scrollBy(-312,0);
    })
});

//meilleur film + 4 premiers films les mieux notés
fetch(url + urtAllTopRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // meilleur film
        bestMovieImage[0].setAttribute("src", data.results[0].image_url)
        bestMovieImage[0].setAttribute("alt", "Affiche du film " + data.results[0].title)
        bestMovieTitle[0].textContent = data.results[0].title
        fetch(url + "titles/" + data.results[0].id)
            .then(response => response.json())
            .then(data => {
                bestMovieDesc[0].textContent = data.description
                bestMovieInfo[0].setAttribute("datamov", data.url)
            })
        
        // films les mieux notés
        for (let i=0; i<4; i++) {
            highestScoresMoviesImage[i].src = data.results[i+1].image_url
            highestScoresMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i+1].title)
            highestScoresMoviesImage[i].setAttribute("datamov", data.results[i+1].url)
        }
    });

// suite des meilleurs films les mieux notés (3)
fetch(url + urtAllTopRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=4; i<7; i++) {
            highestScoresMoviesImage[i].setAttribute("src", data.results[i-4].image_url)
            highestScoresMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-4].title)
            highestScoresMoviesImage[i].setAttribute("datamov", data.results[i-4].url)
        }
    });

// 5 films famille les mieux notés
fetch(url + urtFamilyTopRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=0; i<5; i++) {
            familyMoviesImage[i].setAttribute("src", data.results[i].image_url)
            familyMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i].title)
            familyMoviesImage[i].setAttribute("datamov", data.results[i].url)
        }
    });

// Deuxième partie des films famille les mieux notés (2)
fetch(url + urtFamilyTopRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=5; i<7; i++) {
            familyMoviesImage[i].setAttribute("src", data.results[i-5].image_url)
            familyMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-5].title)
            familyMoviesImage[i].setAttribute("datamov", data.results[i-5].url)
        }
    });

// 5 films musique les mieux notés
fetch(url + urtMusicRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=0; i<5; i++) {
            musicMoviesImage[i].setAttribute("src", data.results[i].image_url)
            musicMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i].title)
            musicMoviesImage[i].setAttribute("datamov", data.results[i].url)
        }
    });

// suite des films musique les mieux notés (2)
fetch(url + urtMusicRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=5; i<7; i++) {
            musicMoviesImage[i].setAttribute("src", data.results[i-5].image_url)
            musicMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-5].title)
            musicMoviesImage[i].setAttribute("datamov", data.results[i-5].url)
        }
    });

// 5 films d'aventure les mieux notés
fetch(url + urtAdventureRated)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=0; i<5; i++) {
            adventureMoviesImage[i].setAttribute("src", data.results[i].image_url)
            adventureMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i].title)
            adventureMoviesImage[i].setAttribute("datamov", data.results[i].url)
        }
    });

// suite des films d'aventure les mieux notés (2)
fetch(url + urtAdventureRated + "&page=2")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i=5; i<7; i++) {
            adventureMoviesImage[i].setAttribute("src", data.results[i-5].image_url)
            adventureMoviesImage[i].setAttribute("alt", "Affiche du film " + data.results[i-5].title)
            adventureMoviesImage[i].setAttribute("datamov", data.results[i-5].url)
        }
    });

// Fenetre modal
var modal = document.getElementById("modalWindow");
var span = document.getElementsByClassName("close")[0];
var btn = document.getElementsByClassName("bestMovieInfo")[0];

document.querySelectorAll(".category__item").forEach(item => {
    item.addEventListener('click', event => {
        modalInfos(item.getAttribute("datamov"))
    })
});

btn.onclick = function() {
    modalInfos(btn.getAttribute("datamov"))
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.datamov == modal) {
      modal.style.display = "none";
    }
};

function modalInfos(datamov) {
    const image = document.getElementById("modal-image");
    const title = document.getElementById("modal-title");
    const category = document.getElementById("modal-category");
    const date = document.getElementById("modal-date");
    const rate = document.getElementById("modal-rate");
    const lmdb = document.getElementById("modal-lmdb");
    const director = document.getElementById("modal-director");
    const actor = document.getElementById("modal-actor");
    const duration = document.getElementById("modal-duration");
    const country = document.getElementById("modal-country");
    const boxoffice = document.getElementById("modal-boxoffice");
    const summary = document.getElementById("modal-summary");
    fetch(datamov)
        .then(response => response.json())
        .then(data => {
            modal.style.display = "block";
            console.log(data)
            image.setAttribute("src", data.image_url)
            image.setAttribute("alt", "Affiche du film " + data.title)
            title.innerHTML = "<strong>Titre : </strong>" + data.title;
            category.innerHTML = "<strong>Genres :</strong>";
            for(let i=0;i<data.genres.length;i++){
                category.innerHTML += "<li>" + data.genres[i] + "</li>"
            }
            date.innerHTML = "<strong>Date de sortie : </strong>" + data.date_published;
            rate.innerHTML = "<strong>Note : </strong>" + data.rated;
            lmdb.innerHTML = "<strong>Score lmdb : </strong>" + data.imdb_score;
            director.innerHTML = "<strong>Réalisateur(s) :</strong>";
            for(let i=0;i<data.directors.length;i++){
                director.innerHTML += "<li>" + data.directors[i] + "</li>"
            }
            actor.innerHTML = "<strong>Acteurs :</strong>";
            for(let i=0;i<data.actors.length;i++){
                actor.innerHTML += "<li>" + data.actors[i] + "</li>"
            }
            duration.innerHTML = "<strong>Durée : </strong>" + data.duration + " min";
            country.innerHTML = "<strong>Pays d'origine :</strong>";
            for(let i=0;i<data.countries.length;i++){
                country.innerHTML += "<li>" + data.countries[i] + "</li>"
            }
            if (data.worldwide_gross_income != null) {
                boxoffice.innerHTML = "<strong>Résultats au box office : </strong>" + 
                (data.worldwide_gross_income - data.budget) + 
                " " + data.budget_currency;
            } else {
                boxoffice.innerHTML = "<strong>Résultats au box office : </strong> inconnu"
            }
            summary.innerHTML = "<strong>Résumé : </strong>" + data.long_description;
        })
};