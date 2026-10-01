/**
 * Create and insert a table of squares of integers up to n.
 * 
 * @param {*} n Positive integer
 */
function tableOfSquares(n) {
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = '<var>n</var>';
    tr.append(th);
    th = document.createElement('th');
    th.innerHTML = '<var>n</var>&sup2;';
    tr.append(th);
    table.append(tr);

    // Initalization; test; update
    for (let i = 0; i <= n; i++) {
        tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = i.toString();
        tr.append(td);
        td = document.createElement('td');
        td.innerHTML = (i*i).toString();
        tr.append(td);
        table.append(tr);
    }

    return table;
}

function insertTable(parentElt, n) {
    let lastChild = parentElt.lastElementChild;
    console.log(parentElt, n, lastChild, lastChild.tagName);
    if (lastChild.tagName == 'TABLE') {
        lastChild.remove();
    }
    parentElt.append(tableOfSquares(n));
}

function fillStyleProperties(elt) {
    let selectElt = document.getElementById('style_props');
    // Remove any <option> elements after the first
    let options = selectElt.options;
    options.length = 1;
    let properties = elt.style;
    // For-loop, iterating over the properties of the style object
    for (const prop in properties) {
        let opt = document.createElement('option');
        opt.value = prop.toString()
        opt.innerHTML = prop.toString();
        selectElt.appendChild(opt);
    }
}

function showValue(selectElt, subjectElt, targetElt) {
    //console.log(selectElt, subjectElt, targetElt);
    // First: clear out any old contents from targetElt
    targetElt.innerHTML = '';
    // Next: which property do we want to echo?
    // Since this is called on onchange, the selected options should not be empty
    //console.log(selectElt.selectedIndex);
    let styleObj = window.getComputedStyle(targetElt);
    if (selectElt.selectedIndex > -1) {
        const prop = selectElt.options[selectElt.selectedIndex].value;
        const val = styleObj[prop];
        targetElt.innerHTML = prop + ": '" + val.toString() + "'";
        //console.log(prop, '"' + val.toString() + '"');
    }

}