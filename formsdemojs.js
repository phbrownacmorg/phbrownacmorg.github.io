/**
 * Return true iff the values in formElt are all valid.
 */
function validForm(formElt) {
    let valid = somethingChecked('animal');
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
    // if (oneIsChecked) {
    //     flag.classList.add('valid');
    // }
    // else {
    //     flag.classList.remove('valid');
    // }
    console.log(oneIsChecked);
    return oneIsChecked;   
}