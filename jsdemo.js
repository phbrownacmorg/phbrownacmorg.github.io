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
    let lastChild = parentElt.querySelector('table:last-child');
    if (lastChild) {
        lastChild.remove();
    }
    parentElt.append(tableOfSquares(n));
}

function fillStyleProperties(elt) {
    let selectElt = document.querySelector('#style_props'); //document.getElementById('style_props');
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

function fill_airspeeds_list() {
    // Get the range control
    range = document.querySelector('#get-airspeed');
    minval = parseInt(range.getAttribute('min')); // Assume it exists
    maxval = parseInt(range.getAttribute('max')); // Assume it exists

    // Tick-mark stepsize may not match the range's step
    steps = 10;
    while (((maxval-minval) % steps !== 0) && (steps > 1)) {
        steps--;
    }
    stepsize = (maxval-minval) / steps;

    datalist = document.querySelector('#airspeeds-list');
    for (let i = minval; i <= maxval; i += stepsize) {
        opt = document.createElement('option');
        opt.value = i;
        datalist.append(opt);
    }
}

function echoSliderValue(slider) {
    let value = parseInt(slider.value);
    let echoSpan = slider.nextElementSibling;
    echoSpan.innerText = "Value: " + value.toString();
}

function initDate(dateElt) {
    let now = new Date();
    dateElt.setAttribute('max', now.toISOString().slice(0,10));
    let maxAge = 120; // Nobody's more than 120 years old
    let then = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());
    dateElt.setAttribute('min', then.toISOString().slice(0,10));
    then.setFullYear(now.getFullYear() - 20);
    dateElt.setAttribute('value', then.toISOString().slice(0,10));
}

function init_page() {
    fillStyleProperties(document.getElementById('get-pswd'));
    fill_airspeeds_list();
    echoSliderValue(document.querySelector('#get-airspeed'));
    initDate(document.querySelector('#get-dob'));
}

function requireChecked(checkboxList, minChecked) {
    let countChecked = 0;
    for (box of checkboxList) {
        if (box.checked) {
            countChecked++;
        }
    }
    alert(countChecked);
    return (countChecked >= minChecked);
}

function validateForm(formElt) {
    let checkboxParent = formElt.querySelector('#ice_cream_question');
    let boxes = checkboxParent.querySelectorAll('input[type=checkbox]')
    //alert(boxes.length);
    console.log('Calling requireChecked');
    let valid = requireChecked(boxes, 1);
    console.log('requireChecked returned ' + valid.toString());
    return valid;
}