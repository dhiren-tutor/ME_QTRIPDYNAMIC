import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventureId = params.get("adventure")
  
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let content=null;
    if(response.ok){
      content = await response.json();
    }
    return content;
  }catch(error){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  //Setting the name
  document.getElementById("adventure-name").innerHTML = adventure.name;

  //setting the subtitle
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //loading the image
  adventure.images.map((image) => {
    let elem = document.createElement('div');
    elem.className = "col-lg-12";
    elem.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
    />
    `;
    document.getElementById("photo-gallery").appendChild(elem);
  });

  //setting the content
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="carousel-inner">

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Prev</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
    
    images.map((image, idx) => {
      
      let elem = document.createElement('div');
      elem.className = `carousel-item ${idx === 0 ? "active" : ""}`;
      elem.innerHTML = `
      <img src=${image}
          alt=""
          srcset=""
          class="activity-card-image pb-3 pb-md-0"
      />`;
      document.getElementById("carousel-inner").appendChild(elem);
    });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons * adventure.costPerHead; 
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let reserveForm = document.getElementById("myForm");
  
  reserveForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formElem = reserveForm.elements;

    let bodyString = JSON.stringify({
      name: formElem["name"].value,
      date: formElem["date"].value,
      person: formElem["person"].value,
      adventure: adventure.id,
    });

    //console.log(JSON.parse(bodyString));
    try{
      let resp = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(resp.ok){
        alert("Success!");
        window.location.reload();
      } else {
        let data = await resp.json();
        alert(`Failed - ${data.message}`);
      }
    }catch(err){
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
