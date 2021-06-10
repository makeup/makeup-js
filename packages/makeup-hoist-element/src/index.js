let hoistEl;
let hoistedElementPlaceholder;
let containerDiv;
let bodyChildIndexes = [];
const BODY_TAG_NAME = 'BODY';

function isHoisted(element) {
    if (element.parentElement.tagName === BODY_TAG_NAME) {
        return true;
    }
    return false;
}

function unhoist() {
    if (hoistEl) {
        if (containerDiv) {
            const childList = Array.from(containerDiv.childNodes);
            childList.forEach((child) => {
                if (child.src === undefined) {
                    const index = bodyChildIndexes.shift();
                    if (index > document.body.childNodes.length) {
                        document.body.appendChild(child);
                    } else {
                        document.body.insertBefore(child, document.body.childNodes[index + 1]);
                    }
                }
            });
            containerDiv.remove();
            containerDiv = null;
            bodyChildIndexes = [];
        }

        if (hoistedElementPlaceholder) {
            hoistedElementPlaceholder.replaceWith(hoistEl);
            // let observers know the element is unhoisted
            hoistedElementPlaceholder = null;
        }
        hoistEl = null;
    }
    return hoistEl;
}

function hoist(el) {
    if (isHoisted(el)) {
        unhoist();
    }
    hoistEl = el;

    hoistedElementPlaceholder = document.createElement('div');
    hoistEl.parentElement.insertBefore(hoistedElementPlaceholder, hoistEl);

    containerDiv = document.createElement('div');
    [...document.body.childNodes].forEach((child, index) => {
        if (!child.src) {
            containerDiv.appendChild(child);
            bodyChildIndexes.push(index);
        }
    });

    document.body.prepend(containerDiv);

    document.body.appendChild(hoistEl);

    return hoistEl;
}

module.exports = {
    hoist,
    unhoist,
    isHoisted
};
