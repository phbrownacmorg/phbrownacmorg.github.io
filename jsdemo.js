function insertList(buttonElt) {
    let parentElt = document.getElementById('listTarget');
    let contents = '<h2>The Three Stooges (programmatically!)</h2>';
    contents += '<ol><li>Larry</li>';
    contents += '<li>Curly</li>';
    contents += '<li>Moe</ol>';
    parentElt.innerHTML = contents + parentElt.innerHTML;
    console.log(buttonElt);
    buttonElt.addClass('hidden');
    console.log(buttonElt);
}

/**
 * Function to insert a Monty-Python image into the element with id "pythonTarget".
 * The image used is one of three, chosen based on which button was clicked to
 * call the function.  The button used is passed to the function as buttonElt.
 */
function insertPython(buttonElt) {
    let contents = '<p>And now for something completely different...</p>';
    if (buttonElt.innerHTML === "BOOM!") {
        contents += '<img src="https://img.gifglobe.com/grabs/montypython/MontyPythonAndTheHolyGrail/gif/ZFb6uJozJJm2.gif" alt="Tim the Enchanter">';
    }
    else if (buttonElt.innerHTML === "'Tis but a flesh wound!") {
        contents += '<img src="https://i.gifer.com/LXdH.gif" alt="The Black Knight">';
    }
    else {
        contents += '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToVTTQJFG3IWh0uxjKxrNV39T05oEaWGSU2w&usqp=CAU" alt="Rude French soldier">';
    }

    let targetElt = document.getElementById('pythonTarget');
    pythonTarget.innerHTML = contents;
}

function findGCD(a, b) {
    while (b != 0) {
        let tmp = a;
        a = b;
        b = tmp % b;
    }
    return Math.abs(a);
}

// Function to get the parameters for the GCD calculation and display the result
function showGCD() {
    let num1 = parseInt(document.getElementById('num1').value);
    //console.log(num1);
    let num2 = parseInt(document.getElementById('num2').value);
    //console.log(num2);
    document.getElementById('GCDtarget').innerHTML = findGCD(num1, num2).toString();
}

/**
 * Function to create a multiplication table from 0 to maxValue and insert it into
 * the element timesTableTarget.
 * 
 * @param {*} maxValue 
 */
function timesTable(maxValue) {
    let tableString = '<table><thead><tr><th></th>';
    for (let i = 0; i <= maxValue; i++) {
        tableString += '<th>' + i.toString() + '</th>';
    }
    tableString += '</tr></thead><tbody>';

    for (let i = 0; i <= maxValue; i++) {
        tableString += '<tr><th>' + i.toString() + '</th>';
        for (let j = 0; j <= maxValue; j++) {
            tableString += '<td>' + (i*j).toString() + '</td>';
        }

        tableString += '</tr>';
    }

    tableString += '</tbody></table>';
    document.getElementById('timesTableTarget').innerHTML = tableString;
}

/**
 * Make and return a table cvell of cellType with contents contents.
 * @param {*} cellType th or tr
 * @param {*} contents string to include in the cell
 */
function makeCell(cellType, contents) {
    let cell = document.createElement(cellType);
    cell.innerText = contents;
    return cell;
}

function calcFutureval(buttonElt) {
    let formElt = buttonElt.form;

    // If the fields to be checked aren't all the fields in the form,
    // check them individually by calling checkValidity() on each field
    // if (formElt.P.checkValidity() && formElt.interest.checkValidity()
    //       && formElt.periods.checkValidity()) {

    // If we can check the whole form, use formElt.reportValidity()
    if (formElt.reportValidity()) {
        let P = parseFloat(formElt.P.value);
        let rate = parseFloat(formElt.interest.value) / 100;
        let periods = parseInt(formElt.periods.value);
        //alert(P + " " + rate + " " + periods);

        targetElt = document.getElementById('futurevalTarget');
        // Clear out the old...
        while (targetElt.firstElementChild) {
            targetElt.firstElementChild.remove();
        }

        // Add the new
        let tableElt = document.createElement('table');
        let thead = document.createElement('thead');
        let row = document.createElement('tr');
        row.appendChild(makeCell('th', 'Period'));
        row.appendChild(makeCell('th', 'Value'));
        thead.appendChild(row);
        tableElt.appendChild(thead);
        let tbody = document.createElement('tbody');

        for (let period = 1; period <= periods; period++) {
            P += P * rate;
            row = document.createElement('tr');
            row.appendChild(makeCell('td', period));
            row.appendChild(makeCell('td', '$' + (Math.round(P*100) / 100).toString()));
            tbody.appendChild(row);
        }

        tableElt.appendChild(tbody);
        targetElt.appendChild(tableElt);

        let nextButton = buttonElt.nextElementSibling;
        // Adjust the button's style by changing its class list
        nextButton.classList.remove('hidden');
        nextButton.disabled = false; // Enable the button, if it was disabled
    }
}

function formatFutureval(buttonElt) {
    buttonElt.disabled = true; // Don't allow multiple reformattings unless the table changes

    let tableElt = document.getElementById('futurevalTarget').querySelector('table');

    // Adjust the padding for all the table cells, using their class lists
    for (elt of tableElt.querySelectorAll('td,th')) {
        elt.classList.add('futureval');
    }

    // Center the "Value" heading by manipulating its style property directly
    //   (no classes involved)
    let valueCell = tableElt.querySelector('thead > tr > th:last-child');
    valueCell.style.setProperty('text-align', 'center');

    // Regularize the text in the value cells, using innerText
    for (elt of tableElt.querySelectorAll('td:last-child')) {
        elt.innerText = regularizeMoneyAmt(elt.innerText);
    }
}

function regularizeMoneyAmt(amtStr) {
    //let spaces = 
    numAmt = "$" + parseFloat(amtStr.substring(1)).toFixed(2);
    //console.log(numAmt);

    return numAmt;

}