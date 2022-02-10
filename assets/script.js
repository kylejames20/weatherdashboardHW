let forecastAPIKey = "c9b761f18b670b410a31b85c5dbf9913"; 
let listOfCities = [];


async function getLatAndLon(cityName){
    let geoCode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${forecastAPIKey}`)
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
// document.getElementById('form').addEventListener("submit", searchAndSubmit)

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


// function listOfPastEntries(){
//   let cities = localStorage.getItem("listOfCities")
//   if(cities === "" || cities === null){return false;}
//   listOfCities = JSON.parse(cities);
//   if(listOfCities.length < 0){return false;}
//   listOfCities.sort();
//   for(let i=0; i<listOfCities.length; i++){
    
//   }
// }

function searchAndSubmit(event) {
  event.preventDefault();
  let inputSearchValue = document.getElementById('letssearch').value;
  if (!inputSearchValue) {
    // console.error('Please enter a value');
    return;
  }
  
  inputSearchValue = inputSearchValue.toLowerCase();
  getLatAndLon(inputSearchValue)

  if(listOfCities.includes(inputSearchValue) !== true){
    listOfCities.push(inputSearchValue);
    localStorage.setItem("listOfCities",JSON.stringify(listOfCities))
    }
}
// // This function is to write weather data to the HMTL
function drawTemp(weatherObj){
    console.log(weatherObj) //Work with this object to get weather data
    // code here to add to currnet weather 

    weatherObj.current.temp // This is current 
    document.getElementById("degrees").textContent = weatherObj.current.temp
    // Down here for five days 
    // Rewrite this to non jQuery to write the weather, give things ids and call by ids
    const days = document.querySelectorAll('.tempdays');
    let i = 0
    days.forEach(element => {
        // Create elements with document.createelement 
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].temp.day // fix objects
        element.appendChild(divEL)
        i++
        // Add Wethaer data for 5 days here
    });
}

function drawHumidity(weatherObj){
    console.log(weatherObj) //Work with this object to get weather data
    // code here to add to currnet weather 

    weatherObj.current.humidity // This is current 
    document.getElementById("sweatyaf").textContent = weatherObj.current.humidity
    // Down here for five days 
    // Rewrite this to non jQuery to write the weather, give things ids and call by ids
    const days = document.querySelectorAll('.humdays');
    let i = 0
    days.forEach(element => {
        // Create elements with document.createelement 
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].humidity // fix objects
        element.appendChild(divEL)
        i++
        // Add Wethaer data for 5 days here
    });
}

function drawWind(weatherObj){
    console.log(weatherObj) //Work with this object to get weather data
    // code here to add to currnet weather 

    weatherObj.current.wind_speed // This is current 
    document.getElementById("windy").textContent = weatherObj.current.wind_speed
    // Down here for five days 
    // Rewrite this to non jQuery to write the weather, give things ids and call by ids
    const days = document.querySelectorAll('.winddays');
    let i = 0
    days.forEach(element => {
        // Create elements with document.createelement 
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].wind_speed // fix objects
        element.appendChild(divEL)
        i++
        // Add Wethaer data for 5 days here
    });
}

function drawIndex(weatherObj){
    console.log(weatherObj) //Work with this object to get weather data
    // code here to add to currnet weather 

    weatherObj.current.uvi // This is current 
    document.getElementById("uvindex").textContent = weatherObj.current.uvi
    // Down here for five days 
    // Rewrite this to non jQuery to write the weather, give things ids and call by ids
    const days = document.querySelectorAll('.uvdays');
    let i = 0
    days.forEach(element => {
        // Create elements with document.createelement 
        let divEL = document.createElement('div')
        divEL.textContent = weatherObj.daily[i].uvi // fix objects
        element.appendChild(divEL)
        i++
        // Add Wethaer data for 5 days here
    });
}

// function weatherDisp(data){
//   presentCity.text(data.name+", "+data.sys.country);
//   longitude = data.coord.longitude;
//   latitude = data.coord.latitude;
// }

// function weeklyDisp(data){
//     tempDegrees = data.daily[0].temp.day;
//     tempDegrees = tempDegrees.toFixed(0);
//     presentTemp.text(tempDegrees);
  
//   for (let i = 0; i < 6; i++) {
//     newDay = moment.unix(data.daily[i].dt).format('MM/DD/YYYY');
//     symbolCode = data.daily[i].weather[0].icon;
//     // symbolURL = "http" + symbolCode + ".png";
//     tempDegrees = data.daily[i].temp.day;
//     tempDegrees = tempDegrees.toFixed(0);
//     humidHot = data.daily[i].humidHot;
//     windBlows = data.daily[i].windy;
    
//     if(i==0){
//       forecastSymbol.attr('src', symbolURL);
//       presentTemp.text(tempDegrees);
//       presentHum.text(humidHot+"%");
//       presentWind.text(windBlows+" KPH");
//       ultraV = data.daily[i].uvi;
//       presentUVIndex.removeClass();
//       let ultravClass = ultraVioletLevels(ultraV)
//       presentUVIndex.text(ultraV)
//       presentUVIndex.attr('class', ultravClass);
//     }else{
//         drawTemp(newDay, symbolURL, tempDegrees, humidHot, windBlows);
//     }
//   }
// }

document.getElementById('form').addEventListener("submit", searchAndSubmit)

// // function ultraVioletLevels(uvi){
// // //   uvi = parseFloat(uvi)
// // //   let cat = "";
// // //   if(uvi <= 2){
// // //     cat = "green"
// // //   }else if(uvi >= 3 && uvi < 6){
// // //     cat = "yellow"
// // //   }else if(uvi >= 6 && uvi < 8){
// // //     cat = "orange"
// // //   }else if(uvi >= 8 && uvi < 11){
// // //     cat = "red"
// // //   }else{
// // //     cat = "violet"
// // //   }
// // //   return cat;
// // // }





