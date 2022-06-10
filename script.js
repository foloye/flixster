//Global Constants & Variables

const apiKey = "64bfb1a66c698edb3631d259e0294901";
let pageNum = 1;
let searchTerm;



//Query Selectors

let gridEl = document.querySelector("#movies-grid");
let cardEl = document.querySelector(".movie-card");
let titleEl = document.querySelector(".movie-title");
let imgEl = document.querySelector(".movie-poster");
let voteEl = document.querySelector(".movie-votes");
let loadEl = document.querySelector("#load-more-movies-btn");
let resetEl = document.querySelector("#reset");
let searchEl = document.querySelector("form");
let searchBarEl = document.querySelector("#searchBar")
let loadFooter = document.querySelector(".load");
let searchTitleEl = document.querySelector("#searchTitle");
var popup = document.getElementById(".popuptext");


searchEl.addEventListener("submit", getMoviesSearch);

searchEl.addEventListener("submit", test);

function test(evt) {
    evt.preventDefault();
    const yas = document.getElementById("searchForm")
    let idk = yas.elements["searchBar"]
    console.log(idk.value)
}

async function getMoviesSearch(evt) { 

    evt.preventDefault();
    /*const form = document.getElementById("searchForm")
    let formContent = form.elements("searchBar")
    let eventVal = formContent.value
    */

    
    let eventVal = searchBarEl.value

    let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=64bfb1a66c698edb3631d259e0294901&language=en-US&query="+eventVal +"&page=1&include_adult=false"
    console.log(apiUrl)
    searchTerm = eventVal;
    let response = await fetch(apiUrl);
    let jsonReponse = await response.json();
    console.log(jsonReponse.results)
    displayMovies(jsonReponse);
    loadFooter.classList.remove("hidden")
    searchTitleEl.innerHTML = 'Showing results for "' + searchTerm + '" ';

}

async function getMovies() {

    let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=64bfb1a66c698edb3631d259e0294901&language=en-US&page=1"

    let response = await fetch(apiUrl);
    let jsonReponse = await response.json();
    displayMovies(jsonReponse);
}
function testClick() {
    console.log("ur so cool");
    popup.classList.toggle("show");
}

function displayMovies(movieData) {
    //console.log(movieData);
    //movieData.results.length
    //gridEl.innerHTML= ""
    if (pageNum == 1){
        cardEl.innerHTML = ""
         

    }
    

    for (let i = 0; i < movieData.results.length; i++) {
        let imgPoster = "https://image.tmdb.org/t/p/w500" + movieData.results[i].poster_path
        cardEl.innerHTML += `
            <div class="movie-card" id="pls">
                <img class="movie-poster" src="${imgPoster}" alt="Movie Poster of ${movieData.results[i].original_title}" onClick ="testClick()">
                <span class="popuptext" id="myPopup">Testting the popup feature</span>
                <h3 class="movie-title">${movieData.results[i].original_title}</h3>
                <h4 class="movie-votes">⭐ ${movieData.results[i].vote_average}/10</h4>  
            </div>
        `
    }
    
}
loadEl.addEventListener("click", showMore); 

async function showMore(){
    console.log("load more pressed");
    console.log(searchTerm)
    pageNum++;
    
    let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=64bfb1a66c698edb3631d259e0294901&language=en-US&query=${searchTerm}&page=${pageNum}&include_adult=false`

    let response = await fetch(apiUrl);
    let jsonReponse = await response.json();
    displayMovies(jsonReponse);
    
}

resetEl.addEventListener("click", clearSearch); 
function clearSearch(){
    pageNum = 1;
    searchTerm;
    loadFooter.classList.add("hidden")
    searchTitleEl.innerHTML = "CURRENTLY SHOWING";
    document.documentElement.scrollTop = 0;
    getMovies();

}

window.onload = function () {
    getMovies()
  }
