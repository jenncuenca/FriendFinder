// === DEPENDENCIES === //
var path = require('path');

// === CONFIRM ROUTE CONNECTION ===//
console.log("// HTML ROUTE SUCCESSFUL ...")

// === ROUTING === //
module.exports = function (app) {
	
	// HTML GET Requests that handles when users "visit" a page.

	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// If no matching route is found route to home
	app.use(function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
};