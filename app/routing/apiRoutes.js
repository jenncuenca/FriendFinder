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
    app.get("/data/friends", function (req, res) {
        res.json(friends);
    });

    //FORM SUBMISSION REQUEST
    app.post('/data/friends', function (req, res) {

var newFriend = {
    name: req.body.name,
    photo: req.body.photo,
    scores: []
  };
  var scores = [];

  // ****** GETTING ERROR "TypeError: Cannot read property 'length' of undefined" **** //
  for(var i=0; i < req.body.scores.length; i++){
    scores.push( parseInt(req.body.scores[i]) )
  }
  newFriend.scores = scores;

  // CROSS REF NEW FRIEND WITH EXISTING ONES
  var scoreComparisionArray = [];
  for(var i=0; i < friends.length; i++){

    // CHECK SCORES AND ADD UP DIFFERENCE IN POINTS
    var currentComparison = 0;
    for(var j=0; j < newFriend.scores.length; j++){
      currentComparison += Math.abs( newFriend.scores[j] - friends[i].scores[j] );
    }

    // PUSH COMPARISON TO ARRAY
    scoreComparisionArray.push(currentComparison);
  }

  // DETERMINE BEST MATCH
  var bestMatchPosition = 0;
  for(var i=1; i < scoreComparisionArray.length; i++){
    
    if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
      bestMatchPosition = i;
    }

  }

  // IF 2 HAVE SAME RESULTS CHOOSE NEWEST FRIEND DATA ENTRY
  var bestFriendMatch = friends[bestMatchPosition];

  // BEST MATCH RESULT
  res.json(bestFriendMatch);

  // ADD NEW FRONT TO FRIEND'S DATA ARRAY
  friends.push(newFriend);

});


};