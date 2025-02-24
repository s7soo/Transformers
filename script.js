var goodToGo = true;
var allIsGood = [];

let userFName = document.getElementById("fname");
let userLName = document.getElementById("lname");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let userCPassword = document.getElementById("cpassword");


let userLoginEmail = document.getElementById("loginEmail");
let userLoginPassword = document.getElementById("loginPassword");

//let createUserBtn = document.querySelector("#createUser-btn");
let flag = false;
let loginuser = "";
let tempiD;
let tempName;

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

function validation() {
  if (userFName.value != "" && userLName.value != "" && userEmail.value != "" && userPassword.value != "") {
    if (userPassword.value === userCPassword.value) {
      createUser();
    } else {
      alert("password not match");
    }
  } else { alert(" Must Enter All The values !! "); }
}

function callAll() {

  // check for first name

  if(!isEmpty('fname'))
    if(isLettersOnly('fname'))
      goodToGo = true;
    else
     changeText('Enter letters only','fname','l1');
    else
    changeText('first name is empty','fname','l1');
// check for last name
  if(!isEmpty('lname'))
    if(isLettersOnly('lname'))
        goodToGo = true;
    else
     changeText('Enter letters only','lname','l2');
    else
    changeText('first name is empty','lname','l2');  

  // check for email
  if(!isEmpty('email'))
    if(emailCheck('email'))
        goodToGo = true;
    else
     changeText('Invalid Email','email','l3');
    else
    changeText('Email is empty','lname','l3');  
  // check for password
  if(!isEmpty('password'))
    validPassword('password','l4');
  else
     changeText('Password is empty','password','l4'); 
  // check for confirm password
  if(!isEmpty('cpassword'))
    if(validConfirmPassword('password','cpassword','l5'))
      goodToGo = true;
    else
   changeText('Passwords are not the same','cpassword','l5');
  else
  changeText('Passwords is empty','cpassword','l5');  
  
  if (isEveryThingValid()) {
    createUser();
    //console.log(allusers);
    window.location.href = 'login.html';
  }
}




function popup(msg){
  document.getElementById('msg').innerText = msg;
  document.getElementById('alert').classList.remove("hide");
  document.getElementById('alert').classList.add("show");
  document.getElementById('alert').classList.add("showAlert");
  setTimeout(() => {
    document.getElementById('alert').classList.remove("show");
    document.getElementById('alert').classList.add("hide");
    
  }, 1000);
}

function changeText(msg, inputId,labelId){
  var input = document.getElementById(inputId);
  var label = document.getElementById(labelId);
  console.log('Running Change text');
  input.style.border="3px solid red";
  label.innerHTML = msg;
  label.style.marginTop = "-13px";
  label.style.fontSize = '10px';
  label.style.fontWeight = 'bold';
  console.log(document.getElementById(inputId).value);
  setTimeout(() => {
    input.value = '';
    input.style.border = "1px solid black";
    label.style.marginTop = "";
    label.innerHTML = '';
  }, 2000);
}
function isLettersOnly(inputId) {//, errorMessage,labelId
  try{
  var inputElement = document.getElementById(inputId);
  var lettersRegex = /\d/;

  // Test the input against the regular expression
  var onlyLetters = lettersRegex.test(inputElement.value);

  if (onlyLetters) {
    //changeText(errorMessage,inputId,labelId);
    inputElement.value = '';
    goodToGo = false;
    return false;
  } else {
    goodToGo = true;
    return true;
  } 
  }catch (error) {
    //console.error('Error in isLettersOnly function:', error.message);
    return false;
  }
}
function isEmpty(inputId) {//, errorMessage, fn,labelId
  var input = document.getElementById(inputId);
  if (input.value === '') {
    // changeText(errorMessage,inputId,labelId);
    goodToGo = false;
    allIsGood.push(goodToGo);
    return true;
  } else {
    // fn;
    return false;
  }
}
function isEveryThingValid() {
  var good = true;
  for (let i = 0; i < allIsGood.length; i++) {
    if (allIsGood[i] == false) {
      good = false;
    }
  }
  return good;
}
function emailCheck(emailId) {
  var inputElement = document.getElementById(emailId);
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the input against the regular expression
  var validEmail = emailRegex.test(inputElement.value);

  if (inputElement.value !== '' && !validEmail) {
    inputElement.value = '';
    goodToGo = false;
    return false
  } else {
    goodToGo = true;
    return true;
  }
}
function validPassword(passId,labelId) {
  var inputElement = document.getElementById(passId);
  var lengthRegex = /^.{8,}$/;
  var lowercaseRegex = /[a-z]/;
  var uppercaseRegex = /[A-Z]/;
  var numberRegex = /\d/;
  var specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  var meetsLength = lengthRegex.test(inputElement.value);
  var meetsLowercase = lowercaseRegex.test(inputElement.value);
  var meetsUppercase = uppercaseRegex.test(inputElement.value);
  var meetsNumber = numberRegex.test(inputElement.value);
  var meetsSpecialChar = specialCharRegex.test(inputElement.value);

  if (inputElement.value !== '') {
    if (!meetsLength) {
      changeText("Password is less than 8",passId,labelId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsLowercase) {
      changeText("Invalid password",passId,labelId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsUppercase) {
      changeText("Password must contain upper case letter", passId,labelId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsNumber) {
      changeText("Password must contain at least one number",passId,labelId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsSpecialChar) {
      changeText("Invalid password", passId,labelId);
      inputElement.value = '';
      goodToGo = false;
    } else {
      goodToGo = true;
    }
  }
}
function validConfirmPassword(inputId1, inputId2) {
  var pass = document.getElementById(inputId1);
  var cpass = document.getElementById(inputId2);


  if (pass.value !== cpass.value) {
    cpass.value = '';
    goodToGo = false;
    return false;
  } else {
    goodToGo = true;
    return true;
  }
}
function logout() {
  window.location.href = 'login.html';
}

function checkHover(isHovered) {

  var fullname = document.getElementById('fullname');


  if (isHovered) {
    fullname.innerHTML = 'Logout';
    console.log("Mouse is currently hovering over the element.");
    console.log(newName);
  } else {
    fullname.innerHTML = localStorage.getItem("logInuserName");
    console.log("Mouse is not hovering over the element.");
  }
}
function changeName() {

  var fullname = document.getElementById('fullname').innerHTML = localStorage.getItem("logInuserName");
  console.log(fullname);
}
function validateLogin() {
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  if (email == localStorage.getItem("email")) {
    if (password == localStorage.getItem("password")) {
      window.location.href = 'index.html';
    } else {
      changeText("Password is not correct, try again", password);
      password = '';
    }
  } else {
    changeText("email does not exist, try again", email);
    email = '';
  }
}
function sendEmail() {

}
function createUser() {

  let user = {
    uID: userID,
    uName: userFName.value + " " + userLName.value,
    uEmail: userEmail.value,
    uPassword: userPassword.value
  }
  allusers.push(user);
  localStorage.setItem("users", JSON.stringify(allusers));
  localStorage.setItem("id", JSON.stringify(userID));
  alert("User Registered Successfully");
  // location.reload();
}

function logIn() {
  console.log(localStorage.getItem("users"));
  
    if(!isEmpty('loginEmail')){
      if(!isEmpty('loginPassword')){
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
          window.location.href = 'index.html';
        } else {
          changeText("Invalid User email or password", 'loginEmail','lemail');
          changeText("Invalid User email or password", 'loginPassword','lpass');
        }
      } else {
        changeText("No user found, try contact support",'loginEmail','lemail');
      }
      localStorage.setItem('logInuser', tempiD);
      localStorage.setItem('logInuserName', tempName);
      }else{
        changeText("Email not found", 'loginPassword','lpass');
      }
    }else{
        changeText("Email not found", 'loginEmail','lemail');
    }
    
}




