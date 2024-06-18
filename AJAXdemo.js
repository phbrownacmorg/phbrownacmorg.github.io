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

function insertWeatherData(periods) {
    const targetElt = document.getElementById('weather_target');
    targetElt.innerHTML = '';
    const tableElt = document.createElement('table');
    tableElt.appendChild(makeAndFillElt('caption', 
        `7-day forecast starting ${periods[0].startTime.substring(0, 16).replace('T', ' ')}`));
    tableElt.appendChild(makeAndFillTableRow('th', ['Period', 'Forecast']));
    for (const period of periods) {
        tableElt.appendChild(makeAndFillTableRow('td', [period.name, period.detailedForecast]));
    }

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
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const query = `${street}, ${city}, ${state}, ${country}`;
    //console.log(encodeURIComponent(query));
    const url = 'https://api.opencagedata.com/geocode/v1/json/?'
            + `key=${OpenCageData_key}&`
            + `q=${encodeURIComponent(query)}&`
            + 'pretty=1&no_annotations=1'

    const response = await fetch(url);
    const json = await response.json();
    const geom = json.results[0].geometry;
    //console.log(geom);
    document.getElementById('lat').value = geom.lat;
    document.getElementById('lng').value = geom.lng;
}

async function getWeather() {
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    let url = `https://api.weather.gov/points/${lat},${lng}`
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json);

    url = json.properties.forecast;
    response = await fetch(url);
    json = await response.json();
    console.log(json.properties.periods);

    insertWeatherData(json.properties.periods);
}