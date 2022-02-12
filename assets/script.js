let forecastAPIKey = "c9b761f18b670b410a31b85c5dbf9913"; 
let listOfCities = [];


async function getLatAndLon(cityName){
    let geoCode = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${forecastAPIKey}`)
    .then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            console.error(`GeoTag failed with response of ${response.status}`)
        }
    }) 
    const lat = geoCode[0].lat
    const lon = geoCode[0].lon
    document.getElementById("nameofcity").textContent = cityName
    fetchPresentForecast(lat, lon)
    return
}

let inputSearchValue = document.getElementById('letssearch').value;

async function fetchPresentForecast(lat, lon){
  let forecastData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${forecastAPIKey}`)
  .then(response => {
      if (response.status === 200) {
          return response.json()
      } else {
          console.error(`Forecast data failed with response of ${response.status}`);
      } 
  }) 
  document.getElementById("todaysdate").textContent = new Date()
  drawTemp(forecastData)
  drawHumidity(forecastData)
  drawWind(forecastData)
  drawIndex(forecastData)
}

function searchAndSubmit(event) {
  event.preventDefault();
  let inputSearchValue = document.getElementById('letssearch').value;
  if (!inputSearchValue) {
    return;
  }
  
  inputSearchValue = inputSearchValue.toLowerCase();
  getLatAndLon(inputSearchValue)

  if(listOfCities.includes(inputSearchValue) !== true){
    listOfCities.push(inputSearchValue);
    localStorage.setItem("listOfCities",JSON.stringify(listOfCities))
    }
}

function drawTemp(weatherObj){
    console.log(weatherObj)
    weatherObj.current.temp
    document.getElementById("degrees").textContent = weatherObj.current.temp
    const days = document.querySelectorAll('.tempdays');
    let i = 0
    days.forEach(element => {
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].temp.day
        element.appendChild(divEL)
        i++
    });
}

function drawHumidity(weatherObj){
    console.log(weatherObj)
    weatherObj.current.humidity
    document.getElementById("sweatyaf").textContent = weatherObj.current.humidity
    const days = document.querySelectorAll('.humdays');
    let i = 0
    days.forEach(element => {
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].humidity // fix objects
        element.appendChild(divEL)
        i++
    });
}

function drawWind(weatherObj){
    console.log(weatherObj) 
    weatherObj.current.wind_speed
    document.getElementById("windy").textContent = weatherObj.current.wind_speed
    const days = document.querySelectorAll('.winddays');
    let i = 0
    days.forEach(element => {
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].wind_speed
        element.appendChild(divEL)
        i++
    });
}

function drawIndex(weatherObj){
    console.log(weatherObj) 
    weatherObj.current.uvi // This is current 
    document.getElementById("uvindex").textContent = weatherObj.current.uvi
    const days = document.querySelectorAll('.uvdays');
    let i = 0
    days.forEach(element => {
        // Create elements with document.createelement 
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].uvi // fix objects
        element.appendChild(divEL)
        i++
    });
}

document.getElementById('form').addEventListener("submit", searchAndSubmit)




