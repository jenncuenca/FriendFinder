// === DEPENDENCIES === //
const fs = require("fs");
const path = require("path");

//=== CONFIRM ROUTE CONNECTION === //
console.log("// API ROUTE SUCCESSFUL...")

//Required API Data
var friends = require('../data/friends.js');

// === ROUTING === //
module.exports = function apiRoute(app) {
    // get request for API
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //post request for form submissions
    app.post('/api/friends', function (req, res) {

        var match = {
            name: '',
            photo: '',
            friendDifference: 1000
        };

        //survery results parsed

        var userData = req.body;
        var userScore = userData.scores;

        // var for calculation of difference in user scores
        var totalDiff = 0;

        //loop through all friend possibilities

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDiff = 0;
        }

        //loop through all friend scores

        for (var f = 0; f < friends[i].scores[f]; f++) {

            totalDiff += Math.abs(parseInt(userScore[f]) - parseInt(friends[i].scores[f]));

            //to determine best match

            if (totalDiff <= match.friendDifference) {
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.friendDifference = totalDiff;
            }
        }

        //save to data
        friends.push(userData);

        res.json(match);

    });

};