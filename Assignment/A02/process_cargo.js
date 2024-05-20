// Steps 1,2 & 3 Create and add label and table
const generateTables = () => {
    if ($("#output").length == 0){
        $("body").append("<div id=\"output\"></div>");

        // Status Header Label creation
        let statusLbl = "<h3>Cargo Status</h3>";
        $("#output").append(statusLbl);

        // Status Table row headers and summary row created
        let statusTable = "<table id=\"StatusTable\">";
        statusTable += "<tr id=\"HeaderRow\"><th>Transport ID</th><th>Description</th><th>Weight</th><th>Status</th></tr>";
        statusTable += "</table>";
        $("#output").append(statusTable);

        // Manifest Header Label creation
        let manifestLbl = "<h3>Manifest: XXXXX</h3>";
        manifestLbl = manifestLbl.substring(0,manifestLbl.indexOf("XXXXX"));
        manifestLbl += $("#BoxCarID").val();
        $("#output").append(manifestLbl);

        // Manifest Table row headers and summary row created
        let manifestTable = "<table id=\"ManifestTable\">";
        manifestTable += "<tr id=\"HeaderRow\"><th>Transport ID</th><th>Description</th><th>Weight</th></tr>";
        manifestTable += "<tr id=\"SummaryRow\"><td>Total Cargo Weight:</td><td id=\"totalCargoWeight\">XXXXX</td></tr>";
        manifestTable += "</table>";
        $("#output").append(manifestTable);
    }
}

// Adds cargo data to tables and updates weight values
const processCargo = () => {
    // Retrieve cargo input data
    const transportID = $("#TransportID").val();
    const description = $("#Description").val();
    const cargoWeight = $("#CargoWeight").val();
    let cargoStatus =  $("#TransportID").val();

    // Check for invalid input
    if (transportID == ""){
        alert("Transport ID must not be blank");
    }
    else if (description == ""){
        alert("Description must not be blank");
    }
    else if (cargoWeight == ""){
        alert("Cargo weight must not be blank");
    }
    else if (isNaN(cargoWeight)){
        alert("Cargo weight must be numeric");
    }
    else if (1 > cargoWeight){
        alert("Cargo weight must be at least 1");
    }
    else if (cargoWeight > (parseFloat($("#MaxWeight").val()) - parseFloat($("#EmptyWeight").val()))) {
        alert("Cargo must not exceed max weight");
    }
    else {
        generateTables();

        // Update total weight and cargo weight values
        let totalCargoWeight = 0;
        if ($("#totalCargoWeight").text() == "XXXXX"){
            totalCargoWeight = parseFloat(cargoWeight);
        }
        else {
           totalCargoWeight = parseFloat($("#totalCargoWeight").text()) + parseFloat(cargoWeight);
        }
        
        let totalCurrentWeight = parseFloat($("#EmptyWeight").val()) + totalCargoWeight
        $("#CurrentWeight").val(totalCurrentWeight);

        // Set cargo status based on max weight
        if (totalCurrentWeight > $("#MaxWeight").val()) {
            cargoStatus = "Warehouse";
        }
        else {
            let manifestRow = `<tr><td class=\"transportID\">${transportID}</td><td class=\"description\">${description}</td><td class=\"weight\">${cargoWeight}</td></tr>`;
            $(manifestRow).insertBefore($("#SummaryRow"));
            $("#totalCargoWeight").text(totalCargoWeight);  
        }   

        // Add rows to table with cargo data
        let statusRow = `<tr><td class=\"transportID\">${transportID}</td><td class=\"description\">${description}</td><td class=\"weight\">${cargoWeight}</td><td class=\"status\">${cargoStatus}</td></tr>`;
        $("#StatusTable").append(statusRow);

        
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

    $("#processCargoBtn").click(processCargo);
    $("#resetFormBtn").click(resetForm);
});