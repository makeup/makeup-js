const filterAncestor = (item) => item.nodeType === 1 && item.tagName.toLowerCase() !== "body" && item.tagName.toLowerCase() !== "html";
const filterSibling = (item) => item.nodeType === 1 && item.tagName.toLowerCase() !== "script";
function getPreviousSiblings(el) {
  const siblings = [];
  let current = el.previousSibling;
  while (current) {
    siblings.push(current);
    current = current.previousSibling;
  }
  return siblings;
}
function getNextSiblings(el) {
  const siblings = [];
  let current = el.nextSibling;
  while (current) {
    siblings.push(current);
    current = current.nextSibling;
  }
  return siblings;
}
function getSiblings(el) {
  const allSiblings = getPreviousSiblings(el).concat(getNextSiblings(el));
  return allSiblings.filter(filterSibling);
}
function getAncestors(el) {
  const ancestors = [];
  let current = el.parentNode;
  while (current) {
    ancestors.push(current);
    current = current.parentNode;
  }
  return ancestors.filter(filterAncestor);
}
function getSiblingsOfAncestors(el) {
  return getAncestors(el).map((item) => getSiblings(item)).flat();
}
export {
  getAncestors,
  getSiblings,
  getSiblingsOfAncestors
};
