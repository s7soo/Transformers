let userName = document.getElementById("formName");
let userEmail = document.getElementById("formEmail");
let userPassword = document.getElementById("formPassword");
let userPassword2 = document.getElementById("formRePassword");
let submitUser = document.querySelector("#submit-btn");

let allusers = [];

let userID;

//check if local Storage is Empty before Create =
if (localStorage.getItem("users")) {
    allusers = JSON.parse(localStorage.getItem("users"));
    userID = JSON.parse(localStorage.getItem("id"));
    userID++;
} else {
    allusers = [];
    userID = 0;
}




submitUser.addEventListener('click', validation());
//  to Valid USER befor Create
function validation() {
    if (userName.value != "" && userEmail.value != "") {
        if (userPassword.value === userPassword2.value) {
            createUser();

        } else {
            alert("password not match");
        }
    } else { alert(" Must Enter All The values !! "); }
}
///
//  to Create USER 

function createUser() {

    let user = {
        uID: userID,
        uName: userName.value,
        uEmail: userEmail.value,
        uPassword: userPassword.value
    }
    allusers.push(user);
    localStorage.setItem("users", JSON.stringify(allusers));
    localStorage.setItem("id", JSON.stringify(userID));
    alert("User added succ");
    location.reload();
}

// 

