// UTILITIES
/**
 * Create and return a new element of type TAG, with contents CONTENTS.
 * @param {string} tag - HTML tag of the element to create 
 * @param {string} contents - contents of the new element
 * @returns the new element
 */
function makeAndFillElt(tag, contents) {
    const elt = document.createElement(tag);
    elt.innerHTML = contents;
    return elt;
}

/**
 * Creates and returns a table row, filling it with elements of type TAG containing values from VALUES.
 * @param {string} celltag - tag (th or td) for the cells in the row
 * @param {Iterable[string]} values - Iterable of values to put in the cells.
 * @returns <tr> element, for addition to the DOM
 */
function makeAndFillTableRow(celltag, values) {
    const tr = document.createElement('tr');
    for (const val of values) {
        tr.appendChild(makeAndFillElt(celltag, val));
    }
    return tr;
}

/**
 * Create and return an <option> element.
 * @param {string} text - Content of the element
 * @param {string} value - Value of the element (if supplied)
 * @returns the <option> element, for addition to the DOM
 */
function makeOpt(text, value) {
    const optElt = makeAndFillElt('option', text);
    if (value !== undefined) {
        optElt.value = value;
    }
    return optElt;
}

/**
 * Fill, or refill, a <select> element with <option> elements, working by side effect.  Any prior <option> elements are removed.
 * @param {HTMLSelectElement} selectElt - <select> element to be filled (or refilled)
 * @param {Iterable} options - Iterable of contents for all the <option> elements after the first. 
 * @param {string} startText - Text for the first (empty) element
 * @param {Iterable} values - If present, an Iterable with the same length as options, providing values for each option
 */
function fillSelector(selectElt, options, startText, values) {
    selectElt.innerHTML = '';
    selectElt.appendChild(makeOpt(startText, ""));
    if (!values) {
        for (const option of options) {
           selectElt.appendChild(makeAndFillElt('option', option));
        }
    }
    else {
        for (let i = 0; i < options.length; i++) {
            selectElt.appendChild(makeOpt(options[i], values[i]));
        }
    }
}

/**
 * Takes a list of objects, extracts an attribute from each of the objects, and returns a sorted Array of the unique values.
 * @param {Iterable[object]} courses - Iterable of objects
 * @param {string} attr - Attribute to extract fom each of the objects
 * @returns a sorted Array of the unique values of object[attr]
 */
function getUnique(objects, attr) {
    const uniqueArray = objects.map((obj) => obj[attr]);
    const uniqueSet = new Set(uniqueArray);
    return Array.from(uniqueSet).toSorted();
}

/**
 * Class to represent an object with observable events, which publishes those events.
 */
class Publisher { // Miller calls this Subject, which seems vague to me
    constructor() {
        this.handlers = []
    }

    /**
     * Method for subscribing to events from this Publisher.
     * @param {Function} fn - function to call when the Publisher publishes an event
     */
    subscribe(fn) {
            this.handlers.push(fn);
        }

    /**
     * Remove a subscription to this Publisher.
     * @param {Function} fn - function to remove from the list of handlers for this Publisher. 
     */
    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    /**
     * Notify subscribers of a change to this Publisher, by calling each function in the list of handlers.
     * @param {string} msg - description of the event or event type
     * @param {Object} someobj - object to use as the context for the event. 
     */
    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}
