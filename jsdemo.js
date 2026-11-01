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

function checkPasswordValidity() {
    const passwordElt = document.querySelector('#get-pswd');
    const constraint = new RegExp(passwordElt.getAttribute('pattern'));
    if (passwordElt.value.length < 12) {
        passwordElt.setCustomValidity('Password must be at least 12 characters');
    }
    else if (constraint.test(passwordElt.value)) {
        passwordElt.setCustomValidity("");
    }
    else {
        passwordElt.setCustomValidity('Password can only contain letters, digits, and _');
    }

}

function init_page() {
    fillStyleProperties(document.getElementById('get-pswd'));
    fill_airspeeds_list();
    echoSliderValue(document.querySelector('#get-airspeed'));
    initDate(document.querySelector('#get-dob'));
    document.querySelector('#get-pswd').addEventListener('change', checkPasswordValidity);
    document.querySelector('#get-pswd').addEventListener('input', checkPasswordValidity);
    setCategories(document.querySelector('#nobel_form'));
}

function requireChecked(checkboxList, minChecked, flagElt) {
    let countChecked = 0;
    for (box of checkboxList) {
        if (box.checked) {
            countChecked++;
        }
    }
    if (countChecked >= minChecked) {
        flagElt.classList.remove('invalid');
        flagElt.classList.add('valid');
    }
    else {
        flagElt.classList.remove('valid');
        flagElt.classList.add('invalid');
    }
    return (countChecked >= minChecked);
}

function checkBoxes(formElt) {
    let checkboxParent = formElt.querySelector('#ice_cream_question');
    let boxes = checkboxParent.querySelectorAll('input[type=checkbox]');
    return requireChecked(boxes, 1, checkboxParent.querySelector('.flag'));
}

function validateForm(formElt) {
    let valid = checkBoxes(formElt);
    return valid;
}

async function findStock(formElt) {
    const apiKey = formElt.API_token.value;
    console.log('API key: ', apiKey);
    if (apiKey.length === 0) {
        alert('Please fill in the API key.');
        return;
    }
    const symbol = formElt.symbol.value;
    console.log('Symbol: ', symbol);
    if (symbol.length === 0) {
        alert('Please fill in the stock symbol.');
        return;
    }
    const opts = {
        method: 'GET'
    };   
    const query = `https://api.marketstack.com/v2/eod?access_key=${apiKey}&symbols=${symbol}&limit=1`;
    try {
        const response = await fetch(query, opts);
        //console.log(response);
        const info = await response.json();
        //console.log(info);
        const msg = `<span class="hspace">Symbol: ${info.data[0].symbol}</span>`
                    + `<span class="hspace">Price: ${info.data[0].close}</span>`
        formElt.querySelector('#stock_output').innerHTML = msg;
    } catch (err) {
        console.error(err);
    }
}

var nobelData;

async function readNobelData() {
    const url = 'https://sharmadhiraj.github.io/free-json-datasets/awards-achievements/nobel_prizes.json';
    let data;
    try {
        const response = await fetch(url, { method: 'GET' });
        data = response.json();
    } catch(err) {
        console.error(err);
    }
    return data;
}

async function setCategories(formElt) {
    // Read the data if this is the first time the event has fired
    if (!nobelData) {
        nobelData = await readNobelData();
    }
    const year = parseInt(formElt.nobel_year.value);
    const years_prizes = nobelData.data.find((element) => element.year == year);
    const selectElt = formElt.nobel_cat;
    // Remove the old categories (but not the top option)
    for (let i = selectElt.options.length - 1; i > 0; i--) {
        selectElt.remove(i);
    }
    // Make new options
    for (const category of years_prizes.categories) {
        const optElt = document.createElement('option');
        optElt.innerText = category.name;
        selectElt.add(optElt);
    }
    selectElt.disabled = false;
}

function showLaureates(formElt) {
    const category = formElt.nobel_cat.value;
    if (category !== "") {
        const year = parseInt(formElt.nobel_year.value);
        const years_prizes = nobelData.data.find((element) => element.year == year);
        const prize = years_prizes.categories.find((element) => element.name == category);

        const outputElt = formElt.querySelector('#nobel_output');
        outputElt.innerHTML = ""; // Remove anything previously there
        outputElt.append(document.createElement('table'));
        const tableElt = outputElt.lastChild;
        tableElt.append(document.createElement('caption'));
        tableElt.lastChild.innerHTML = `${year} ${prize.full_title}`;
        tableElt.append(document.createElement('tr'));
        let row = tableElt.lastChild;
        for (const heading of ['Laureate(s)', 'Motivation']) {
            row.append(document.createElement('th'));
            row.lastChild.innerText = heading;
        }

        for (const award of prize.awards) {
            for (const laureate of award.laureates) {
                tableElt.append(document.createElement('tr'));
                const row = tableElt.lastChild;
                row.append(document.createElement('td'));
                const cell = row.lastChild;
                cell.append(document.createElement('a'));
                cell.lastChild.href = laureate.profile_url;
                cell.lastChild.innerText = laureate.name;

                if (laureate === award.laureates[0]) {
                    row.append(document.createElement('td'));
                    row.lastChild.innerText = award.motivation.slice(1, -1);
                    row.lastChild.setAttribute('rowspan', award.laureates.length);
                    if (award !== prize.awards[0]) {
                        row.setAttribute('class','top_not_first');
                    }
                }

                
            }
        }
    }
}