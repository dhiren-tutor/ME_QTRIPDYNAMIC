
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`);
    let content=null;
    if(response.ok){
      content = await response.json();
    }
    return content;
  }catch(error){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((value) => {
  //console.log(value);
  let container = document.createElement("div");
  container.className = "col-6 col-lg-3 mb-4 position-relative";
  let innerHtml = `
                  <a href="detail/?adventure=${value.id}" id="${value.id}">
                    <div class="category-banner">${value.category}</div>
                    <div class="activity-card">
                        <img
                        class="img-responsive"
                        src=${value.image}
                        />
                      <div class="activity-card-text text-md-center w-100 mt-3">
                        <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
                        <h5 class="text-left">${value.name}</h5>
                        <p>${value.costPerHead}</p>
                      </div>
                        <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
                        <h5 class="text-left">Duration</h5>
                        <p>${value.duration}</p>
                      </div>
                      </div>
                    </div>
                    </a>
                    `;
    container.innerHTML = innerHtml
    document.getElementById("data").appendChild(container);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(
    (key) => key.duration > low && key.duration <= high
  );
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(
    adventure => categoryList.includes(adventure.category))
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];

  // Filter by duration and category together
  if(filters["duration"].length > 0 && filters["category"].length > 0){
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  //filters by duration only
  else if(filters["duration"].length > 0){
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  //1. Filters by category only
  else if(filters["category"].length > 0){
    filteredList = filterByCategory(list, filters["category"]);
  }

  else{ 
    filteredList = list;
  }
  return filteredList;
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  //iterates over category filters and inserts catgeory pills into DOM
  filters["category"].forEach((key) => {
    let elem = document.createElement("div");
    elem.className = "catgeory-filter";
    elem.innerHTML = `
                      <div>${key}</div>
                      `;
    document.getElementById("category-list").appendChild(elem); 
  }) 
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
