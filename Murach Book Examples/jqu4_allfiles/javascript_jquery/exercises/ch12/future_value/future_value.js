"use strict";

const getRandomNumber = max => {
    let rand = null;
    if (!isNaN(max)) {
        rand = Math.random();
        rand = Math.floor(rand * max);
        rand = rand + 1;
    }
    return rand;
};

const calculateFutureValue = (investment, rate, years) => {
    let futureValue = investment;
    for (let i = 1; i <= years; i++ ) {
        futureValue += futureValue * rate / 100;
    }
    return futureValue.toFixed(2);
};

$(document).ready( () => {
    $("#calculate").click( () => {
        const investment = parseFloat($("#investment").val());
        const rate = parseFloat($("#rate").val());
        const years = parseFloat($("#years").val());

        let isValid = true;
        if (isNaN(investment) || investment <= 0) {
            $("#investment").next().text("Must be a valid number greater than 0.");
            isValid = false;
        } else {
            $("#investment").next().text("");
        }

        if (isNaN(rate) || rate <= 0) {
            $("#rate").next().text("Must be a valid number greater than 0.");
            isValid = false;
        } else {
            $("#rate").next().text("");
        }

        if (isNaN(years) || years <= 0) {
            $("#years").next().text("Must be a valid number greater than 0.");
            isValid = false;
        } else {
            $("#years").next().text("");
        }

        if (isValid) {
            $("#future_value").val(calculateFutureValue(investment, rate, years));
        }
    });
    $("#investment").focus();
});