"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);

var master_clock = null;
var master_clock_var = 0;
var master_clock_step_var = 0;

var power_level_var = 0;
var power_level_step_var = 0;

var charge_status = 0;
var driving_status = 0;



const drive_car_process = () => {
  if (power_level_var - power_level_step_var > 0) {
    $("#timer_id_span").textContent = "Driving Car";
    power_level_var -= power_level_step_var;
  } else {
    $("#timer_id_span").textContent = "Battery Depleted";
    power_level_var = 0;
    driving_status = 0;
    $("#battery_drain_id").checked = false;
  }
  $("#battery_power_id").value = power_level_var.toFixed(2);
}

const charge_battery_process = () => {
  if (power_level_var + power_level_step_var < 100) {
    $("#timer_id_span").textContent = "Battery Charging";
    power_level_var += power_level_step_var;
  } else {
    $("#timer_id_span").textContent = "Battery Charged";
    power_level_var = 100;
    charge_status = 0;
    $("#battery_charge_id").checked = false;
  }
  $("#battery_power_id").value = power_level_var.toFixed(2);
}

const tick = () => {
  master_clock_var += master_clock_step_var;
  $("#timer_id").value = master_clock_var;
  if (charge_status == 1) {
    charge_battery_process();
  } else if (driving_status == 1) {
    drive_car_process();
  }
}

const start_timer = () => {
  if (master_clock == null) {
    alert("Timer Started");
    $("#timer_id_span").textContent = "Simulator Started";
    master_clock_step_var = 1;
    master_clock = setInterval(tick, 2000);
  }
}

const reset_system = () => {

}

const charge_battery = () => {
  driving_status = 0
  charge_status = 1;
  power_level_step_var = 12
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = false;
  charging_indicator.checked = true;
}

const drive_car = () => {
  let currentKMH = $("#speed_KMH_id").value;
  let currentKMM = currentKMH / 60;
  driving_status = 1;
  charge_status = 0;
  power_level_step_var = currentKMM;
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = true;
  charging_indicator.checked = false;
}

const update_speed = () => {
  let currentKMH = $("#speed_KMH_id").value;
  let currentKMM = currentKMH / 60;
  if (validate_speed()) {
    power_level_step_var = currentKMM;
    $("#speed_KMM_id").value = currentKMM.toFixed(2);
  }
}

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

const validate_action = () => {
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  if (charging_indicator.checked == false && driving_indicator.checked == false) {
    $("#battery_mode_id_span").textContent = "Error: Must select a mode";
    return false;
  }
  $("#battery_mode_id_span").textContent = "";
  return true;
}

document.addEventListener("DOMContentLoaded",
  () => {
    $("#charge_battery_btn").addEventListener("click", charge_battery);
    $("#drive_car_btn").addEventListener("click", drive_car);
    $("#start_btn").addEventListener("click", start_timer);
    $("#reset_btn").addEventListener("click", reset_system);
    $("#speed_KMH_id").addEventListener("change", update_speed);
  });
