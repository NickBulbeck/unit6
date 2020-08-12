/*
  The idea of this is just a proof-of-concept for creating my own modules.
  Because there's a large amount of commenting in the code, cutting some of it
  out doesn't work as well as it does in Andrew Chalkley's online version!
  As a result, the file is not organised the way it would normally be, and the
  snippet in here isn't quite what I'd normally package up into its own file.

*/

const https = require('https');
const http = require('http');

function printError(error) {
  console.log(`An error occured: ${error.message}`);
}

function printMessage(username, badgeCount, point,total) {
  let message = `${username} has ${badgeCount} badges and ${point} JavaScript points`;
  if (username === 'Nick Bulbeck') {
    message += ` (${total} points in total)`;
  }
  console.log(message);
}


function blub(username){
// Connect to the API url https://teamtreehouse.com/nickbulbeck.json
  const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
    if (response.statusCode === 200) {
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
        try {
          const userProfile = JSON.parse(body);     // to, and 'body' is complete.
          const name = userProfile.name;          // Now, finally, we can use the
          const badges = userProfile.badges.length;   // JSON schema from the Treehouse API.
          const points = userProfile.points.JavaScript; // (You'll notice that json.badges is an array.)
          const total = userProfile.points.total;
          printMessage(name,badges,points,total); 
        } catch (error) {
          printError(error);
        }
      })
    } else {
      const message = `Bother ensued while getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
      // http.STATUS_CODES is an array of status codes that give meaningful messages for non-developers
      const statusCodeError = new Error(message);
      printError(statusCodeError);
    }
    
  }); 
  // Next: there are various event properties associated with a request, and 'error' is one.
  // This error is fired if the HTTP request fails.
  request.on('error', error => printError(error)); // nothing wrong with console.log,
}                                                               // but console.error shows up in
                                                                // colour in some terminals.

// Now, this is how we make content in THIS file (which is now a module) available to another
// file that require's it:
module.exports.getProfile = blub; // the first name (getProfile) is the name to use in the
                                  // calling module that require's this one in; the second
                                  // name (blub) is what it's called here.



