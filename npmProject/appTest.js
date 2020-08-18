const expect = require('chai').expect;

const app = require('./app');
const dataAccess = require('./dataAccess');


// const titleCase = (title) => {
// 	let workingTitle = title.toLowerCase();
// 	let words = workingTitle.split(' ');
// 	let titleCasedWords = words.map(function(word) {
// 		return word[0].toUpperCase() + word.substring(1);
// 	})
// 	return titleCasedWords.join(' ');
// }

// expect(titleCase('the great mouse detective')).to.be.a('string');
// expect(titleCase('t')).to.equal('T');
// expect(titleCase('alien')).to.equal('Alien');
// expect(titleCase('ALIEN')).to.equal('Alien');

// expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective');

// Call the main function in app.js

expect(app.handleWeatherRequest()).to.be.a('string');

console.log("appTest.js successfully completed from 'npm test' command");
