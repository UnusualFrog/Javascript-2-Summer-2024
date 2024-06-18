"use strict";
// from tutorialspoint.com

// Version 1 - No Call Back
// Alert displays early
$(document).ready( () => {

   $("#right").click(function(){
      $("div").animate({left: '250px'}, 1000, 
                                            function(){
                                             alert("I have reached to the right");
                                            }
                      );
   });

   $("#left").click(function(){
      $("div").animate({left: '0px'}, 1000, 
                                            function(){
                                             alert("I have reached to the left");
                                            }
                     );
   });

   $("#funky").click(() => {
      $("div").animate({left: '250px'}, 100, 
                                            function(){
                                             $("div").animate({left: '0px'}, 100, 
                                             function(){
                                                $("div").animate({left: '2500px'}, 1000)
                                             });
                                            }
                     );
   });

});


