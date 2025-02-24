let userLoginEmail = document.getElementById("logInEmail");
let userLoginPassword = document.getElementById("logInPassword");
let logBtn = document.querySelector("#login-btn");
//let createUserBtn = document.querySelector("#createUser-btn");
let flag = false;
let loginuser = "";
let tempiD;
let tempName;

/*createUserBtn.addEventListener('click', redirct);
function redirct() {
    console.log("hello");
    window.location.herf ="../signup.html";
}
*/
logBtn.addEventListener('click', logIn);
function logIn() {
    if (localStorage.getItem("users")) {
        let searchedUser = JSON.parse(localStorage.getItem("users"));

        for (let index = 0; index < searchedUser.length; index++) {
            if (userLoginEmail.value == searchedUser[index].uEmail && userLoginPassword.value == searchedUser[index].uPassword) {
                flag = true;
                loginuser = `Welcome to your account Mr/Mrs : "${searchedUser[index].uName}"`;
                tempiD = searchedUser[index].uID;
                tempName = searchedUser[index].uName;
                break;
            }

        }

        if (flag) {
            alert(loginuser);
            location.href = "note.html";

        } else {
            alert("Invalid User");
        }
    } else {
        alert("Try to contact with Admin for this issue..")
    }
    localStorage.setItem('logInuser', tempiD);
    localStorage.setItem('logInuserName', tempName);
}

