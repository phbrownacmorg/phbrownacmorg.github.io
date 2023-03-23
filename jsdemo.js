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