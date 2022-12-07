let btn1 = document.getElementById("styleBottom");
// click on button and call getSyyle function
btn1.addEventListener("click", getSyyle);

function getSyyle() {
  document.body.style.backgroundColor = "white";
}

let btn = document.getElementById("searchButtom");
// click on button and call getmovie function
btn.addEventListener("click", getMovie);

//function =getSearch
function getMovie() {
  let movie = document.getElementById("namemovie").value;
  let infomovie = document.getElementById("infomovie");
  let url = "http://www.omdbapi.com/?i=tt3896198&apikey=d10619f6&s=" + movie;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      showMovies(data);
    })
    .catch();
}

function showMovies(data) {
  const moviesEl = document.querySelector(".infomovies");

  data.Search.forEach((element) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("infomovie");
    movieEl.innerHTML = `
<div class="movie_cover_inner">
<img src="${element.Poster}" class="movie_cover" />
</div>
<div class="movie_info">
<div class="movie_title">${element.Title}</div>
<div class="movie_release">${element.Year}</div>
</div>

<button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#exampleModal"
  onClick="getDetails('${element.imdbID}')" style="">Details</button>

`;
    moviesEl.appendChild(movieEl);
  });
}

function getDetails(id) {
  let url = "http://www.omdbapi.com/?apikey=d10619f6&i=" + id;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        "details"
      ).innerHTML += `<div><h1>${data.Title}<h1></div>`;
      /*document.getElementById(
        "details"
      ).innerHTML += `<div><p>${data.Rated}</p></div>`;*/
      document.getElementById(
        "details"
      ).innerHTML += `<div><h6>${data.Released}<h6></div>`;
      document.getElementById(
        "details"
      ).innerHTML += `<div>${data.Actors}</div>`;
      document.getElementById(
        "details"
      ).innerHTML += `<div><p>${data.Plot}<p></div>`;

      document.getElementById(
        "details"
      ).innerHTML += `<div><img src="${data.Poster}"</div>`;
    })
    .catch();
}
