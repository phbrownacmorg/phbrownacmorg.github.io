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
