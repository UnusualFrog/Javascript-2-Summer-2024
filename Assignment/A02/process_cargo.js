// Create and add label and table
const generateTable = () => {
    if ($("h3").length == 0){
        // Header Label creation
        let headerLbl = "<h3>Cargo Box Car Manifest for Box Car XXXXX</h3>";
        headerLbl = headerLbl.substring(0,headerLbl.indexOf("XXXXX"));
        headerLbl += $("#BoxCarID").val();
        $("body").append(headerLbl);

        // Table row headers and summary row created
        let table = "<table id=\"BoxCarTable\">";
        table += "<tr id=\"HeaderRow\"><th>Transport ID</th><th>Description</th><th>Weight</th></tr>";
        table += "<tr id=\"SummaryRow\"><td>Total Cargo Weight:</td><td id=\"totalCargoWeight\">XXXXX</td></tr>";
        table += "</table>";
        $("body").append(table);
    }
}

// Adds data to table and updates weight values
const processCargo = () => {
    // Retrieve cargo data
    const transportID = $("#TransportID").val();
    const description = $("#Description").val();
    const cargoWeight = $("#CargoWeight").val();

    // Check for blank values
    if (transportID == ""){
        alert("Transport ID must not be blank");
    }
    else if (description == ""){
        alert("Description must not be blank");
    }
    else if (cargoWeight == ""){
        alert("Cargo Weight must not be blank");
    }
    else if (typeof cargoWeight === "number"){
        alert("Cargo Weight must be a numeric value");
    }
    else {
        generateTable();

        // Add row to table with cargo data
        let row = `<tr id=\"0\"><td class=\"transportID\">${transportID}</td><td class=\"description\">${description}</td><td class=\"weight\">${cargoWeight}</td></tr>`;
        $(row).insertBefore($("#SummaryRow"));

        // Update weight values
        let totalCargoWeight = 0;
        if ($("#totalCargoWeight").text() == "XXXXX"){
            totalCargoWeight = parseFloat(cargoWeight);
        }
        else {
            totalCargoWeight = parseFloat($("#totalCargoWeight").text()) + parseFloat(cargoWeight);
        }
        $("#totalCargoWeight").text(totalCargoWeight);
        $("#TotalWeight").val( parseFloat($("#EmptyWeight").val()) + totalCargoWeight);
    }


    
};

// Clear data
const resetForm = () => {
    $("#TransportID").val("");
    $("#Description").val("");
    $("#CargoWeight").val("");
};

// Attach event listeners to process and reset buttons on page load
$("document").ready( () => {
    console.log("Ready!");

    //$("#processCargoBtn").click(generateTable);
    $("#processCargoBtn").click(processCargo);
    $("#resetFormBtn").click(resetForm);
});