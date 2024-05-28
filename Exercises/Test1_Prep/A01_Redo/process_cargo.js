const $ = (selector) => document.querySelector(selector);

const resetForm = () => {
    $("#TransportID").value = "";
    $("#Description").value = "";
    $("#CargoWeight").value = "";
}

const processCargo = () => {
    if ($("#tableArea") == null) {
        buildTable();
        $("#TotalWeight").value = parseFloat($("#EmptyWeight").value);
    }

    let transportID = $("#TransportID").value;
    let description = $("#Description").value;
    let cargoWeight = $("#CargoWeight").value;

    let currentRow = document.createElement("tr");
    let idCol = document.createElement("th");
    idCol.textContent = `${transportID}`;
    let descCol = document.createElement("th");
    descCol.textContent = `${description}`;
    let weightCol = document.createElement("th");
    weightCol.textContent = `${cargoWeight}`;

    currentRow.appendChild(idCol);
    currentRow.appendChild(descCol);
    currentRow.appendChild(weightCol);
    $("table").insertBefore(currentRow, $("#footerRow"));

    cargoWeight = cargoWeight == "" ? "0" : cargoWeight;
    $("#totalWeightCol").textContent = parseFloat($("#totalWeightCol").textContent) + parseFloat(cargoWeight);
    $("#TotalWeight").value = parseFloat($("#TotalWeight").value) + parseFloat(cargoWeight);

}

const buildTable = () => {
    let tableArea = document.createElement("div");
    tableArea.id = "tableArea";
    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    
    let idCol = document.createElement("th");
    idCol.textContent = "Transport ID";
    let descCol = document.createElement("th");
    descCol.textContent = "Description";
    let weightCol = document.createElement("th");
    weightCol.textContent = "Cargo Weight";

    let footerRow = document.createElement("tr");
    footerRow.id= "footerRow";
    let totalLblCol = document.createElement("td");
    totalLblCol.textContent = "Total Cargo Weight";
    let totalWeightCol = document.createElement("td");
    totalWeightCol.id = "totalWeightCol";
    totalWeightCol.textContent = "0";

    headerRow.appendChild(idCol);
    headerRow.appendChild(descCol);
    headerRow.appendChild(weightCol);
    footerRow.appendChild(totalLblCol);
    footerRow.appendChild(totalWeightCol);
    table.appendChild(headerRow);
    table.appendChild(footerRow);
    tableArea.appendChild(table);

    $("body").append(tableArea);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded!");

    $("#processCargoBtn").addEventListener("click", processCargo);
    $("#resetFormBtn").addEventListener("click", resetForm);
});