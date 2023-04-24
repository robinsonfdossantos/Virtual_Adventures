
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


  const apiKey = "NyXPP4dWCbpLYnNcxfxBSqiCRCmTlOg0lnpKkCbPn24vwgA0prTsCwJM";

  const form = document.querySelector('search-form');
  const input = document.querySelector('#search-input');
  const searchBtn = document.querySelector('#search-btn');
  const pictures = document.querySelector('#pictures');

  searchBtn.addEventListener('click', () => {
    const query = input.value;
    searchPhotos(query);
  });

  async function searchPhotos(query) {
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;
    const response = await axios.get(url, { headers: { Authorization: apiKey } });
    const data = response.data;

    pictures.innerHTML = '';
    data.photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.src.medium;
      pictures.appendChild(img);
    });
  }