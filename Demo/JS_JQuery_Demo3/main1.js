"use strict";
// from tutorialspoint.com

// Version 1 - No Call Back
// Alert displays early

// $(document).ready( () => {
//     $("div").click(function(){
//         $(this).hide(1000);
//         alert("I'm hidden now");
//      });
// });


// Version 2 - With Call Back
// The alert will wait until the button 
// has disappeared before displaying

$(document).ready( () => {
    $("div").click(function(){
       $(this).hide(1000, function(){
          alert("im not owned! im not owned!!");
       });
    });
});




