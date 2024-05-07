"use strict";

$(document).ready( () => {

    $("#add_task").click( () => {   
        const textbox = $("#task");
        const task = textbox.val();
        if (task === "") {
            alert("Please enter a task.");
            textbox.focus();
        } else {
            // add task to web storage 
            let tasks = localStorage.E14tasks || "";  // "" is default
            localStorage.E14tasks = tasks.concat(task, "\n");

            // clear task text box and re-display tasks
            textbox.val("");
            $("#task_list").val(localStorage.E14tasks);
                 
            textbox.focus();
        }
    });
    
    $("#clear_tasks").click( () => {
        localStorage.removeItem("E14tasks");
        $("#task_list").val("");
        $("#task").focus();
    }); 
    
    // display tasks on initial load
    $("#task_list").val(localStorage.E14tasks);
    $("#task").focus();
});