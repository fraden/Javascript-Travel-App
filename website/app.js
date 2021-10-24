/* Global Variables */
const API_KEY = "273148ea085a8ad64dcf816c98d1bfa1";

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const getWeatherData = async(baseUrl, zip, apiKey) => {
    // api doc see here: https://openweathermap.org/current#zip
    const res = await fetch(baseURL + zip + "&units=metric" + "&appid=" + apiKey);
    const data = await res.json();
    return data;
}



const cbFunction = (event) => {
    event.preventDefault();
    try {
        const zip = document.getElementById("zip").value;
        const userResponse = document.getElementById('feelings').value;

        getWeatherData(baseURL, zip, API_KEY).then(
            (data) => {
                postData("/data", { temperature: data.main.temp, date: newDate, userResponse: userResponse }); // structure can be seen on https://openweathermap.org/current#zip
            }).then(() => {
            refreshUI();
        });
    } catch (error) {
        console.log("error", error);
    }

};

document.getElementById("generate").addEventListener("click", cbFunction)

const refreshUI = async() => { // source: lesson 4: asynchronous javascript -  10. Updating UI Elements
    const request = await fetch('/all');
    try {
        const projectData = await request.json();
        document.getElementById('temp').innerHTML = projectData.temperature;
        document.getElementById('date').innerHTML = projectData.date;
        document.getElementById('content').innerHTML = projectData.userResponse;
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