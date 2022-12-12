
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  const url = new URLSearchParams(search);
  const city = url.get("city");
  console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    console.log(config.backendEndpoint+"/adventures?city="+city);
  const data = await fetch(config.backendEndpoint+"/adventures?city="+city);
  const adventure = await data.json();
  console.log(adventure);
  return adventure;
  }
  catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log("addDom");
  console.log(adventures);

  const parentEle = document.getElementById('data');
  adventures.forEach((val)=>{
    const divEle = document.createElement('div');
  divEle.classList.add("col-6");
  divEle.classList.add("col-md-3");

  divEle.innerHTML = `
  <a href="detail/?adventure=${val.id}" class="activity-card mb-3" id="${val.id}">
    <img src="${val.image}" class="img-thumbnail" alt="...">
    <p class="category-banner">${val.category}</p>
    <div class="d-md-flex justify-content-between px-3">
      <p>${val.name}</p>
      <p>₹ ${val.costPerHead}</p>
    </div>
    <div class="d-md-flex justify-content-between px-3">
      <p>Duration</p>
      <p>${val.duration} Hours</p>
    </div>
  </a>
  `
  parentEle.append(divEle);
  })

}

function filterByBoth(list, categoryList, low, high) {
  let newList = [];
  categoryList.map((cat)=>{
    let temp = [];
    temp = list.filter((val)=>{
      return val.category===cat && val.duration>=low && val.duration<=high;
    })
   newList = [...newList,...temp];
  })

  return newList;
  
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // if()
  let newlist = [];
  let temp = list.filter((l)=>{
    return l.duration>=low && l.duration<=high;
  })
  newlist = [...newlist,...temp];
  return newlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
console.log("filterByCategory start");
// categoryList = ['Hillside','Party'];
  console.log("categoryList",categoryList);
  let newList = [];
  console.log("newList",newList);
  if(categoryList.length===0){
    return list;
  }
  else{
    categoryList.map((cat)=>{
      let temp = [];
      temp = list.filter((val)=>{
        return val.category===cat;
      })
     newList = [...newList,...temp];
    })

    // console.log("result: ",newList);
    console.log("filter by category end");
    console.log("newList",newList);
    return newList;
  }

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
        console.log("filterSunction start");
        // if(filters.category.length)
        console.log(filters);
        if(filters.category.length!=0 && filters.duration!=""){
          console.log("both are not null");
          const categoryList = filters.category;
          const durationList = filters.duration.split('-');
          const start = durationList[0];
          console.log(start);
          const end = durationList[1];
          console.log(end);

          let filterBoth = filterByBoth(list, categoryList, start, end);
          return filterBoth;
        }
        else if(filters.category.length>0 && filters.duration==""){
          console.log("only category");
          const categoryList = filters.category;
          const filterCategory = filterByCategory(list, categoryList);

          return filterCategory;
        }
        else if(filters.duration!="" && filters.category.length==0){
          const durationList = filters.duration.split('-');
          const start = durationList[0];
          console.log(start);
          const end = durationList[1];
          console.log(end);

          const filterDuration = filterByDuration(list,start,end);
          return filterDuration;
      }

    console.log(filters.duration);
    return list;
    // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  var retrieveFilter = localStorage.getItem('filters');

  // Place holder for functionality to work in the Stubs
  return JSON.parse(retrieveFilter);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log(filters.category);
  let categoryList = filters.category;
  const catList = document.getElementById('category-list');
  categoryList.forEach((fil)=>{
   const cat = document.createElement('div');
   cat.classList.add('category-filter');
   cat.innerHTML = fil;
   catList.append(cat);
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
