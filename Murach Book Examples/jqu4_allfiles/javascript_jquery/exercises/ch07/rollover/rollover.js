"use strict";

const $ = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    var image1 = $("#image1");
    var image2 = $("#image2");

    // preload images
    var links = $("#image_list").querySelectorAll("a");

    // attach mouseover and mouseout events for each image
    for ( let link of links) {
        image1.addEventListener("mouseover", () => {

        });
        image1.addEventListener("mouseout", () => {

        });
        image2.addEventListener("mouseover", () => {

        });
        image2.addEventListener("mouseout", () => {

        });           
    }

});
