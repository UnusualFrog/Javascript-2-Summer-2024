$(document).ready(() => {
    console.log("Ready!");

    $("button").click(() => {
        let text = $("#inventory").val();
        let split_text = text.split("\n");
        let inventory_total = 0;

        for (let line of split_text) {
            let split_line = line.trim();
            let items = split_line.split(" ");
            
            if (items.length == 2) {
                console.log(items);
                inventory_total += parseFloat(items[1]);
            }
        }

        $("#total").val(inventory_total.toFixed(2));
    });

});