const http = require('http');

const keys = {
  weatherAPI: '51e8dd47214b4288b54113849201808',
  openWeatherMap: '732b7c1bea856b777f79f775aee0c337'
}

const printError = (error) => {
  console.error(`Bother ensued: ${error.message}`);
}

const printForecast = (data) => {
  console.log(`In ${data.location.name}, ${data.location.country}, it is currently ${data.current.temp_c}C (${data.current.temp_f}F)`);
}

const getData = (location) => {
  let key = keys.weatherAPI;
  let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
  const request = http.get(url, (response) => {
    if (response.statusCode === 200) {
      let body = '';
      response.on('data', (data) => {
        body += data.toString();
      })
      response.on('end', () => {
        try {
          let weatherData = JSON.parse(body);
          printForecast(weatherData);
        } catch (error) {
          printError(error)
        }
      })
      // do stuff
    } else {
      console.log(`Bother ensued while getting weather for ${location}: ${http.STATUS_CODES[response.statusCode]}.`)
    }
  });
  request.on('error', error => printError(error));
}



module.exports.getData = getData;

//*************************************************************************
// API URL syntaxes
//*************************************************************************

// for weatherAPI: https://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London -
//                                                  q can be city name, zip code or UK post code
// You can see the format of the response here: https://www.weatherapi.com/api-explorer.aspx

// for openWeatherMap:
// http://api.openweathermap.org/data/2.5/weather?q=london&appid=732b7c1bea856b777f79f775aee0c337
// information here: https://openweathermap.org/current
