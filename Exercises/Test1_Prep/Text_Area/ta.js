"use strict";

const $ = selector => document.querySelector(selector);

// Validate input
const validateFields = (data1, data2) => {
    // Check Blanks
    if (data1 == ""){
        $("#span1_id").textContent = "Value required";
    }
    else {
        // Check for non numeric
        if (isNaN(data1)) {
            $("#span1_id").textContent = "Value must be a number";
        }
        else {
            // Check for values <= 0 
            if(data1 <= 0) {
                $("#span1_id").textContent = "Value must be greater than 0";
            }
            else {
                $("#span1_id").textContent = "";
            }
        }
    }

    // Check Blanks
    if(data2 == ""){
        $("#span2_id").textContent = "Value required";
    }
    else {
        // Check for non numeric
        if(isNaN(data2)){
            $("#span2_id").textContent = "Value must be a number";
        }
        else {
            // Check for values <= 0 
            if(data2 <= 0) {
                $("#span2_id").textContent = "Value must be greater than 0";
            }
            else {
                $("#span2_id").textContent = "";
            }
        }
    }
}

// Move user input into text area
const processData = () => {
    // Capture values
    let data1 = $("#data1_id").value;
    let data2 = $("#data2_id").value;

    validateFields(data1, data2);
    
    // Add to text area only if no errors
    if ($("#span1_id").textContent == "" && $("#span2_id").textContent == ""){
        $("#ta_id").append("\n");
        $("#ta_id").append("Values: " + data1 + " " + data2);
    }
}

const upperTextArea = () => {
    let lines = $("#ta_id").value.split("\n");
    console.log(lines);

    for(let i in lines) {
        lines[i] = lines[i].toUpperCase();
    }
    console.log(lines);
}

// Clear input field values
const resetFields = () => {
    $("#data1_id").value = "";
    $("#data2_id").value = "";
    $("#data3_id").value = "";
}

// Attach functions to buttons on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Ready!");
    $("#process_button_id").addEventListener("click", processData);
    $("#reset_button_id").addEventListener("click", resetFields);
    $("#upper_button_id").addEventListener("click", upperTextArea);
});