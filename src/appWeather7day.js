
const URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'be0f81a8f9f4c462088b51501fa506a7'
import axios from 'axios';
import moment from 'moment';


const fetchWeather7day = async (lat=90.0000, lon=-135.0000, units='metric') => {
  console.log('Есть гео')
 
  const { data } = await axios.get(`${URL}?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
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
            const day1 = data.list[8]
            const day2 = data.list[16]
            const day3 = data.list[24]
            const day4 = data.list[32]

             console.log(day1.dt_txt, day1.main.temp, day1.weather[0].description)
             console.log(day2.dt_txt, day2.main.temp, day2.weather[0].description)
             console.log(day3.dt_txt, day3.main.temp, day3.weather[0].description)
             console.log(day4.dt_txt, day4.main.temp, day4.weather[0].description)
            }
    )
        }


 fetchTemp ()
 fetchWeather7day()

 export default fetchWeather7day;