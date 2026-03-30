import typeahead from "makeup-typeahead";

const listEl = document.getElementById("list");
const matchEl = document.getElementById("match");
const { getIndex } = typeahead();
const TIMEOUT = 1500;

listEl.addEventListener("keydown", (e) => {
  if (e.key.length !== 1) return;

  const index = getIndex(listEl.children, e.key, TIMEOUT);

  [...listEl.children].forEach((li) => li.classList.remove("match"));

  if (index !== -1) {
    listEl.children[index].classList.add("match");
    matchEl.textContent = listEl.children[index].textContent;
  } else {
    matchEl.textContent = "—";
  }
});
