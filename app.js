// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// Read the data in
// JSON.parse() the data
// Print the data

// the docs for https are at
// https://nodejs.org/dist/latest-v12.x/docs/api/https.html#https_https_get_options_callback
const https = require('https');
const http = require('http'); // for the statusCode object
const profile = require('./profile.js') // note the directory in the pathname. The .js is optional, BTW.
const defaultUsers = [
	'alenaholligan',
	'nickbulbeck',
	'chalkers',
	'davemcfarland'
	// 'naebdy' // - cannae dae this at this stage, because there's no error handling yet. This will 
	// crash the program. 
]

// Print message to the console
function printMessage(username, badgeCount, point,total) {
	let message = `${username} has ${badgeCount} badges and ${point} JavaScript points`;
	if (username === 'Nick Bulbeck') {
		message += ` (${total} points in total)`;
	}
	console.log(message);
}

function printError(error) {
  console.log(`An error occured: ${error.message}`);
}


// in here, originally, was the getProfile() function. It's in profile.js.


// users.forEach(user => getProfile(user));
// USEFUL NOTE ON ARROW-FUNCTION CALLBACKS
// because forEach always passes exactly one parameter, and getProfiles takes exactly one parameter, you
// can also type this:

// users.forEach(getProfile);

// This may look confusing, because of what's missing from it. But it's a Thing! The single parameter
// we KNOW is passed BY .forEach() is implicitly passed TO getProfile.
// 

// And Now: the 'process' object. This is a bit like the 'window' object in the browser, except that 'process' is
// for Node.js.
// console.dir(process); // displays a veritable ton of stuff.
// console.log(process.argv);
// argv is an array of command-line arguments passed to the file when you type node app.js. There are two that
// are in by default; the path to node, and the full filename of app.js. Slicing off the first two will give
// you the arguments passed in by the command
// node app.js nickbulbeck chalkers // etc. 
// Remember - these are command-line arguments. They don't go in quotes or brackets. Like ls -al

// NOW: request.on('error'...) works if the request fails. But if (e.g.) we pass in a malformed url, node 
// itself creates an error. This needs try/catch.
const tryProfile = (username) => {
  try {
    profile.getProfile(username); // note the reference to the ./profile.js module
  } catch(error) { // again, if you fall into the catch-block, the error object is passed in automatically
    printError(error);
  }
}

const inputUsers = process.argv.slice(2);
if (inputUsers[0]) {
	inputUsers.forEach(tryProfile); 
	} else {
		defaultUsers.forEach(tryProfile);
}


