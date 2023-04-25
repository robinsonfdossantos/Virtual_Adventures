

  document.getElementById("search-form").onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("search-input").value;
    console.log("searching", input);
  };
  
  const searchAndDisplay = (place) => {
 
    const map = document.getElementById("map");
  };
  
  // Ben's Coding section 
  // Google maps Api key: AIzaSyDbvldWkelK0RqgCBY2Q_onev8mN6ZMSV8     
  
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
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

  const form = document.querySelector('search-form');
  const input = document.querySelector('#search-input');
  const searchBtn = document.querySelector('#search-btn');
  const pictures = document.querySelector('#pictures');

  searchBtn.addEventListener('click', () => {
    const query = input.value;
    searchPhotos(query);
  });

  async function searchPhotos(query) {
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=12`;
    const response = await axios.get(url, { headers: { Authorization: apiKey } });
    const data = response.data;

    pictures.innerHTML = '';
    data.photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.src.medium;
      pictures.appendChild(img);
    });
  }


  function saveSearch(){
    const newSearch = $("#search-input").val();
  
    const savedSearch = JSON.parse(localStorage.getItem("")) || [];
  
    if(!savedSearch.includes(newSearch)){
        savedSearch.push(newSearch);
        localStorage.setItem("search", JSON.stringify(savedSearch));
    }
  }

  $("#search-input").on("click", function() {

    const search = document.getElementById("#search-input").value;
    saveSearch();
  });

  saveSearch();