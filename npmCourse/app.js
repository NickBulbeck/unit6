/*
  As an exercise, this course works around installing bcrypt. 
*/

// bcrypt setup:
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD'; // they use this; we've used the one below instead
const someOtherPlaintextPassword = 'not_bacon';
// add in the 'colors' module
const colors = require('colors');


let unsecurePlaintextPassword = "password";

// bcrypt usage:
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(unsecurePlaintextPassword, salt, function(err, hash) {
        // bcrypt doc at this point instructs: Store hash in your password DB
        console.log(hash.blue); // the 'blue' part is fae the colors module
    });
});
