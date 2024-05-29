"use strict";
// CP1295 Advanced JavaScript CP1295

const $ = selector => document.querySelector(selector);

const validateName = (name) => {
    if (name == "") {
        $("#name_feedback_id").textContent = "Name cannot be blank";
        $("#name_id").value = "";
    }
    else {
        $("#name_feedback_id").textContent = "";
    }
}

const validateSeats = (seats) => {
    if (seats == "") {
        $("#seats_feedback_id").textContent = "Seat cannot be blank";
        $("#seats_id").value = "";
    }
    else {
        if (isNaN(seats) ||  parseInt(seats) < 0 || parseInt(seats) > 4) {
            $("#seats_feedback_id").textContent = "Seat must be a valid number (1..4)";
            $("#seats_id").value = "";
        }
        else {
            $("#seats_feedback_id").textContent = ""; 
        }
    }
}

const validateSeatCount = (seats, seat_count) => {
    if ((parseInt(seat_count) + parseInt(seats)) > 12) {
        $("#seat_count_feedback_id").textContent = "Total seat count cannot exceed 12";
    }
    else {
        $("#seat_count_feedback_id").textContent = "";
    }
}

const processTicket = () => {
    let name = $("#name_id").value;
    let seats = $("#seats_id").value;
    let seat_count = $("#seat_count_id").value;

    if (seat_count == "") {
        seat_count = 0;
    }

    validateName(name);
    validateSeats(seats);
    validateSeatCount(seats, seat_count);

    // Only add to text area if all 3 validation tests pass
    if ($("#name_feedback_id").textContent == "" && $("#seats_feedback_id").textContent == "" && $("#seat_count_feedback_id").textContent == "") {
        $("#seat_count_id").value = parseInt(seat_count) + parseInt(seats);
        // Don't add initial breakline after text area has been cleared
        if ($("#output_ta_id").textContent.length == 0){
            $("#output_ta_id").append(`${name} ${seats}`);
        }
        else {
            $("#output_ta_id").append("\n");
            $("#output_ta_id").append(`${name} ${seats}`);
        }
        
    }

    
}

// Clear input field values and text area
const clearFields = () => {
    $("#name_id").value = "";
    $("#seats_id").value = "";
    $("#seat_count_id").value = "";
    $("#name_feedback_id").textContent = "";
    $("#seats_feedback_id").textContent = ""; 
    $("#seat_count_feedback_id").textContent = "";
    $("#output_ta_id").textContent = "";
}

// Attach functions to buttons on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Ready!");
    $("#process_ticket_id").addEventListener("click", processTicket);
    $("#clear_fields_id").addEventListener("click", clearFields);
});
