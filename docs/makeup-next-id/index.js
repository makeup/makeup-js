// REQUIRE
// const nextId = require('../../packages/makeup-next-id').default;

// IMPORT
import nextId from '../../packages/makeup-next-id';

const listEl = document.getElementById('list');
const testForm = document.getElementById('testForm');
const inputEl = document.getElementById('prefix');

testForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listItem = document.createElement('li');
    const id = nextId(listItem, inputEl.value);
    listItem.innerText = `Item ${listEl.childNodes.length} (${id})`;
    console.log(`id: ${id}`);
    listEl.appendChild(listItem);
});
