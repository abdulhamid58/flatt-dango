// Your code here
const title = document.getElementById("title");
const filmsList = document.getElementById("films");
const poster = document.getElementById("poster");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const description = document.getElementById("film-info");
const ticketNum = document.getElementById("ticket-num");
const buyBtn = document.getElementById("buy-ticket");

function getFirstMovie() {
  fetch("http://localhost:3000/films/1")
    .then((response) => response.json())
    .then((movie) => appendMovie(movie));
}

function fetchAllMovies() {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((data) => appendAllMovies(data));
}

function appendAllMovies(movies) {
  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    filmsList.appendChild(li);

    li.addEventListener("click", () => {
      appendMovie(movie);
    });
  });
}

function appendMovie(movie) {
  let tickets = movie.capacity - movie.tickets_sold;
  title.textContent = movie.title;
  poster.src = movie.poster;
  runtime.textContent = `${movie.runtime} minutes`;
  showtime.textContent = movie.showtime;
  description.textContent = movie.description;
  ticketNum.textContent = tickets;

  buyBtn.addEventListener("click", () => {
    if (tickets > 0) {
      tickets -= 1;
      ticketNum.textContent = tickets;
    }
  });
}

fetchAllMovies();
getFirstMovie();
