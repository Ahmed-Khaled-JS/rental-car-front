







document.getElementById("createButton").addEventListener("click",function(event){

    event.preventDefault()
    
    var vehicleName=document.getElementById("exampleFormControlInput1").value
    var vehicleDescripton=document.getElementById("exampleFormControlInput2").value
    var vehicleImage=document.getElementById("formFile")
    var vehicleAddress=document.getElementById("exampleFormControlInput3").value
    var vehiclePassengers=document.getElementById("exampleFormControlInput4").value
    var vehicleLicense=document.getElementById("exampleFormControlInput5").value
    var vehiclePrice=document.getElementById("exampleFormControlInput6").value
    
    
    
    
    
    
    const file = vehicleImage.files[0];
    
    const formData = new FormData();
    
    
    
    formData.append("carName",vehicleName)
    formData.append("carDesc",vehicleDescripton)
    formData.append("carCoverImage",file)
    formData.append("carPricePerDay",vehiclePrice)
    formData.append("carAddress",vehicleAddress)
    formData.append("noOfPassengers",vehiclePassengers)
    formData.append("carLicense",vehicleLicense)
    const userid = localStorage.getItem("userid")
    formData.append("serviceProviderId",userid) //please put here service provider id
    
    
    
       
    
        sendData(formData)
    
    
    
    
    
    
    
        function sendData(data) {
      
            console.log(data);
            
            
                fetch("http://localhost:8081/api/vehicle/add", {
            
                 
                // Adding method type
                method: "POST",
                 
                // Adding body or contents to send
                body: formData//JSON.stringify(data),
                 
                // Adding headers to the request
             /*   headers: {
                    "Content-type": "application/formData; charset=UTF-8"
                }*/
            })
             
            // Converting to JSON
            .then(response => response.json())
             
            // Displaying results to console
            .then((json) =>{

                if(json.message){

                    document.getElementById("addingMovie").innerHTML=json.message

                }

                else{

                    document.getElementById("addingMovie").innerHTML=json.errors;
                }
            
            
           
             
             document.getElementById("addingMovie").classList.remove("d-none")  
    
                console.log(json)
    
                console.log("cfkfkjfkjgkjhhhkhdd");

               /* setTimeout(()=>{
    
                  window.location.href=window.location.href
    
                }, 4000);*/
            
            
            });
            
            
            
            
            
            }
            
            
            
    
    console.log(formData);
    
    
    
    
    })
    
    
    
    
    
    
    
    
    
    
    