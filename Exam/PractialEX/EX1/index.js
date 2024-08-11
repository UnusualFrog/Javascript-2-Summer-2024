$(document).ready(() => {
    console.log("Ready!");




    $("button").on("click", (evt) => {
        try {
            const pattern = /^[A-Z]{4}-[\d]{4}$/;
            let user_input = $("#access-code-1").val();

            if (pattern.test(user_input)) {
                $("#access-code-1-span").text("");
            } else {
                throw new Error("Must be in format ABCD-1234");
            }
            
        } catch (Error) {
            console.log(Error);
            $("#access-code-1-span").text(Error);
        }

        try {
            let user_input = parseFloat($("#key-1").val());

            if (user_input > 0 && user_input % 1 == 0) {
                $("#key-1-span").text("");
            } else {
                throw new Error("Must be positive integer");
            }
        } catch (Error) {
            console.log(Error);
            $("#key-1-span").text(Error);
        }

        try {
            let user_input = parseFloat($("#key-2").val());
            
            if (user_input < 0 && user_input % 1 != 0) {
                $("#key-2-span").text("");
            } else {
                throw new Error("Must be negative float");
            }
            
        } catch (Error) {
            console.log(Error);
            $("#key-2-span").text(Error);
        }

        if ($("#access-code-1-span").text() == "" && $("#key-1-span").text() == "" && $("#key-2-span").text() == "") {
            $("button").text("ACCESS GRANTED");
            $("#access-code-1").attr("disabled", true);
            $("#key-1").attr("disabled", true);
            $("#key-2").attr("disabled", true);
        }

        evt.preventDefault();
    })
});