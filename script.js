const btn=document.getElementById("mera-button");

// fetching all elements from html 

// show movie
const wrappers=document.querySelector(".wrapper");

function getMovie(movies){

    let html=`

    <div class="container" id="${encodeURIComponent(movies.imdbID)}">
        <div class="cont-1">
            <p class="year" style="color:#fff;">${movies.Year}</p>
            <a href="https://www.imdb.com/title/${movies.imdbID}"><img src="./imdb.svg" height=20 width=30></a>
            <button class="favourite" onclick="setInLocalStorage('${encodeURIComponent(movies.imdbID)}');">⭐</button>
            </div>

        <div class="cont-2">
            <img src="${movies.Poster} " height="auto" width="200px">
        </div>

        <div class="cont-3">
            <p style:"margin-bottom: 1%">${movies.Type}</p>
            <h3>${movies.Title}</h3>
        </div>
        </div>
    `
    return html;  
}




// fetch movie data

// Function to open the popup
function openPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
  }
  
  // Function to close the popup
  function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  }
  
  // ... Your existing code
  
  async function fetchMovie(movie) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=ec357c06`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data.Search || data.Search.length === 0) {
        openPopup(); // Display the popup if no data is found
        return; // Exit the function
      }
  
      let arr = data.Search;
  
      for (let movie of arr) {
        const html = getMovie(movie);
        wrappers.innerHTML += html;
      }
    } catch (error) {
      // Display an alert if an error occurs
      alert(`Error: ${error.message}`);
    }
  }
  




// when type movie name and click on btn search for tha tparticular movie

let movieSearch=document.querySelector("[search-movie]");

movieSearch.addEventListener('focus',()=>{
    wrappers.innerHTML="";
})

btn.addEventListener('click',()=>{
    
    let movie=document.querySelector("#hello").value;
    
    // wrappers.innerHTML="";
    if(movie==""){
        alert("Enter a movie name");
    }
    
    else{
        

        fetchMovie(movie);

        movieSearch.value="";
      
        

    }


})

// Function to move a movie to the favorites section
function moveToFavorites(movieId) {
  const movieElement = document.getElementById(movieId);
  const favoritesWrapper = document.getElementById('favorites-wrapper');

  if (movieElement && favoritesWrapper) {
    // Clone the movie element
    const clonedElement = movieElement.cloneNode(true);

    // Remove the movie from the main section
    movieElement.remove();

    // Add the cloned element to the favorites section
    favoritesWrapper.appendChild(clonedElement);
  }
}

// Updated setInLocalStorage function
function setInLocalStorage(movieId) {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  var index = favorites.indexOf(movieId);

  if (index === -1) {
    favorites.push(movieId);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Toggle the 'fav' class
  const movieElement = document.getElementById(movieId);

  if (movieElement) {
    if (index === -1) {
      movieElement.classList.add('fav');
      moveToFavorites(movieId); // Move the movie to the favorites section
    } else {
      movieElement.classList.remove('fav');
    }
  } else {
    console.error(`Element with ID ${movieId} not found.`);
  }
}
