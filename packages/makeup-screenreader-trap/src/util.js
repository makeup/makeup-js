// filter function for ancestor elements
const filterAncestor = item => item.nodeType === 1
                                && item.tagName.toLowerCase() !== 'body'
                                && item.tagName.toLowerCase() !== 'html';

// filter function for sibling elements
const filterSibling = item => item.nodeType === 1 && item.tagName.toLowerCase() !== 'script';

// reducer to flatten arrays
const flattenArrays = (a, b) => a.concat(b);

// recursive function to get previous sibling nodes of given element
function getPreviousSiblings(el, siblings = []) {
    const previousSibling = el.previousSibling;

    if (!previousSibling) {
        return siblings;
    }

    siblings.push(previousSibling);

    return getPreviousSiblings(previousSibling, siblings);
}

// recursive function to get next sibling nodes of given element
function getNextSiblings(el, siblings = []) {
    const nextSibling = el.nextSibling;

    if (!nextSibling) {
        return siblings;
    }

    siblings.push(nextSibling);

    return getNextSiblings(nextSibling, siblings);
}

// returns all sibling element nodes of given element
function getSiblings(el) {
    const allSiblings = getPreviousSiblings(el).concat(getNextSiblings(el));

    return allSiblings.filter(filterSibling);
}

// recursive function to get all ancestor nodes of given element
function getAllAncestors(el, ancestors = []) {
    const nextAncestor = el.parentNode;

    if (!nextAncestor) {
        return ancestors;
    }

    ancestors.push(nextAncestor);

    return getAllAncestors(nextAncestor, ancestors);
}

// get ancestor nodes of given element
function getAncestors(el) {
    return getAllAncestors(el).filter(filterAncestor);
}

// get siblings of ancestors (i.e. aunts and uncles) of given el
function getSiblingsOfAncestors(el) {
    return getAncestors(el).map(item => getSiblings(item)).reduce(flattenArrays, []);
}

export {
    getSiblings,
    getAncestors,
    getSiblingsOfAncestors
};
