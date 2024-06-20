function makeOpt(text, value) {
    const optElt = document.createElement('option');
    if (value !== undefined) {
        optElt.value = value;
    }
    optElt.innerText = text;
    return optElt;
}

function fillSelector(selectElt, options, startText) {
    selectElt.appendChild(makeOpt(startText, ""));
    for (const option of options) {
        selectElt.appendChild(makeOpt(option));
    }
}

function initialize() {
    fillSelector(document.getElementById('priority'), ['high', 'medium', 'low'], '—Please choose a priority—');
    fillSelector(document.getElementById('context'), ['home', 'work', 'school'], '—Please choose a context—');
}
