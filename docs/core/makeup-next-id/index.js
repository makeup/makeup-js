import nextId from "makeup-next-id";

const listEl = document.getElementById("list");
const formEl = document.getElementById("demo-form");
const prefixEl = document.getElementById("prefix");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const listItem = document.createElement("li");
  const id = nextId(listItem, prefixEl.value);
  listItem.textContent = `id="${id}"`;
  listEl.appendChild(listItem);
});
