// === DEPENDENCIES === //
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// === EXPRESS CONFIGURATION === //
var app = express();

// initial port
var PORT = process.env.PORT || 8080;

// BodyParser to interpret data sent to server.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use('/static', express.static(path.join(__dirname, 'app/public')))


// === ROUTER ROUTES === //
//require("./app/routing/apiRoutes.js")(app);
//require("./app/routing/htmlRoutes.js")(app);


// === LISTENER for starting server === //
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });