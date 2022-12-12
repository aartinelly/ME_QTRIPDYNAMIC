import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  console.log(search);
  const s = search.split("=");
  return s[1];
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // await fetch(config.backendEndpoint)
  console.log(config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);

  try {
    const adventureDetail = await fetch(config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);
    const adventureDetailJson = await adventureDetail.json();
    console.log(adventureDetailJson);
    return adventureDetailJson;
  }
  catch (err) {
    console.log(err);
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  document.getElementById('adventure-content').innerHTML = adventure.content;

  const photo = document.getElementById('photo-gallery');

  adventure.images.forEach((image) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${image}" class="img-fluid activity-card-image" alt="...">
    `
    photo.append(div);
  })

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photo = document.getElementById('photo-gallery');

  photo.innerHTML = `
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="outerParent">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `

  images.forEach((image, index) => {
    const div = document.createElement('div');

    if (index == 0) {
      div.classList.add("carousel-item", "active");
      div.innerHTML = `
    <img src="${image}" class="img-fluid activity-card-image" alt="...">
    `
    }
    else {
      div.classList.add("carousel-item");
      div.innerHTML = `
    <img src="${image}" class="img-fluid activity-card-image" alt="...">
    `
    }

    document.getElementById('outerParent').append(div);
  })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log("adventure is: ", adventure);
  if (adventure.available == true) {
    console.log("hide soldout");
    document.getElementById('reservation-panel-sold-out').style.display = "none";
    document.getElementById('reservation-panel-available').style.display = "block";
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
  }
  else {
    console.log("display sold out");
    document.getElementById('reservation-panel-available').style.display = "none";
    document.getElementById('reservation-panel-sold-out').style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log("calculate adventure ", adventure);
  console.log("no of person ", persons);
  const perPersonPrice = parseInt(adventure.costPerHead);
  const totalPerson = parseInt(persons);
  const totalPrice = perPersonPrice * totalPerson;

  document.getElementById('reservation-cost').innerHTML = totalPrice.toString();

}

//Implementation of reservation form submission
 function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    let form = document.getElementById('myForm');
    form.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    let formData = form.elements;

    let bodyString = JSON.stringify({
      name: formData.name.value,
      date: formData.date.value,
      person: formData.person.value,
      adventure: adventure.id
    })

    try {
      const response = await fetch(config.backendEndpoint + "/reservations/new", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyString
      });       

      const data = await response.json();      
        alert("Success");
        location.reload(true);
      console.log(data);
      // window.history.back();
    
    }
    catch (err) {
      console.log("failed to fetch", err);
      alert("Failed")
    }
    
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true){
    document.getElementById('reserved-banner').style.display = "block";
  }
  else{
    document.getElementById('reserved-banner').style.display = "none";
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
