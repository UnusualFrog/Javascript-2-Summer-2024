// Steps 1,2 & 3 Create and add label
const generateTable = () => {
    if ($("h3").length == 0){
        let headerLbl = "<h3>Cargo Box Car Manifest for Box Car XXXXX</h3>";
        headerLbl = headerLbl.substring(0,headerLbl.indexOf("XXXXX"));
        headerLbl += $("#BoxCarID").val();
        $("body").append(headerLbl);

        let table = "<table id=\"BoxCarTable\">";
        table += "<tr><th>Transport ID</th><th>Description</th><th>Weight</th></tr>";
        table += "<tr id=\"0\"><td class=\"transportID\">XXXXX</td><td class=\"description\">XXXXX</td><td class=\"weight\">XXXXX</td></tr>";
        table += "<tr id=\"1\"><td class=\"transportID\">XXXXX</td><td class=\"description\">XXXXX</td><td class=\"weight\">XXXXX</td></tr>";
        table += "<tr id=\"2\"><td class=\"transportID\">XXXXX</td><td class=\"description\">XXXXX</td><td class=\"weight\">XXXXX</td></tr>";
        table += "<tr id=\"3\"><td class=\"transportID\">XXXXX</td><td class=\"description\">XXXXX</td><td class=\"weight\">XXXXX</td></tr>";
        table += "<tr id=\"4\"><td class=\"transportID\">XXXXX</td><td class=\"description\">XXXXX</td><td class=\"weight\">XXXXX</td></tr>";
        table += "<tr><td>Total Cargo Weight:</td><td id=\"totalCargoWeight\">XXXXX</td></tr>";
        table += "</table>";
        $("body").append(table);
    }
}

// Global variable used to track current table row index
var tableRowIndex = 0;

// Add data to table and update weight values
const processCargo = () => {
    const transportID = $("#TransportID").val();
    const description = $("#Description").val();
    const cargoWeight = $("#CargoWeight").val();

    const currentTransportID = $("tr#" + tableRowIndex + " > td.transportID");
    currentTransportID.text(transportID);

    const currentDescription = $("tr#" + tableRowIndex + " > td.description");
    currentDescription.text(description);

    const currentCargoWeight = $("tr#" + tableRowIndex + " > td.weight");
    currentCargoWeight.text(cargoWeight);

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

    tableRowIndex++;
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

    $("#processCargoBtn").click(generateTable);
    $("#processCargoBtn").click(processCargo);
    $("#resetFormBtn").click(resetForm);
});