let currentDate = moment().format('MM/DD/YYYY');
let forecastAPIKey = "";
let forecastSymbol = $("#forecastsymbol");
let forms = $("form");
let hThreeEl = "";
let humidHot;
let insertArea = $(".insertarea");
let latitude = "";
let liEl = ""; 
let listOfCities = [];
let longitude = "";
let newDay; 
let paraEl = "";
let picImg = "";
let presentCity = $("#nameofcity");
let presentDate = $("#todaysdate");
let presentHour = today.format("hours");
let presentHum = $("#sweatyaf");
let presentMin = "";
let presentTemp = $("#degrees");
let presentUVIndex = $("#uvindex"); 
let presentWind = $("#windy");
let searchButton = $("button");
let spanEl = "";
let symbolCode = "";
let symbolURL = "";
let tempDegrees; 
let textEl = $("text");
let today = moment();
let tomorrowDays =$(".tomorrow");
let ulEl = $("#listofplaces");
let ultraV;
let windBlows;
let zeroDays = 6;

presentDate.html(currentDate);

let cityLocationWeather = function (city) {
    // let theAPIUrl = ""+city+""+zeroDays+""+forecastAPIKey;

  fetch(theAPIUrl)
    .then(function (results) {
      if (results.status === 200) {
        results.json().then(function (data) {
         latitude = ""; longitude = "";
          weatherDisp(data);
          if(latitude != "" && longitude != ""){
            fetchPresentForecast(latitude, longitude);
          }
        });
      } else {
        alert('Error: ' + results.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather API site');
    });
}  

function fetchPresentForecast(latitude, longitude){
//   let myUrl = ""+latitude+""+longitude+""+forecastAPIKey; //having issues with this
  fetch(myUrl)
  .then(function (results) {
    if (results.status === 200) {
        results.json().then(function (data) {
        presentUVIndex.text(data.current.uvi)
        weeklyDisp(data)
      });
    } else {
      alert('Error: ' + results.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to return desired results');
  });

}

function listOfPastEntries(){
  let cities = localStorage.getItem("listOfCities")
  if(cities === "" || cities === null){return false;}
  listOfCities = JSON.parse(cities);
  if(listOfCities.length < 0){return false;}
  listOfCities.sort();
  ulEl.empty();
  for(let i=0; i<listOfCities.length; i++){
    liEl = $("<li>").text(listOfCities[i]);
    liEl.attr('class','list-group-item');
    ulEl.append(liEl)
    liEl = ""
  }
}

function searchAndSubmit(event) {
  event.preventDefault();

  let inputSearchValue = $('#letssearch').val();
  
  if (!inputSearchValue) {
    console.error('Please enter a value');
    return;
  }
  
  $('#letssearch').val('');
  tomorrowDays.empty();
  cityLocationWeather(inputSearchValue)

  inputSearchValue = inputSearchValue.toLowerCase();
  
  if(listOfCities.includes(inputSearchValue) !== true){
    listOfCities.push(inputSearchValue);
    localStorage.setItem("listOfCities",JSON.stringify(listOfCities))
    liEl = $("<li>").text(inputSearchValue);
    liEl.attr('class','list-group-item');
    ulEl.append(liEl)
  }
}

function setWeather(newDay, symbolURL, tempDegrees, humidHot){
  spanEl = $('<span>');
  hThreeEl = $('<h5>');
  picImg = $('<img>');
  paraEl = $('<p>');
  hThreeEl.text(newDay);
  picImg.attr('src', symbolURL);
  paraEl.text("tempDegrees : " + tempDegrees);
  paraEl.attr('class','tempDegrees');
  spanEl.append(hThreeEl, picImg, paraEl);
  paraEl = $('<p>').text("humidHot : " + humidHot+"%");
  spanEl.append(paraEl)
  tomorrowDays.append(spanEl)
}

function weatherDisp(data){
  presentCity.text(data.name+", "+data.sys.country);
  longitude = data.coord.longitude;
  latitude = data.coord.latitude;
}

function weeklyDisp(data){
    tempDegrees = data.daily[0].temp.day;
    tempDegrees = tempDegrees.toFixed(0);
    presentTemp.text(tempDegrees);
  
  for (let i = 0; i < 6; i++) {
    newDay = moment.unix(data.daily[i].dt).format('MM/DD/YYYY');
    symbolCode = data.daily[i].weather[0].icon;
    // symbolURL = "http" + symbolCode + ".png";
    tempDegrees = data.daily[i].temp.day;
    tempDegrees = tempDegrees.toFixed(0);
    humidHot = data.daily[i].humidHot;
    windBlows = data.daily[i].windy;
    
    if(i==0){
      forecastSymbol.attr('src', symbolURL);
      presentTemp.text(tempDegrees);
      presentHum.text(humidHot+"%");
      presentWind.text(windBlows+" KPH");
      ultraV = data.daily[i].uvi;
      presentUVIndex.removeClass();
      let ultravClass = ultraVioletLevels(ultraV)
      presentUVIndex.text(ultraV)
      presentUVIndex.attr('class', ultravClass);
    }else{
      setWeather(newDay, symbolURL, tempDegrees, humidHot, windBlows);
    }
  }
}

// function ultraVioletLevels(uvi){
// //   uvi = parseFloat(uvi)
// //   let cat = "";
// //   if(uvi <= 2){
// //     cat = "green"
// //   }else if(uvi >= 3 && uvi < 6){
// //     cat = "yellow"
// //   }else if(uvi >= 6 && uvi < 8){
// //     cat = "orange"
// //   }else if(uvi >= 8 && uvi < 11){
// //     cat = "red"
// //   }else{
// //     cat = "violet"
// //   }
// //   return cat;
// // }

forms.on('submit', searchAndSubmit);
ulEl.on('click', function(event){
  event.preventDefault();
  let newValue = $(event.target).html();
  $('#letssearch').val(newValue);
  searchButton.click();
});
listOfPastEntries();



