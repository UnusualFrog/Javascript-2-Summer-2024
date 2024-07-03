"use strict"

var day_val = 1;
var precipitation_data = [];

$(document).ready(() => {
  $("#day_id").val(day_val);

  $("#yn_input_id").change(evt => { next_day() })
  $("#precipitation_input_id").change(check_precipitation_input);
  $("#results_id").hide();
});

const next_day = () => {
  var yn = $("#yn_input_id").val();
  if (yn == "Y" || yn == "y") {
    process_data();
    day_val++;
    $("#day_id").val(day_val);
    if (day_val == 6) {
      show_results();
    }
  }
  $("#yn_input_id").val("");
  
}

const check_precipitation_input = () => {
  var precipitation_input_ele = $("#precipitation_input_id");
  var precipitation_input_txt = precipitation_input_ele.val();
  var precipitation_input_val = -1;
  var error_status_p = false;

  if (isNaN(precipitation_input_txt) ||
    precipitation_input_txt == "") {
    error_status_p = true;
    $("#yn_id").hide();
    precipitation_input_ele.next().text("Error - Not a Number");
    $("inches_display_id").val("0");
  }
  else {
    precipitation_input_val = parseInt(precipitation_input_txt);

    if (precipitation_input_val < 0 ||
      precipitation_input_val > 1000) {
      error_status_p = true;
      $("#yn_id").hide();
      precipitation_input_ele.next().text("Error - <0 or > 1000");
      $("#inches_display_id").val("0");
    }
    else {
      precipitation_input_ele.next().text("");
      var inches_val = 0;
      $("#yn_id").show();
      $("#inches_display_id").val(inches_val);
      mm_to_in();
    }
  }
  
}

const reset_form = () => {
  $("#precipitation_input_id").val("0");
  $("#precipitation_input_id").next().text("");
  $("inches_display_id").val("0");
  $("rain_selected_id").checked = true;
  $("snow_selected_id").checked = false;
}

const mm_to_in = () => {
  let mm_value = parseFloat($("#precipitation_input_id").val());
  let in_val = mm_value * 0.039701;
  $("#inches_display_id").val(in_val.toFixed(2));
  
}

const process_data = () => {
  let mm_value = parseFloat($("#precipitation_input_id").val());
  let rain_or_snow = "Rain";
  if ($("#snow_selected_id").prop("checked") == true) {
    rain_or_snow = "Snow"
  }
  if (rain_or_snow == "Rain") {
    $("#rain_total_id").val((parseFloat($("#rain_total_id").val()) + mm_value));
  } else {
    $("#snow_total_id").val((parseFloat($("#snow_total_id").val()) + mm_value));
  }
  precipitation_data.push(`Day ${day_val}: ${rain_or_snow}: ${mm_value}`)
}

const show_results = () => {
  $("#data_entry_id").hide();
  $("#yn_id").hide();
  $("#results_id").show();
  let result_list = document.createElement("ul");

  for(let i = precipitation_data.length - 1; i >= 0; i--) {
    let list_item = document.createElement("li");
    list_item.textContent = precipitation_data[i];
    result_list.append(list_item);
  }
  $("#results_id").append(result_list);
}