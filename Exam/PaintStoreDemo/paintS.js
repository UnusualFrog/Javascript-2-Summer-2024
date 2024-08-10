"use strict";
// Goal
// Object Literal Version No Library
// #1 create an Object to support PaintTin
const paintTin = new PaintTin();

$(document).ready(() => {
    // $("#item_code_id").focus();
    $("#purchase_id").click(event => {
        try {
            var paintCode = $("#paint_code_id");
            paintCode = validatePaintCode(paintCode);
            var selectedColour = readRadioButton();
            processPurchase(paintCode, selectedColour);
            $("#paint_code_id").next().text("");
        }
        catch (error) {
            $("#paint_code_id").next().text(error.message);
            $("#message_id").text("Purchase Cancelled !!! Try Again!!!");
        }
    });
});

