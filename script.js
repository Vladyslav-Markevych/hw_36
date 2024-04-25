import {
  standartTime,
  hourStandart,
  minuteStandart,
  secondStandart,
} from "./constants.js";
const setButton = document.getElementById("setButton");
setButton.addEventListener("click", setTimer);
let allTime = standartTime;
let resume = false;

// закрытие модалки
document.getElementById("close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// add listener for all input
document.getElementById("hour").addEventListener("input", hour);
document.getElementById("minute").addEventListener("input", minuteAndSecond);
document.getElementById("second").addEventListener("input", minuteAndSecond);

function hour(event) {
  if (event.target.value < 0) {
    event.target.value = 0;
  }
  if (event.target.value > 99) {
    event.target.value = 99;
  }
}

function minuteAndSecond(event) {
  if (event.target.value < 0) {
    event.target.value = 0;
  }
  if (event.target.value > 59) {
    event.target.value = 59;
  }
}

// add Timer
function setTimer() {
  let hour = parseInt(document.getElementById("hour").value);
  let minute = parseInt(document.getElementById("minute").value);
  let second = parseInt(document.getElementById("second").value);

  isNaN(hour) ? (hour = 0) : hour;
  isNaN(minute) ? (minute = 0) : minute;
  isNaN(second) ? (second = 0) : second;
  allTime = hour * 3600 + minute * 60 + second;

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }

  document.getElementById("timer").textContent = `${hour}:${minute}:${second}`;
  document.getElementById("modal").style.display = "none";
}

// start timer
function editTime() {
  let a = Math.floor(allTime / 3600);
  let b = Math.floor((allTime % 3600) / 60);
  let c = allTime % 60;
  if (a < 10) {
    a = "0" + a;
  }
  if (b < 10) {
    b = "0" + b;
  }
  if (c < 10) {
    c = "0" + c;
  }
  document.getElementById("timer").textContent = a + ":" + b + ":" + c;

  if (allTime > 0) {
    setTimeout(() => {
      if (resume) {
        allTime -= 1;

        editTime(allTime);
      } else return;
    }, 1000);
  }
  if (allTime <= 0) {
    resume = false;
    document.getElementById("start").style.display = "block";
    document.getElementById("pause").style.display = "none";
  }
}

// start
document
  .getElementById("start")
  .addEventListener("click", function start(event) {
    resume = true;
    event.target.style.display = "none";
    document.getElementById("pause").style.display = "block";
    editTime();
    progress();
  });

// pause
document
  .getElementById("pause")
  .addEventListener("click", function pause(event) {
    resume = false;
    event.target.style.display = "none";
    document.getElementById("start").style.display = "block";
  });

// reset
document
  .getElementById("reset")
  .addEventListener("click", function reset(event) {
    resume = false;
    let hour = parseInt(document.getElementById("hour").value);
    let minute = parseInt(document.getElementById("minute").value);
    let second = parseInt(document.getElementById("second").value);
    document.getElementById("start").style.display = "block";
    document.getElementById("pause").style.display = "none";
    if (isNaN(hour) && isNaN(minute) && isNaN(second)) {
      document.getElementById(
        "timer"
      ).textContent = `${hourStandart}:${minuteStandart}:${secondStandart}`;
      allTime = standartTime;
    } else if (hour == 0 && minute == 0 && second == 0) {
      document.getElementById(
        "timer"
      ).textContent = `${hourStandart}:${minuteStandart}:${secondStandart}`;
      allTime = standartTime;
    } else {
      setTimer();
    }
  });

// openModal
document
  .getElementById("openModal")
  .addEventListener("click", function openModal(event) {
    if (!resume) {
      document.getElementById("modal").style.display = "block";
    }
  });

// Progress Bar

function progress() {
  let progress = document.getElementById("progress");
  let totalTime = allTime;

  function changeBar() {
    let proc = (allTime * 100) / totalTime;
    let procWidth = (proc * 360) / 100;
    setTimeout(() => {
      if (resume) {
        progress.style.width = `${procWidth}px`;
        progress.style.backgroundColor = "red";
        changeBar();
      } else {
        progress.style.width = "";
        progress.style.backgroundColor = "";
      }
    }, 0);
  }
  changeBar();
}
