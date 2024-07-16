"use strict";

const scores = [];

$(document).ready( () => {
    // Add score button events
    $("#add_score").click(add_score);
    $("#add_score").click(calculate_avg_score);
    $("#add_score").click(get_last_three_scores);
    $("#add_score").click(display_all_scores);

    // Delete score button events
    $("#delete_score").click(delete_score);
    $("#delete_score").click(calculate_avg_score);
    $("#delete_score").click(get_last_three_scores);
    $("#delete_score").click(display_all_scores);

    // set focus on initial load
    $("#score").focus();
    // Hide error span by default
    $("#delete_score_span").hide();
});

const add_score = () => {
    const score = parseFloat($("#score").val());
                
    if (isNaN(score) || score < 0 || score > 100) {
        $("#add_score").next().text("Score must be between 0 and 100."); 
    }
    else {
        $("#add_score").next().text("");  

        // add score to scores array 
        scores.push(score);
    }
    
    // get text box ready for next entry
    $("#score").val("");
    $("#score").focus(); 
}

const delete_score = () => {
    let index = $("#index").val();
        if (!isNaN(index) && scores.length > 0 && index < scores.length) {
            scores.splice(index, 1);

            $("#all").text(scores.join(", "));
            $("#delete_score").next().text(""); 
            
            $("#index").val("");
            $("#score").focus(); 
        } else {
            $("#delete_score").next().text("Index must be a number in range of the entered scores"); 
        }
}

// display average score
const calculate_avg_score = () => {
    if (scores.length > 0) {
        const total = scores.reduce( (tot, val) => tot + val, 0 );
        const avg = total/scores.length;
        $("#avg").text(avg.toFixed(2));
    } else {
        $("#avg").text("");
    }
}

// display last 3 scores
const get_last_three_scores = () => {
    const len = scores.length;
    const copy = (len <= 3) ? scores.slice() : scores.slice(len - 3, len); // copy last three
    copy.reverse();
    $("#last").text(copy.join(", "));
}

    // display all scores
const display_all_scores = () => {
    $("#all").text(scores.join(", "));
}