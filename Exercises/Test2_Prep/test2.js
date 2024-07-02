
const validate_goon_time = () => {
    if (isNaN($("#minutes_gooned").val()) || parseFloat($("#minutes_gooned").val()) <= 0 ||  $("#minutes_gooned").val() == "") {
        $("#minutes_gooned_error").removeClass("hidden");
        $("#div4").addClass("hidden");
    } else {
        $("#minutes_gooned_error").addClass("hidden");
        $("#div4").removeClass("hidden");
    }
}

const calculate_goon_with_jelque = () => {
    if ($("#minutes_gooned_error").attr("class") == "hidden") {
    let jelque_value = 1;
    if ($("#jelque_bonus_yes").prop("checked") == true) {
        jelque_value = Math.PI;
    }
    $("#minutes_gooned_with_jelque").val((parseFloat($("#minutes_gooned").val()) * jelque_value).toFixed(2))
    }
}

const process_data = (e) => {
    if (e.which == 13) {
        goon_data.push(parseFloat($("#minutes_gooned_with_jelque").val()));
        total_days += 1;

        $("#current_day").val(total_days);
        let total_minutes = goon_data.reduce((acc, curr) => {
            return acc + curr;
        });
        $("#total_minutes_gooning").val(total_minutes.toFixed(2));

        if (total_days == 5) {
            show_results();
        }
    }
}

const show_results = () => {
    $("#div3").addClass("hidden");
    $("#div4").addClass("hidden");
    $("#div5").removeClass("hidden");
    let result_list = document.createElement("ul");
    for (let i = goon_data.length-1;i >= 0; i--) {
        console.log(goon_data[i], i);
        let result_item = document.createElement("li");
        result_item.textContent = `Day ${i+1}: ${goon_data[i]}`
        result_list.append(result_item);
    }
    $("#div5").append(result_list)
}

// Global Variables
var goon_data = [];
var total_days = 0;

$(document).ready(() => {
    $("#minutes_gooned").on("change", validate_goon_time);
    $("#minutes_gooned").on("change", calculate_goon_with_jelque);
    $("#jelque_bonus_yes").on("change", calculate_goon_with_jelque);
    $("#jelque_bonus_no").on("change", calculate_goon_with_jelque);
    $("#process_data").on("keypress", process_data);
});