$(document).ready(() => {
    console.log("Ready!!!");

    let secretAnswer = generateGuessAnswer();

    $("button").click(() => {
        let user_input = $("#guess").val();
        console.log(user_input);

        if (user_input == secretAnswer.getAnswer()) {
            $("#result").text("Success!");
            $("#result").css("color", "green");
        } else {
            $("#result").text("Failure!");
            $("#result").css("color", "red");
        }
    });


});

const generateGuessAnswer = () => {
    let answer = Math.floor(Math.random() * 101);
    console.log(answer);

    const getAnswer = () => {
        return answer;
    }

    const setAnswer = (new_answer) => {
        answer = new_answer;
    }

    return {getAnswer, setAnswer};
}