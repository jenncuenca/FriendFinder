$(document).ready(function() {
    // === GLOBAL VARIABLES === //
    var fieldsComplete;
    

  // SUBMISSION EVENT LISTENER
  $('#submit').on('click', function() {
    
    // CONFIRM REQUIRED FIELDS
    checkForm(function(){

      // AJAX CALL IF COMPLETED
      if(fieldsComplete){
        collectInput();
      }
      else{
        alert('ALL FIELDS MUST BE COMPLETE BEFORE PROCEEDING!');
      }

    });

  });
});

// Function to valid user input
function checkForm(callback){

  // CONFIRM ALL QUESTIONS ANSWERED
  var confirmQuestions;
  
  $('.chosen-select').each(function(){
    if ( $(this).val() == "" ){
      questionsComplete = false;
    }
  })

  // prevent async
  .promise().done(function(){

    // CHECK FOR INCOMPLETE QUESTIONS
    if(confirmQuestions == false){
      fieldsComplete = false;
    }

    // CONFIRM NAME ENTERED
    else if( $('#formName').val().trim() == "" ){
      fieldsComplete = false;
    }

    // CONFIRM IMG LINK
    else if( $('#formImage').val().trim() == "" ){
      fieldsComplete = false;
    }

    else{
      fieldsCompleted = true;
    }

    callback();       

  });
}

function collectInput(){

  // CREATE NEW FRIEND OBJECT
  var newFriend = {
    name: $('#formName').val().trim(),
    photo: $('#formImage').val().trim(),
    scores: []
  };

  // LOOP THROUGH QUESTIONS
  var scores = [];
  $('.chosen-select').each(function(){
    scores.push( parseInt( $(this).val()));
  })

  // prevent async
  .promise().done(function(){
    
    // ADD SCORS TO NEW FRIEND OBJECT
    newFriend.scores = scores;

    // ADD NEW FRIEND TO CUSTOM API POST AND RECIEVE BEST MATCH
    var currentURL = window.location.origin;
    $.post(currentURL + "/api/friends", newFriend, function(data){

      // SHOW BEST MATCH IN MODAL
      $('#matchName').text(data.name);
      $('#matchImg').attr('src', data.photo);
      $("#resultsModal").modal('toggle');

    });

  });

}

 //END SCRIPT