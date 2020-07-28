// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// Read the data in
// JSON.parse() the data
// Print the data

// the docs for https are at
// https://nodejs.org/dist/latest-v12.x/docs/api/https.html#https_https_get_options_callback
const https = require('https');
const testname = 'alenaholligan';
const defaultUsers = [
	'alenaholligan',
	'nickbulbeck',
	'chalkers',
	'davemcfarland'
	// 'naebdy' - cannae dae this at this stage, because there's no error handling yet. This will 
	// crash the program. 
]

// Print message to the console
function printMessage(username, badgeCount, point) {
	const message = `${username} has ${badgeCount} badges and ${point} JavaScript points`;
	console.log(message);
}

function getProfile(username){
// Connect to the API url https://teamtreehouse.com/${username}.json
	https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
		let body = "";
		// looking that the Node docs, you see that there's a 'data' event which returns the body
		// of the data. Which is in buffer form; so you need to stringify it to read it at all...
		response.on('data', (data) => { // the second 'data' is like 'event' - it's created automatically
			body += data.toString();
			// console.log('Latest bit of data: ', data); // This usually prints out 5 times so far
		})
		// But there's a pitfall here, which is that a buffer isn't necessarily the COMPLETE body of
		// the response; it comes in packets. So the above function will run several times and display
		// a packet of data each time. In general, if you try and parse it to JSON it won't work. You
		// have to wait until the 'end' event - bit like onReadyStateChange going from 3 to 4 in an
		// xmlHTTPrequest object.
		response.on('end', () => { // at this point, the above function has run as many times as it needs
			const userProfile = JSON.parse(body); 		// to, and 'body' is complete.
			const name = userProfile.name; 					// Now, finally, we can use the
			const badges = userProfile.badges.length;		// JSON schema from the Treehouse API.
			const points = userProfile.points.JavaScript;	// (You'll notice that json.badges is an array.)
			printMessage(name,badges,points); 
		})
	});
}

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

const inputUsers = process.argv.slice(2);
if (inputUsers[0]) {
	inputUsers.forEach(getProfile);
	} else {
		defaultUsers.forEach(getProfile);0	
	}


