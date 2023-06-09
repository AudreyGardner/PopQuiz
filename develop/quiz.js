let totalSeconds;
//config variables
let secondsToStartWith = 300;
let secondsDeductedNoAnswer = 5;
let secondsDeductedWrongAnswer = 10;
let totalNumQuestions = 10;
let intid;

function changeTotalTime(secLeft, secToAdd) {
  clearInterval(intid);
  startTimer(secLeft + secToAdd);
}

function startTimer(duration) {
  var timer = duration, minutes, seconds;
  intid = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    totalSeconds = (minutes * 60) + seconds;
    document.getElementById("hiddenTotalSeconds").value = totalSeconds;
    document.getElementById("timer").innerHTML = (minutes.toString() + ":" + seconds.toString());

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
//

function createStepList() {
  startTimer(secondsToStartWith);

  let stepHolder = document.getElementById("stepList");
  for (var i = 0; i < totalNumQuestions; i++) {
    let s1 = document.createElement("span");
    s1.setAttribute("class", "step");
    stepHolder.appendChild(s1);
  }
}

createStepList();


var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    // startTimer(60);
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  let wrongMsg = document.getElementById("tdIncorrect_" + (currentTab +1).toString());
  let uncheckedCount = 0;
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].checked == false) {

      // If a field is empty...
      uncheckedCount++;


    }
    else if (y[i].checked == true) {
      if (y[i].value == "1") {
        valid = true;
        break;
      }
      else {
        wrongMsg.setAttribute("style", "background-color: rgb(204, 51, 102); ");
        wrongMsg.innerHTML = 'Incorrect. Please try again.';
        changeTotalTime(parseInt(document.getElementById("hiddenTotalSeconds").value), -15);
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        //y[i].placeholder = "Incorrect.  Timer subtracted "+secondsDeductedWrongAnswer.toString()+" seconds.";

        // and set the current valid status to false
        valid = false;
        break;
      }

    }
  }
  if (uncheckedCount == 3) {
    wrongMsg.setAttribute("style", "background-color: rgb(204, 51, 102); ");
    wrongMsg.innerHTML = 'You must choose an answer.';
    changeTotalTime(parseInt(document.getElementById("hiddenTotalSeconds").value), -5);
    // add an "invalid" class to the field:
    y[i].className += " invalid";
    //y[i].placeholder = "Answer can not be blank! Timer subtracted "+secondsDeductedNoAnswer.toString()+" seconds.";
    // and set the current valid status to false
    valid = false;


  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
