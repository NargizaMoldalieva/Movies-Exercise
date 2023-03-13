let movies = [
  {
    title: "Hercules",
    img: "https://www.cinema.de/sites/default/files/styles/schema_org/public/sync/cms3.cinema.de/imgdb/moviedb/70/4bb7b8c54dfad005defa863f04901e2a.jpeg?itok=5TXVBEE8",
    rating: 5,
    id: new Date().getTime().toString(),
  },

  {
    title: "Aladdin",
    img: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/89DF7B0A1A6E14F82B9D91503F7FD18E24D795CD5BD5DA7AC353AEF140018106/scale?width=506&aspectRatio=2.00&format=jpeg",
    rating: 5,
    id: new Date().getTime().toString(),
  },
  {
    title: "Shrek",
    img: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81zg+bAdjVS._RI_.jpg",
    rating: 5,
    id: new Date().getTime().toString(),
  },
];
const movieList = document.getElementById("movie-list");

// Storage
const moviesStorageName = "MOVIE";
sessionStorage.setItem(moviesStorageName, JSON.stringify(movies));
let moviesFromLocalStorageString = sessionStorage.getItem(moviesStorageName);

// Storage
if (Array.isArray(JSON.parse(moviesFromLocalStorageString))) {
  movies = JSON.parse(moviesFromLocalStorageString);
} else {
  movies = [];
}
// Проверка онлайн и присвоение массиву значения. Локальная память удаляется
if (navigator.onLine) {
  localStorage.removeItem(moviesStorageName);
  console.log("online");
}
// Проверка онлайн и присвоение массиву значения. Локальная память удаляется
removeStupidValues(movies);
// Присвоение сохраненного массива
if (movies.length > 0) {
  movies.forEach((element) => {
    renderMovie(element);
  });
}
// Присвоение сохраненного массива

function createMovieItem(movie) {
  const { title, img, rating, id } = movie;
  const li = document.createElement("li");
  li.className = "movie-element";
  const imgContainer = document.createElement("div");
  imgContainer.className = "movie-element__image";
  const imgItem = document.createElement("img");
  imgItem.setAttribute("src", img);
  imgItem.alt = title;

  const infoContainer = document.createElement("div");
  infoContainer.className = "movie-element__info";

  const titleNode = document.createElement("h2");
  titleNode.textContent = title;

  const ratingNode = document.createElement("p");
  ratingNode.textContent = `${rating}/5 stars`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn--danger";
  deleteBtn.addEventListener("click", (deletebuttons) => {
    deletebuttons.target.parentElement.parentElement.remove();
    movies = movies.filter((item) => item.id !== id);
  });

  imgContainer.appendChild(imgItem);
  infoContainer.appendChild(titleNode);
  infoContainer.appendChild(ratingNode);
  infoContainer.appendChild(deleteBtn);
  li.appendChild(imgContainer);
  li.appendChild(infoContainer);
  console.log(movies);
  return li;
}

const addMovieHandler = () => {
  const titleInput = document.getElementById("title");
  const imgInput = document.getElementById("image-url");
  const ratingInput = document.getElementById("rating");
  const newId = ratingInput + new Date().getTime().toString();
  const ID = newId.replace(/ /g, "");
  const data = {
    id: ID,
    title: titleInput.value,
    img: imgInput.value,
    rating: ratingInput.value,
  };
  removeStupidValues(movies);
  movies.push(data);
  renderMovie(data);
  actionOnOffline(movies);
  closeModalHandler();
};

function renderMovie(data) {
  const movieItem = createMovieItem(data);
  movieList.appendChild(movieItem);
  if (movies.length !== 0) {
    const entryText = document.getElementById("entry-text");
    entryText.style.display = "none";
  }
}

const openModalHandler = () => {
  const backdrop = document.getElementById("backdrop");
  backdrop.classList.add("visible");

  const modal = document.getElementById("add-modal");
  modal.classList.add("visible");

  const addMovieBtn = document.getElementById("add-movie-btn");
  addMovieBtn.addEventListener("click", addMovieHandler);
};

const closeModalHandler = () => {
  const backdrop = document.getElementById("backdrop");
  backdrop.classList.remove("visible");

  const modal = document.getElementById("add-modal");
  modal.classList.remove("visible");
};
const openModalBtn = document.getElementById("openModalBtn");
openModalBtn.addEventListener("click", openModalHandler);

const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", closeModalHandler);

function actionOnOffline(element) {
  if (navigator.onLine) {
  } else {
    sessionStorage.setItem(moviesStorageName, JSON.stringify(element));
  }
}

if (navigator.onLine) {
  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    sessionStorage.setItem(moviesStorageName, JSON.stringify(movies));
  });
} else {
  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    sessionStorage.setItem(moviesStorageName, JSON.stringify(movies));
  });
}
removeStupidValues(movies);

function removeStupidValues(element) {
  if (Array.isArray(element)) {
  } else element = [];
}
