const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const siteBody = document.querySelector('body');

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

let randomBG = null;
switchStatus(btnStop, true);

function onStart() {
  randomBG = setInterval(() => {
    siteBody.style.backgroundColor = getRandomHexColor();
  }, 1000);

  switchStatus(btnStart, true);
  switchStatus(btnStop, false);
}

function onStop() {
  clearInterval(randomBG);
  switchStatus(btnStart, false);
  switchStatus(btnStop, true);
}

function switchStatus(btn, status) {
  return (btn.disabled = status);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
