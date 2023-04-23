
/*document.getElementById("search-form").onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("search-input").value;
    console.log("searching", input);
  };
  
  const searchAndDisplay = (place) => {
    // request the api
    // use js to display
    const map = document.getElementById("map");
  };*/
  
  // searchAndDisplay("sydney")


const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const picturesContainer = document.getElementById("pictures");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  const accessToken = "1142155292906244552";
  const limit = 15;
  const apiUrl = `https://api.pinterest.com/v1/search/pins/?access_token=${accessToken}&query=${searchTerm}&limit=${limit}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the data and display the pictures on your page
      picturesContainer.innerHTML = "";
      data.data.forEach(pin => {
        const pictureElement = document.createElement("img");
        pictureElement.src = pin.image.original.url;
        pictureElement.alt = pin.description;
        picturesContainer.appendChild(pictureElement);
      });
    })
    .catch(error => console.error(error));
}); 