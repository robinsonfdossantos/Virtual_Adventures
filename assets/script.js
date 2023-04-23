document.getElementById("search-form").onsubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById("search-input").value;
  console.log("searching", input);
};

const searchAndDisplay = (place) => {
  // request the api
  // use js to display
  const map = document.getElementById("map");
};

// searchAndDisplay("sydney")
