//LOG IN HANDLERS
const url = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php";

var username;
var password;
var failedLogin;
var successfulLogin;

function login(){
  hideMessages();
  var loginButton = document.getElementById("login");
  loginButton.onclick = function() {
    hideMessages();
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    loadSyncPost();
  }
}

function loadSyncPost() {
  var usernameData = "userName=" + username;
  var passwordData = "password=" + password;
  console.log(usernameData + "&" + passwordData);
    var localRequest = new XMLHttpRequest();

//     // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    localRequest.open("POST", url, false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(usernameData + "&" + passwordData);

    // NOTE THAT THE status WILL NOT BE 200 IF THE REQUEST IS FOR A
    // LOCAL FILE.
    if (localRequest.status == 200) {
      var responseJson = JSON.parse(localRequest.responseText);
      if(responseJson["result"] == "invalid"){
        failedLogin.style.visibility = "visible";
      }
      if(responseJson["result"] == "valid"){
        successfulLogin.style.visibility = "visible";
      }

//   // FOR MORE INFORMATION ABOUT JSON SEE http://json.org
//   var responseJson = JSON.parse(localRequest.responseText);
//   successfulLogin.innerHTML = "Your username is: " + responseJson["username"];
    }
}

function hideMessages(){
  failedLogin = document.getElementById("failed-login");
  successfulLogin = document.getElementById("successful-login");
  failedLogin.style.visibility = "hidden";
  successfulLogin.style.visibility = "hidden";
}
