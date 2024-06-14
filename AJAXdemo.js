let timeURL = 'http://worldtimeapi.org/api/timezone/EST5EDT';

async function insertTimeText() {
    const regexp = /datetime: ([-0-9T:]+)/
    const response = await fetch(timeURL + '.txt');
    const text = await response.text();
    const datetime = text.match(regexp)[1].replace('T', ' ');
    //console.log(datetime);
    document.getElementById('text_time_target').innerText = datetime;
}

async function insertTimeJson() {
    const response = await fetch(timeURL);
    const json = await response.json();
    const datetime = json.datetime.substring(0, 19).replace('T', ' ');
    //console.log(datetime);
    document.getElementById('json_time_target').innerText = datetime;
}

async function insertWikipediaPage() {
}

function makeAndFillElt(tag, contents) {
    const elt = document.createElement(tag);
    elt.innerHTML = contents;
    return elt;
}

function makeAndFillTableRow(celltag, values) {
    const tr = document.createElement('tr');
    for (const val of values) {
        tr.appendChild(makeAndFillElt(celltag, val));
    }
    return tr;
}

function insertFlightData(flightroute) {
    const targetElt = document.getElementById('flight_target');
    targetElt.innerHTML = ''; // Clean out any old results
    const tableElt = document.createElement('table');
    tableElt.appendChild(makeAndFillElt('caption', `Data for flight ${flightroute.callsign}`))
    tableElt.appendChild(makeAndFillTableRow('th', ['', 'Name', 'City', 'Country']));
    tableElt.appendChild(makeAndFillTableRow('td', 
        ['Airline', flightroute.airline.name, '', flightroute.airline.country]));
    tableElt.appendChild(makeAndFillTableRow('td', 
        ['From', flightroute.origin.name, flightroute.origin.municipality, flightroute.origin.country_name]));
    tableElt.appendChild(makeAndFillTableRow('td', 
        ['To', flightroute.destination.name, flightroute.destination.municipality, flightroute.destination.country_name]));
    targetElt.appendChild(tableElt);
}

async function getFlight() {
    const callsign = document.getElementById('callsign').value;
    if (callsign == '') {
        throw new Error('Empty callsign');
    }
    const url = 'https://api.adsbdb.com/v0/callsign/' + callsign;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.response.flightroute);
    return insertFlightData(json.response.flightroute);
}

async function getLatLong() {
}

async function getWeather() {
}