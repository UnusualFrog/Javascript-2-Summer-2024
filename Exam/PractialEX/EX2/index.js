$(document).ready(() => {
    console.log("Ready!");

    $("button").click((evt) => {
        window.location.href = "result.html";

        let location_value = $("#location :checked").val();
        let speed_value = $("#speed :checked").val();

        setCookie("location", location_value);
        setCookie("speed", speed_value);

        evt.preventDefault();
    });

    displayCookies();
});

const setCookie = (cookie_name, cookie_value, days=0) => {
    let new_cookie = cookie_name + "=" + encodeURIComponent(cookie_value);

    if (days > 0) {
        new_cookie += "; max_age=" + days * 24 * 60 * 60;
    }
    new_cookie += "; path=/";
    document.cookie = new_cookie
}

const getCookieByName = (cookie_name) => {
    const cookies = document.cookie;

    let start = cookies.indexOf(cookie_name + "=");

    if (start != -1) {
        start = start + cookie_name.length + 1;
    }

    let end = cookies.indexOf(";", start);
    if (end == -1) {
        end = cookies.length;
    }

    const cookie_value = cookies.substring(start, end);
    return decodeURIComponent(cookie_value);
}

const displayCookies = () => {
    $("#train-location").val(getCookieByName("location"));
    $("#train-speed").val(getCookieByName("speed"));
}