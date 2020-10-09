var secondsLabel;
var minutesLabel;
var totalSeconds = 0;

function setTime() {
  secondsLabel = document.getElementById("seconds");
  minutesLabel = document.getElementById("minutes");

  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val){
  var valString = val + "";
  if(valString.length < 2){
    return "0" + valString;
  }
  else{
    return valString;
  }
}


