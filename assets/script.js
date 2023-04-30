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



function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("search-input");
  const searchBox = new google.maps.places.SearchBox(input);

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);0
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    console.log(places)

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete();

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
console.log(data)
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



var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

