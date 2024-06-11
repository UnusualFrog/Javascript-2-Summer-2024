"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);

var master_clock_var = 0;
var master_clock_step_var = 0;

var power_level_var = 0;
var power_level_step_var = 0;

var charge_status = 0;
var driving_status = 0;

const drive_car_process = () => {

}


const tick = () => {
  // alert("Tick");
  master_clock_var += master_clock_step_var;
  $("#timer_id").value = master_clock_var;
  increase_charge();
}

const start_timer = () => {
  // Speed Input validation
  if (isNaN($("#speed_KMH_id").value)) {
    $("#speed_KMH_id_span").textContent = "Invalid Input: Speed must be numeric";
  } else if (parseFloat($("#speed_KMH_id").value) < 1 || parseFloat($("#speed_KMH_id").value) > 240) {
    $("#speed_KMH_id_span").textContent = "Invalid Input: Speed must be between 1-240";
  } else {
    alert("Timer Started");
    // Using an Interval Timer
    master_clock_step_var = 1;
    setInterval(tick, 2000);
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

const increase_charge = () => {
  if (charge_status == 1) {
    if (power_level_var + power_level_step_var < 100) {
      $("#timer_id_span").textContent = "Battery Charging"
      power_level_var += power_level_step_var;
    } else {
      $("#timer_id_span").textContent = "Battery Charged"
      power_level_var = 100;
      charge_status = 0;
      $("#battery_charge_id").checked = false;
    }
    $("#battery_power_id").value = power_level_var;
  }
}


const drive_car = () => {
  driving_status = 1;
  charge_status = 0;
  power_level_step_var = -1;
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = true;
  charging_indicator.checked = false;
}

document.addEventListener("DOMContentLoaded",
  () => {

    $("#charge_battery_btn").addEventListener("click", charge_battery);
    $("#drive_car_btn").addEventListener("click", drive_car);
    $("#start_btn").addEventListener("click", start_timer);
    $("#reset_btn").addEventListener("click", reset_system);

  });
