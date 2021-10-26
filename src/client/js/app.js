/* Global Variables */
import { deltaBetweenDates } from './deltaBetweenDates';

const baseURL = 'http://api.geonames.org/postalCodeLookupJSON?country=DE&postalcode=';

const weatherbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?country=DE&postal_code=';

const pixabayBaseUrl = 'https://pixabay.com/api/?image_type=photo&pretty=true&q=';

const weatherbit_apiKey = '3c7928d0043e4e98a2429187b5fa5cce'; //todo: roll the api-keys and load them from .env-file
const pixabay_apiKey = '24029659-1e8be7f9b0a8b31c54fe84556';

let globals = {}; // Globally scoped object

const getGeoInfo = async(url, zip) => {
    const res = await fetch(url + zip + '&username=fraden');
    const data = await res.json();
    return data;
};

const getWeatherForecast = async(url, zip, api_key) => {
    const res = await fetch(url + zip + '&key=' + api_key);
    const data = await res.json();
    return data;
};

const getImage = async(url, searchString, api_key) => {
    const res = await fetch(url + searchString + '&key=' + api_key);
    const data = await res.json();
    return data;
};


export async function cbFunction(event) {

    event.preventDefault();
    if (document.getElementById('trip-date').value == '') {
        alert('Please enter a trip date!');
    } else {
        try {

            countdown();
            const zip = document.getElementById('zip').value;
            const geoInfo = await getGeoInfo(baseURL, zip);
            const weatherInfo = await getWeatherForecast(weatherbitBaseUrl, zip, weatherbit_apiKey);
            let image = await getImage(pixabayBaseUrl, geoInfo.postalcodes[0].placeName + '+stadt', pixabay_apiKey);
            if (image.total == 0) {
                image = await getImage(pixabayBaseUrl, geoInfo.postalcodes[0].adminName1, pixabay_apiKey);
            }
            let weatherData;
            console.log('daysTillTrip');
            console.log(globals.daysTillTrip);
            if (globals.daysTillTrip < 0 || globals.daysTillTrip > 15) {
                weatherData = {
                    low: 'not available',
                    high: 'not available',
                    description: 'not available'
                };
            } else {
                weatherData = {
                    low: weatherInfo.data[globals.daysTillTrip].low_temp,
                    high: weatherInfo.data[globals.daysTillTrip].high_temp,
                    description: weatherInfo.data[globals.daysTillTrip].weather.description
                };
            }
            postData('http://localhost:8081/allData', {
                geoInfo: {
                    lat: geoInfo.postalcodes[0].lat,
                    lng: geoInfo.postalcodes[0].lng,
                    country: geoInfo.postalcodes[0].countryCode,
                    city: geoInfo.postalcodes[0].placeName
                },

                weatherData: weatherData,
                imageUrl: image.hits[0].webformatURL
            });

            refreshUI();

        } catch (error) {
            console.log('error', error);
        }
    }


}



document.getElementById('generate').addEventListener('click', cbFunction);

const refreshUI = async() => { // source: lesson 4: asynchronous javascript -  10. Updating UI Elements
    const request = await fetch('http://localhost:8081/all');
    try {
        const projectData = await request.json();
        document.getElementById('lat').innerHTML = projectData.geoInfo.lat;
        document.getElementById('lng').innerHTML = projectData.geoInfo.lng;
        document.getElementById('country').innerHTML = projectData.geoInfo.country;
        document.getElementById('city').innerHTML = projectData.geoInfo.city;

        document.getElementById('high').innerHTML = 'Max temperature: ' + projectData.weatherData.high;
        document.getElementById('low').innerHTML = 'Min temperature: ' + projectData.weatherData.low;
        document.getElementById('description').innerHTML = projectData.weatherData.description;

        document.getElementById('city-image').src = projectData.imageUrl;
    } catch (error) {
        console.log('error', error);
    }
};

const postData = async(url = '', data = {}) => { // source: lesson 4: asynchronous javascript -  7. Exercise: Async GET

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match 'Content-Type' header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

const countdown = () => {

    let tripDateText = document.getElementById('trip-date').value;
    if (tripDateText == '') {
        alert('Please enter the start-date of the trip.');
    } else {
        let currentDate = new Date(new Date().toISOString().split('T')[0]);
        let tripDate = new Date(tripDateText);
        let delta = deltaBetweenDates(tripDate, currentDate);
        document.getElementById('days-till-trip').innerHTML = 'There are ' + delta + ' days till your trip.';
        globals.daysTillTrip = delta;

        let tripEnd = document.getElementById('trip-end').value;
        if (tripEnd != '') {
            let tripEndDate = new Date(tripEnd);
            let lengthOfTrip = deltaBetweenDates(tripEndDate, tripDate);
            document.getElementById('trip-length').innerHTML = 'Your trip length is ' + (lengthOfTrip + 1) + ' days.';
        }
    }


};

export {
    getGeoInfo,
    refreshUI
};