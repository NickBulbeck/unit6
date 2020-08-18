// Part 1: retrieve the data, and log out the body of the response.

// Write the function that calls all the others. Oh, and require stuff in.
const getData = require('./dataAccess').getData;


const handleWeatherRequest = () => {
  const inputRequest = process.argv.slice(2);
  let location = inputRequest[0];
  if (!location) {
    console.log("You didn't input a location, so you're getting Glasgow.");
    location = 'Glasgow';
  }
  getData(location);
}

handleWeatherRequest();

module.exports.handleWeatherRequest = handleWeatherRequest;

