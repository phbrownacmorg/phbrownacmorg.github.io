/**
 * Return true iff the values in formElt are all valid.
 */
function validForm(formElt) {
    let valid = checkAtLeast('animal', 2);
    valid = validPhone(formElt.phone) && valid;
    valid = validBirthdate(formElt.birthdate) && valid;
    return false;
}

/**
 * Return true if at least one of the checkboxes that are children
 * of the element with id parentID has been checked.
 */
function somethingChecked(parentID) {
    let parentElt = document.getElementById(parentID);
    let boxes = parentElt.querySelectorAll('input[type=checkbox]');
    //console.log(flag);
    let oneIsChecked = false;
    for (box of boxes) {
        //console.log(box);
        if (box.checked) {
            oneIsChecked = true;
            // better to have valid on the checkbox than on the flag
            box.classList.add('valid'); 
        }
        else {
            box.classList.remove('valid');
        }
    }
    let flag = parentElt.querySelector('.flag');
    console.log(oneIsChecked);
    return oneIsChecked;   
}

/**
 * Return true if at least one of the checkboxes that are children
 * of the element with id parentID has been checked.
 */
function checkAtLeast(parentID, numRequired=1) {
    let parentElt = document.getElementById(parentID);
    let boxes = parentElt.querySelectorAll('input[type=checkbox]');
    //console.log(flag);
    boxes[0].setCustomValidity(""); // Clear out any prevoous custom validity
    let numChecked = 0;
    for (box of boxes) {
        //console.log(box);
        if (box.checked) {
            numChecked = numChecked + 1;
        }

        // better to have valid on the checkbox than on the flag
        // Note this could be done by going back through later
        // and processing *all* the boxes.
        if (numChecked >= numRequired) {
            box.classList.add('valid'); 
        }
        else {
            box.classList.remove('valid');
        }
    }
    if (numChecked < numRequired) { // Invalid
        boxes[0].setCustomValidity("Please check at least " + numRequired + " of these boxes.");
    }
    //let flag = parentElt.querySelector('.flag');
    console.log('Number checked: ' + numChecked);
    return (numChecked >= numRequired);   
}

function validPhone(phoneElt) {
    // Start by looking at what the HTML already did
    let valid = phoneElt.validity.valid;
    // Clear the *custom* validity
    phoneElt.setCustomValidity("");

    // Now, look for specific invalid inputs
    let value = phoneElt.value;
    if (value.substring(1, 3) == '11') {
        console.log('x11 area code');
        valid = false;
        phoneElt.setCustomValidity('The area code cannot have the form N11');
    }
    else if (value.substring(0,10) == '800-555-01') {
        console.log('Fictional phone number');
        valid = false;
        phoneElt.setCustomValidity('800-555-01NN is for fictional phone numbers.');
    }
    
    console.log("Phone: " + valid);
    return valid;
}

function isLeapYear(dateVal) {
    //console.log('dateVal: '+ dateVal.toString());
    let year = dateVal.getFullYear();
    let leap = ((year % 4) === 0);  // Julian rule
    if (leap) {
        // Gregorian century rule
        leap = (((year % 100) !== 0) || ((year % 400) === 0)); 
    }
    return leap;
}

function validBirthdate(dateElt) {
    // Start by looking at what the HTML already did
    let valid = dateElt.validity.valid;
    // Clear any *custom* validity
    dateElt.setCustomValidity("");

    let value = dateElt.value;
    //console.log('Value: ' + value);

    if (value && (! isLeapYear(new Date(value)))) {
        valid = false;
        dateElt.setCustomValidity(dateElt.title);
    }
    return valid;
}