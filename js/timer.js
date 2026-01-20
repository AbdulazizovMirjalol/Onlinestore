const hEl = document.getElementById("hours");
const mEl = document.getElementById("minutes");
const sEl = document.getElementById("seconds");
const dEl = document.getElementById("days");

function updateClock() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const days = now.getDate();

  hEl.textContent = String(hours).padStart(2, "0");
  mEl.textContent = String(minutes).padStart(2, "0");
  sEl.textContent = String(seconds).padStart(2, "0");
  dEl.textContent = String(now.getDate()).padStart(2, "0");
}

updateClock();
setInterval(updateClock, 1000);
