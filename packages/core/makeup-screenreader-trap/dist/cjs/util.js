"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAncestors = getAncestors;
exports.getSiblings = getSiblings;
exports.getSiblingsOfAncestors = getSiblingsOfAncestors;
// filter function for ancestor elements
const filterAncestor = item => item.nodeType === 1 && item.tagName.toLowerCase() !== "body" && item.tagName.toLowerCase() !== "html";

// filter function for sibling elements
const filterSibling = item => item.nodeType === 1 && item.tagName.toLowerCase() !== "script";
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

// returns all sibling element nodes of given element
function getSiblings(el) {
  const allSiblings = getPreviousSiblings(el).concat(getNextSiblings(el));
  return allSiblings.filter(filterSibling);
}

// get ancestor nodes of given element
function getAncestors(el) {
  const ancestors = [];
  let current = el.parentNode;
  while (current) {
    ancestors.push(current);
    current = current.parentNode;
  }
  return ancestors.filter(filterAncestor);
}

// get siblings of ancestors (i.e. aunts and uncles) of given el
function getSiblingsOfAncestors(el) {
  return getAncestors(el).map(item => getSiblings(item)).flat();
}
