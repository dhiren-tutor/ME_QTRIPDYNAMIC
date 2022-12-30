import config from "../conf/index.js";

async function init() {
  let cities;
  //Fetches list of all cities along with their images and description
  try{
    cities = await fetchCities();
  }catch(err){
    console.log(err)
  }
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url= config.backendEndpoint + "/cities";
  return fetch(url)
  .then( res => {
      return res.json()
  })
  .catch(err => {return null})
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div")
  container.className = "col-3"
  let innerHtml = `<a href="pages/adventures/?city=${id}" id="${id}">
                    <div class="tile>
                      <div class="tile-text text-center>
                      <h5>${city}</h5>
                      <p>${description}</p>
                    </div>
                    <img class="img-responsive" src="${image}"/></div>
                    </a>`
  container.innerHTML = innerHtml
  document.getElementById("data").appendChild(container)
} 
export { init, fetchCities, addCityToDOM };
