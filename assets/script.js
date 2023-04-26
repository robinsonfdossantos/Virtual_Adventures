// Ben's Coding section
// Google maps Api key: AIzaSyDbvldWkelK0RqgCBY2Q_onev8mN6ZMSV8

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyDbvldWkelK0RqgCBY2Q_onev8mN6ZMSV8",
});

let map;
let service;
let infowindow;

function initMap() {
  const sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });

  const request = {
    query: "Museum of Contemporary Art Australia",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap();

//Robinson's Pexels' APIkey
const apiKey = "NyXPP4dWCbpLYnNcxfxBSqiCRCmTlOg0lnpKkCbPn24vwgA0prTsCwJM";

const form = document.querySelector("search-form");
const input = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const pictures = document.querySelector("#pictures");

async function searchPhotos(query) {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
  const response = await axios.get(url, { headers: { Authorization: apiKey } });
  const data = response.data.photos;

  const photoColumns = [
    data.slice(0, 5),
    data.slice(5, 10),
    data.slice(10, 15),
  ];

  pictures.innerHTML = "";
  photoColumns.forEach((column) => {
    const col = document.createElement("div");
    col.classList.add("flex-col");
    column.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.src.medium;
      img.classList.add("w-full", "block", "mb-5");
      col.appendChild(img);
    });
    pictures.appendChild(col);
  });
}

// Natasa's coding section

// save the place input to local storage
function saveSearch(place) {
  const limit = 5;
  const savedSearch = JSON.parse(localStorage.getItem("search-history")) || [];

  // [london,sydney,melbourne] -> filteredArray = [london, melbourne]
  // [sydney, ...filteredArray]
  if (savedSearch.includes(place)) {
    const newSearchHistory = [
      place,
      ...savedSearch.filter((location) => location !== place),
    ].slice(0, limit);
    localStorage.setItem("search-history", JSON.stringify(newSearchHistory));
  } else {
    const newSearchHistory = [place, ...savedSearch].slice(0, limit);
    localStorage.setItem("search-history", JSON.stringify(newSearchHistory));
  }
}

const exploreDestination = (place) => {
  // TODO: display destination on google maps

  // get the images from pexels
  searchPhotos(place);
};

const generateHistory = () => {
  const savedSearch = JSON.parse(localStorage.getItem("search-history")) || [];
  const container = document.getElementById("history-buttons-container");
  container.innerHTML = "";

  savedSearch.forEach((place) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = place;
    btn.onclick = () => {
      $("#search-input").val(place);
      saveSearch(place);
      exploreDestination(place);
      generateHistory();
    };
    btn.classList.add(
      "font-semibold",
      "p-3",
      "pl-5",
      "pr-5",
      "mr-5",
      "mb-3",
      "rounded-lg",
      "shadow-lg"
    );
    container.appendChild(btn);
  });
};

generateHistory();

document.getElementById("search-form").onsubmit = (e) => {
  e.preventDefault();
  const newSearch = $("#search-input").val();

  if (!newSearch) return;

  saveSearch(newSearch);
  generateHistory();
  exploreDestination(newSearch);
};
