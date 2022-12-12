import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const res = await fetch(config.backendEndpoint+ "/reservations");
    const finalRes =await res.json();
    // Place holder for functionality to work in the Stubs
    console.log("fetch reservation" ,await finalRes);
    return await finalRes;
  }
  catch(err){
    return null;
  }
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  if(reservations.length==0){
    document.getElementById('reservation-table-parent').style.display = "none";
    document.getElementById('no-reservation-banner').style.display = "block";
  }
  else{
    document.getElementById('reservation-table-parent').style.display = "block";
    document.getElementById('no-reservation-banner').style.display = "none";
    
    const parentTable = document.getElementById('reservation-table');
    
    reservations.forEach((element, index) => {
      console.log(document.getElementById('no-reservation-banner').children[0].href);
      const d = new Date(element.date)
      const t = new Date(element.time)

      const month = d.getMonth() + 1;
      
      let zone;
      if(t.getHours()>=12){
        zone = "pm";
      }
      else{
        zone = "am";
      }

      let hours = t.getHours() % 12 || 12;
  
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      const tr = document.createElement('tr');

      tr.setAttribute('id',element.id);
      tr.classList.add("reservation-table");

      tr.innerHTML = `
        
          <a href="detail/?adventure=${element.adventure}">${element.id}</a>
          <td>${element.name}</td>
          <td>${element.adventureName}</td>
          <td>${element.person}</td>
          <td>${d.getDate() +"/"+ month +"/"+d.getFullYear()}</td>
          <td>${element.price}</td>
          <td>${t.getDate() + " " + months[t.getMonth()] + " " + t.getFullYear() + ", " + hours + ":" + t.getMinutes() + ":" + t.getSeconds() + " " + zone }</td>
          <td><button class="btn btn-warning rounded-pill">Visit Adventure</button></td>
        
      `
      parentTable.append(tr);
    }); 
  }

}

export { fetchReservations, addReservationToTable };
