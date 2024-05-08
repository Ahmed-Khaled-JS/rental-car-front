
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function deleteVehicle(vehicleId) {
    try {
        const response = await fetch(`http://localhost:8081/api/vehicle/delete/${vehicleId}`, {
            method: 'DELETE'
            // Add headers if needed
        });
        if (response.ok) {
            // Vehicle deleted successfully
            console.log('Vehicle deleted successfully');
            window.location.reload();
            // Reload or update your UI as needed
        } else {
            // Handle error response
            console.error('Failed to delete vehicle');
        }
    } catch (error) {
        console.error('Error deleting vehicle:', error);
    }
}








const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('serviceProviderId');
console.log(id); // Output: The value of the 'id' query parameter

(async function() {
    const userid = localStorage.getItem("userid")

    data = await getData(`http://localhost:8081/api/vehicle/ownerVehicles/${userid}`); //service provider id here
    temp = "";

   

    for (let i in data.result) {
        temp += `
        
      
        <div class="col-4 p-5  shadow rounded-2 curd  overflow-hidden">
           <div class="inner">
           
           <div class="card-img overflow-hidden"  data-bs-toggle="modal" data-bs-target="#exampleModa2">
           <img src="http://localhost:8081/images/${data.result[i].carCoverImage}" class="image1" alt="BMW" class="w-100 pb-3">
       </div>
      <div class="contant">
      <br>
           <h3 class="pb-2 ">${data.result[i].carName}</h3>
           <p>${data.result[i].carDesc}</p>
           <p class="pb-2">Price: <span class="fw-light">${data.result[i].carPricePerDay} perDay</span></p>
           <div class="card-footer pb-3">
               <a class="btn btn-primary me-2" href="editVechile.html?id=${data.result[i].carTd}"" role="button">Edit</a>
               <button type="button" class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteVehicle(${data.result[i].carTd})" >
                   Delete</button>
           </div>
      </div>
           
           </div>

    </div>
        
        `;
    }

    document.getElementById("vehicles").innerHTML = temp;
})();
