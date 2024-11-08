let inputEl = document.getElementById("searchInput");
let mainSearchResultsEl = document.getElementById("mainSearchResults");
let spinnerEl = document.getElementById("spinner");
let noResultsEl = document.getElementById("noResults");
let bookHeadEl = document.getElementById("bookHead");
let searchResultsEl = document.getElementById("searchResults");

function bookSearch(book) {
  let divEl = document.createElement("div");
  divEl.classList.add("p-3", "text-center");
  divEl.style.width='200px'
  divEl.style.height='250px'
  searchResultsEl.appendChild(divEl);

  let imgEl = document.createElement("img");
  imgEl.src = book.imageLink;
  imgEl.style.width = "100%";
  imgEl.style.height = "100%";
  divEl.appendChild(imgEl);

  let pEl = document.createElement("p");
  pEl.textContent = book.author;
  divEl.appendChild(pEl);
}

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let inputValue = inputEl.value;
    if (inputValue === "") {
      noResultsEl.classList.remove("d-none");
    } else {
      noResultsEl.classList.add("d-none");
      let url = "https://apis.ccbp.in/book-store?title=" + inputValue;
      const options = {
        method: "GET",
      };
      spinnerEl.classList.toggle("d-none");
      fetch(url, options)
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData.search_results[0]===undefined) {
            noResultsEl.classList.remove("d-none");
            spinnerEl.classList.add('d-none')
          } else {
            bookHeadEl.classList.remove("d-none");
            spinnerEl.classList.toggle("d-none");
            for (let data of jsonData.search_results) bookSearch(data);
          }
        });
    }
  }
});
