const filterAncestor = (item) => item.nodeType === 1 && item.tagName.toLowerCase() !== "body" && item.tagName.toLowerCase() !== "html";
const filterSibling = (item) => item.nodeType === 1 && item.tagName.toLowerCase() !== "script";
const flattenArrays = (a, b) => a.concat(b);
function getPreviousSiblings(el, siblings = []) {
  const previousSibling = el.previousSibling;
  if (!previousSibling) {
    return siblings;
  }
  siblings.push(previousSibling);
  return getPreviousSiblings(previousSibling, siblings);
}
function getNextSiblings(el, siblings = []) {
  const nextSibling = el.nextSibling;
  if (!nextSibling) {
    return siblings;
  }
  siblings.push(nextSibling);
  return getNextSiblings(nextSibling, siblings);
}
function getSiblings(el) {
  const allSiblings = getPreviousSiblings(el).concat(getNextSiblings(el));
  return allSiblings.filter(filterSibling);
}
function getAllAncestors(el, ancestors = []) {
  const nextAncestor = el.parentNode;
  if (!nextAncestor) {
    return ancestors;
  }
  ancestors.push(nextAncestor);
  return getAllAncestors(nextAncestor, ancestors);
}
function getAncestors(el) {
  return getAllAncestors(el).filter(filterAncestor);
}
function getSiblingsOfAncestors(el) {
  return getAncestors(el).map((item) => getSiblings(item)).reduce(flattenArrays, []);
}
export {
  getAncestors,
  getSiblings,
  getSiblingsOfAncestors
};
