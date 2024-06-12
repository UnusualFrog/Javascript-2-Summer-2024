"use strict";

// Shorthand definitions
const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);

// Global variables used by system
var master_clock = null;
var master_clock_var = 0;
var master_clock_step_var = 0;

var power_level_var = 0;
var power_level_drain_step_var = 0;
var power_level_gain_step_var = 0;

var charge_status = 0;
var driving_status = 0;

// Charge or drain battery based on current status
const tick = () => {
  master_clock_var += master_clock_step_var;
  $("#timer_id").value = master_clock_var;
  if (charge_status == 1) {
    charge_battery_process();
  } else if (driving_status == 1) {
    drive_car_process();
  }
}

// Start timer
const start_timer = () => {
  if (master_clock == null) {
    alert("Timer Started");
    $("#timer_id_span").textContent = "Simulator Started";
    master_clock_step_var = 1;
    master_clock = setInterval(tick, 2000);
  }
}

// Reset timer and fields
const reset_system = () => {
  clearInterval(master_clock);
  master_clock = null;
  master_clock_var = 0;
  $("#timer_id_span").textContent = "Simulator Reset";
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = false;
  charging_indicator.checked = false;
  $("#timer_id").value = "0";
  $("#battery_power_id").value = "0";
  $("#speed_KMH_id").value = "0";
  $("#speed_KMM_id").value = "0";
  $("#battery_min_id").value = "0";
}

// Increase battery by one step
const charge_battery_process = () => {
  if (power_level_var + power_level_gain_step_var < 100) {
    $("#timer_id_span").textContent = "Battery Charging";
    power_level_var += power_level_gain_step_var;
  } else {
    $("#timer_id_span").textContent = "Battery Charged";
    power_level_var = 100;
    charge_status = 0;
    $("#battery_charge_id").checked = false;
  }
  $("#battery_power_id").value = power_level_var.toFixed(2);
}

// Decrease battery by one step
const drive_car_process = () => {
  let currentKMH = $("#speed_KMH_id").value;
  let currentKMM = currentKMH / 60;
  if (validate_speed()) {
    if (power_level_var - power_level_drain_step_var > 0) {
      $("#timer_id_span").textContent = "Driving Car";
      power_level_var -= power_level_drain_step_var;
    } else {
      $("#timer_id_span").textContent = "Battery Depleted";
      power_level_var = 0;
      driving_status = 0;
      $("#battery_drain_id").checked = false;
    }
    $("#battery_power_id").value = power_level_var.toFixed(2);
    $("#battery_min_id").value = (power_level_var / currentKMM).toFixed(2);
  }
}

// Turn on charge mode
const charge_battery = () => {
  driving_status = 0;
  charge_status = 1;
  power_level_gain_step_var = 12;
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = false;
  charging_indicator.checked = true;
}

// Turn on drive mode (drain mode)
const drive_car = () => {
  let currentKMH = $("#speed_KMH_id").value;
  let currentKMM = currentKMH / 60;
  power_level_drain_step_var = currentKMM;
  driving_status = 1;
  charge_status = 0;
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = true;
  charging_indicator.checked = false;
}

// Update speed values 
const update_speed = () => {
  let currentKMH = $("#speed_KMH_id").value;
  let currentKMM = currentKMH / 60;
  if (validate_speed()) {
    power_level_drain_step_var = currentKMM;
    $("#speed_KMM_id").value = currentKMM.toFixed(2);
  }
}

// Validate user input speed value
const validate_speed = () => {
  if (isNaN($("#speed_KMH_id").value) || $("#speed_KMH_id").value == "") {
    $("#speed_KMH_id_span").textContent = "Invalid Input: Speed must be numeric";
    return false;
  } else if (parseFloat($("#speed_KMH_id").value) < 1 || parseFloat($("#speed_KMH_id").value) > 240) {
    $("#speed_KMH_id_span").textContent = "Invalid Input: Speed must be between 1-240";
    return false;
  } else {
    $("#speed_KMH_id_span").textContent = "";
    return true;
  }
}

// Attach event listeners on DOM load
document.addEventListener("DOMContentLoaded",
  () => {
    $("#charge_battery_btn").addEventListener("click", charge_battery);
    $("#drive_car_btn").addEventListener("click", drive_car);
    $("#start_btn").addEventListener("click", start_timer);
    $("#reset_btn").addEventListener("click", reset_system);
    $("#speed_KMH_id").addEventListener("change", update_speed);
  });
