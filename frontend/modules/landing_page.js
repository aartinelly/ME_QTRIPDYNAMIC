import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const cities = await fetch(config.backendEndpoint + "/cities");
  const res = await cities.json();
  return res;
  }
  catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const colEle = document.createElement('div');
  colEle.classList.add("col-6");
  colEle.classList.add("col-md-3");
  
  colEle.innerHTML = `
  <a href="pages/adventures/?city=${id}" class="tile" id="${id}">
  <img src="${image}" class="img-thumbnail" alt="...">
  
  <div class="tile-text">
  <h5>${city}</h5>
  <h6>${description}</h6>
  </div>
  </a>
  `
  const parentEle = document.getElementById('data');
  parentEle.append(colEle);
}

export { init, fetchCities, addCityToDOM };
