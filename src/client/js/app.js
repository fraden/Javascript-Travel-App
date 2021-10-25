/* Global Variables */
import { deltaBetweenDates } from './deltaBetweenDates'

const baseURL = "http://api.geonames.org/postalCodeLookupJSON?country=DE&postalcode=";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const getWeatherData = async(baseUrl, zip) => {
    const res = await fetch(baseURL + zip + "&username=fraden");
    const data = await res.json();
    return data;
}



const cbFunction = (event) => {
    event.preventDefault();
    try {
        const zip = document.getElementById("zip").value;
        const userResponse = document.getElementById('feelings').value;

        getWeatherData(baseURL, zip).then(
            (data) => {
                postData("http://localhost:8081/data", { lat: data.postalcodes[0].lat, lng: data.postalcodes[0].lng, country: data.postalcodes[0].countryCode }); // structure can be seen on https://openweathermap.org/current#zip
            }).then(() => {
            refreshUI();
        });
    } catch (error) {
        console.log("error", error);
    }

};

document.getElementById("generate").addEventListener("click", cbFunction)

const refreshUI = async() => { // source: lesson 4: asynchronous javascript -  10. Updating UI Elements
    const request = await fetch('http://localhost:8081/all');
    try {
        const projectData = await request.json();
        document.getElementById('lat').innerHTML = projectData.lat;
        document.getElementById('lng').innerHTML = projectData.lng;
        document.getElementById('country').innerHTML = projectData.country;
    } catch (error) {
        console.log("error", error);
    }
};

const postData = async(url = '', data = {}) => { // source: lesson 4: asynchronous javascript -  7. Exercise: Async GET

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const countdown = () => {
    let current_date = new Date(new Date().toISOString().split('T')[0])
    let date_of_trip = new Date(document.getElementById("trip-date").value);
    let delta = deltaBetweenDates(date_of_trip, current_date);
    document.getElementById("days-till-trip").innerHTML = "There are " + delta + " days till your trip."
}

document.getElementById("time-submit").addEventListener("click", countdown)

export {
    getWeatherData,
    refreshUI
}