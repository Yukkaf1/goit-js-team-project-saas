import './sass/_weatherForecast.scss'

import moment from 'moment';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const URL2 = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'be0f81a8f9f4c462088b51501fa506a7'

const weatherWeek = document.querySelector('#weatherWeek');
const weatherEl = document.querySelector('#root'); 
const weatherEl2 = document.querySelector('#root2');


day =  moment(new Date()).format('ddd')
date = moment(new Date()).format('DD MMM YYYY')


const fetchWeatherGeo = async (lat=33.44, lon=-94.04, units='metric') => {
  console.log('Есть гео')
 
  const { data } = await axios.get(`${URL}/?lat=${lat}&lon=${lon}&units=${units}&exclude=deyly&APPID=${API_KEY}`);
     console.log (data);
     return data;
 
 }

const weatherApp = () => {
  geoWeatherApp()
    }

const geoWeatherApp = () => {
      
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const units = 'metric'


      fetchWeatherGeo(lat, lon, units)
           .then(renderWeather)
            .catch(error => {});
      }) ??
      fetchWeatherGeo()
           .then(renderWeather)
            .catch(error => {});
   
    }
    

const renderWeather = (weather) => {
console.log(weather.main.temp, weather.name, Math.round(weather.main.temp), weather.weather[0].icon, weather.weather[0].description, new Date().getDay(), new Date().getDate(), new Date().getFullYear(), new Date().getMonth());
console.log(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`);

weatherEl.innerHTML = `
        
        <div class="weather_main-container">

        <div class="weather_weather-nav">
        <div class="weather_city-temp">
        ${Math.round(weather.main.temp)}
            <sup>&deg;</sup>
        </div>
  
        <div class="weather_city-info">
            <p class = "weather_weather-description">${weather.weather[0].description}</p>
            <p class = "weather_city-name">
                <span class = "weather_weather-name">${weather.name}</span>

            </p>
        
      </div>
    </div>
          
              <div class="weather_info-icon">
                  <img class="weather_city-icon" src="${`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}" alt="${weather.weather[0].description}"/>
              </div>
  
              <div  class = "weather_info-down">
                <p class="weather_info-date"> ${day} <br> ${date} </p>

                <button  type="button" class="weather_weatherBtn" id="loadWeater" >weather for week</button>
              </div>
        `
}

weatherApp();

export default weatherApp;


// ----------------------------- 7 DAY -------------------------------


const fetchWeather7day = async (lat=33.44, lon=-94.04, units='metric') => {
  console.log('Есть гео')
 
  const { data } = await axios.get(`${URL2}?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
  console.log(data)
     return data;
 
 }


 function fetchTemp () {
    fetchWeather7day()
    // .then(response => {
    //     if (!response.ok) {
    //         console.log('Oops, there is no country with that name');
    //       } else return response.json();
    //     })
    .then(data => {
            const day0 = data.list[0]
            const day1 = data.list[8]
            const day2 = data.list[16]
            const day3 = data.list[24]
            const day4 = data.list[32]
            const day5 = data.list[39]

            console.log(moment(new Date(day1.dt*1000)).format('ddd DD MMM LT'), day1.main.temp, day1.weather[0].description)
            console.log(moment(new Date(day2.dt*1000)).format('ddd DD MMM LT'), day2.main.temp, day2.weather[0].description)
            console.log(moment(new Date(day3.dt*1000)).format('ddd DD MMM LT'), day3.main.temp, day3.weather[0].description)
            console.log(moment(new Date(day4.dt*1000)).format('ddd DD MMM LT'), day4.main.temp, day4.weather[0].description)
            console.log(moment(new Date(day5.dt*1000)).format('ddd DD MMM LT'), day5.main.temp, day5.weather[0].description)

          
             weatherEl2.innerHTML =  `
                  <div class="weather2_main-container">
                  <div class="weather2_weather-nav">
                  <div class="weather2_city-temp">
                  ${Math.round(day1.main.temp)}
                  <sup>&deg;</sup>
                   </div>
  
        <div class="weather2_city-info">
            <p class = "weather2_weather-today">${moment(new Date(day0.dt*1000)).format('ddd DD MMM LT')}</p>
            <p class = "weather2_city-name">
                <span class = "weather2_weather-name">${data.city.name}</span>
            </p>
         </div>
    </div>
                  <div class="weather2_week-info">
                  <table> 
                  <p class="weather2_weather-today"> Forecast at Same Time <br> 5 DAY ${moment(new Date(day0.dt*1000)).format('LT')}</p>
              
                  <tr>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item">${Math.round(day1.main.temp)} <sup>&deg;</sup> </p>
                  </td>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item"></b>${moment(new Date(day1.dt*1000)).format('ddd DD MMM')}</p>
                  </td>
                  </tr>

                  <tr>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item>${Math.round(day1.main.temp)} <sup>&deg;</sup> </p>
                  </td>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item"></b>${moment(new Date(day2.dt*1000)).format('ddd DD MMM')}</p>
                  </td>
                  </tr>

                  <tr>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item>${Math.round(day1.main.temp)} <sup>&deg;</sup> </p>
                  </td>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item"></b>${moment(new Date(day3.dt*1000)).format('ddd DD MMM')}</p>
                  </td>
                  </tr>

                  <tr>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item>${Math.round(day1.main.temp)} <sup>&deg;</sup> </p>
                  </td>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item"></b>${moment(new Date(day4.dt*1000)).format('ddd DD MMM')}</p>
                  </td>
                  </tr>

                  <tr>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item>${Math.round(day1.main.temp)} <sup>&deg;</sup> </p>
                  </td>
                  <td class="weather2_week-item>
                  <p class="weather2_week-item"></b>${moment(new Date(day5.dt*1000)).format('ddd DD MMM')}</p>
                  </td>
                  </tr>
    
                  </table>
                  </div>


                  <div  class = "weather2_info-down">
                  <button  type="button" class="weather2_weatherBtn" id="loadWeater" >weather for week</button>
              </div>

                </div>`;
            }
    )
            }

        
            fetchTemp ()      

        // const weatherBtn = document.querySelector('#weatherWeek');
        // weatherBtn.addEventListener('click', fetchTemp)
 

     
 