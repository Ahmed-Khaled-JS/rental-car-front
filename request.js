
var flag=false

var responsingData ;

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function getCarId(id) {
    const response = await fetch(`http://localhost:8081/api/vehicle/getbyid/${id}`);
    const data = await response.json();
    return data;
}

async function getUserId(id) {
    const response = await fetch(`http://localhost:8095/api/v1/auth/getuserbyid/${id}`);
    const data = await response.json();
    return data;
}



async function acceptRequest(requestId) {
    const url = `http://localhost:8090/request/${requestId}/accept`; // Replace with your API endpoint

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.text(); // Get response text
        console.log('Request accepted successfully:', responseData);
        flag = true;
        responsingData = responseData;
        document.getElementById("addingMovie").classList.remove("d-none");
        document.getElementById("addingMovie").innerHTML = responsingData;
        setTimeout(()=>{
    
            window.location.href=window.location.href

          }, 4000);
        return responseData; // Return response data if needed
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw error for handling by caller
    }
}


















// put the service provider id here please

(async function() {
    const userid = localStorage.getItem("userid")
    data = await getData(`http://localhost:8090/request/getrequesteByservid/${userid}`);
    temp = "";

   
console.log(data);
    for (let i in data[1]) {

        console.log(data[1][i].vehicle);
        let vehicleData=await getCarId(data[1][i].vehicle)
        let userData=await getUserId(data[1][i].user)
        console.log(vehicleData);

        temp += `
        
        <div class="request-form">
        <label for="consumer-name">Consumer Name:${userData.name}</label>
        <label for="consumer-name">Consumer Email:${userData.email}</label>
        <label for="consumer-name">Car Name:${vehicleData.carName}</label>
        <label for="car-number">Car License:${vehicleData.carLicense}</label>
        <label for="from">from:${data[1][i].from}</label>
        <label for="to">to:${data[1][i].to}</label>
        <button class="accept-btn" onclick="acceptRequest(${data[1][i].requestId})">Accept</button>
       
    </div>
        
        `;
    }

    document.getElementById("main3").innerHTML = temp;
})();


