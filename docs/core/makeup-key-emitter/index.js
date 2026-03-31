import { add } from "makeup-key-emitter";

const keyEventNames = [
  "arrowUpKeyDown",
  "arrowUpKeyUp",
  "arrowDownKeyDown",
  "arrowDownKeyUp",
  "arrowLeftKeyDown",
  "arrowLeftKeyUp",
  "arrowRightKeyDown",
  "arrowRightKeyUp",
  "escapeKeyDown",
  "escapeKeyUp",
  "spacebarKeyDown",
  "spacebarKeyUp",
  "enterKeyDown",
  "enterKeyUp",
  "homeKeyDown",
  "homeKeyUp",
  "endKeyDown",
  "endKeyUp",
  "pageUpKeyDown",
  "pageUpKeyUp",
  "pageDownKeyDown",
  "pageDownKeyUp",
];

function logEvent(logEl, eventName) {
  const item = document.createElement("li");
  item.textContent = eventName;
  logEl.prepend(item);
}

// Widget 1: delegated on container
const widget1El = document.getElementById("widget-1");
const log1El = document.getElementById("log-1");

add(widget1El);

keyEventNames.forEach((eventName) => {
  widget1El.addEventListener(eventName, () => logEvent(log1El, eventName));
});

document.getElementById("clear-1").addEventListener("click", () => {
  log1El.innerHTML = "";
});

// Widget 2: directly bound on each button
const log2El = document.getElementById("log-2");

[...document.querySelectorAll("#widget-2 button")].forEach((btn) => {
  add(btn);
  keyEventNames.forEach((eventName) => {
    btn.addEventListener(eventName, () => logEvent(log2El, eventName));
  });
});

document.getElementById("clear-2").addEventListener("click", () => {
  log2El.innerHTML = "";
});
