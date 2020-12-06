const url = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php";
var username;
var password;
var failedLogin;

function login() {
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
  var localRequest = new XMLHttpRequest();

    localRequest.open("POST", url, false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(usernameData + "&" + passwordData);
    if (localRequest.status == 200) {
      var responseJson = JSON.parse(localRequest.responseText);
      if(responseJson["result"] == "invalid"){
        failedLogin.style.visibility = "visible";
      }
      if(responseJson["result"] == "valid"){
        saveToLocalStorage(responseJson);
        window.location.replace("game_grid.html");
      }
    }
}

function hideMessages() {
  failedLogin = document.getElementById("failed-login");
  failedLogin.style.visibility = "hidden";
}

function saveToLocalStorage(responseJson) {
  let loginInfo = responseJson["userName"] + " " + responseJson["timestamp"];
  localStorage.setItem('cs2550timestamp', loginInfo);
}

function clearLocalStorage() {
  let clearLocalStorageButton = document.getElementById("clear-local-storage");
  clearLocalStorageButton.onclick = function() {
    localStorage.clear();
  }
}
