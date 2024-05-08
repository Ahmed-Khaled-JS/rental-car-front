const signupForm = window.signupForm;

if (localStorage.getItem("token") !== null) {
    var decodetoken = decodeToken(localStorage.getItem('token'));
    console.log(decodetoken);
    localStorage.setItem("userid",decodetoken.userid);
    if(decodetoken.roles[0] === "SERVICE_PROVIDER"){
        window.location.href = 'http://127.0.0.1:5501/ownerHome.html';

    }else{
        window.location.href = 'http://127.0.0.1:5501/basicframwork/carrentals-master/';
    }
}

const app = document.getElementById("app");

var loginform = `
<div class="bg">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body">
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                        <button onclick="hundlesubmit()" type="button" class="btn btn-primary custom-submit-button">Login</button>
                        <p class="plink">you do not have account create one from <a href="#/signup">here</a></p>
                    </form>
                    <div id="error-message" class="alert alert-danger" style="display: none;"></div>

                </div>
            </div>
        </div>
    </div>
</div>
`;
app.innerHTML = loginform;
function showError(message) {
    // Display error message in the UI
    const errorContainer = document.getElementById('error-message');
    errorContainer.innerText = message;
    errorContainer.style.display = 'block'; // Show the error container

}
function renderPage() {
    const route = window.location.hash.slice(1);
    console.log(route);
    console.log(window.location.hash.slice());
    switch (route) {
        case '':
            app.innerHTML = loginform;
            break;
        case '/about':
            app.innerHTML = '<h1>About Page</h1><p>Learn more about us here.</p>';
            break;
        case '/signup':
            app.innerHTML = signupForm;
            break;
        default:
            app.innerHTML = '<h1>404 Not Found</h1><p>Page not found.</p>';
    }
}
let token;
function hundlesubmit(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var formData = {
        email: email,
        password: password
    };
    fetch('http://localhost:8095/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if(data.token ===  "no token"){
                showError(data.message);
            }else{
                token = data.token;
                localStorage.setItem("token",token);
                var decodetoken = decodeToken(token);
                console.log(decodetoken);
                localStorage.setItem("userid",decodetoken.userid);
                if(decodetoken.roles[0] === "SERVICE_PROVIDER"){
                    window.location.href = 'http://127.0.0.1:5501/ownerHome.html';
    
                }else{
                    window.location.href = 'http://127.0.0.1:5501/basicframwork/carrentals-master/';
                }
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            

        });
}
function decodeToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}
function hundlesubmitregister(){
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var password = document.getElementById('password').value;

        // Create an object to hold the form data
        var formData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        // Make the POST request using fetch
        fetch('http://localhost:8095/api/v1/auth/regsister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            token = data.token;
            localStorage.setItem("token",token);
            var decodetoken = decodeToken(token);
            if(decodetoken.roles[0] === "SERVICE_PROVIDER"){
                window.location.href = 'http://127.0.0.1:5501/ownerHome.html';
            }else{
                window.location.href = 'http://127.0.0.1:5501/basicframwork/carrentals-master/';
            }
            // Optionally redirect the user or perform some action after successful signup
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, display error message, etc.
        });
}

window.addEventListener('hashchange', renderPage);
window.addEventListener('DOMContentLoaded', renderPage);