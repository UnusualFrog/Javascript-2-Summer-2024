class Railsystem {
    constructor() {
        this.boxcar_list = [];
        this.data = "data";
    }

    add_boxcar(new_item) {
        this.boxcar_list.push(new_item)
    }
}

class Boxcar {
    constructor(id, tare, max_gross, cargo, gross) {
        this.id = id;
        this.tare = tare;
        this.max_gross = max_gross;
        this.cargo = cargo;
        this.gross = gross;
        this.cargo_manifest = [];
    }

    add_freight(new_item) {
        this.cargo_manifest.push(new_item);
    }   
}

class Freight_Item {
    constructor(transport_id, description, cargo_weight) {
        this.transport_id = transport_id;
        this.description = description;
        this.cargo_weight = cargo_weight;
    }
}

const generate_menu_option = (id, text) => {
    let menu_option_row = document.createElement("tr");
    let menu_option_data = document.createElement("td")
    let menu_option_button = document.createElement("input")
    let menu_option_label = document.createElement("label")

    menu_option_button.setAttribute("id", id)
    menu_option_button.setAttribute("type", "radio")
    menu_option_button.setAttribute("name", "menu_option")
    menu_option_label.textContent = text;
    menu_option_label.setAttribute("for", id);

    menu_option_data.append(menu_option_button);
    menu_option_data.append(menu_option_label);
    menu_option_row.append(menu_option_data);
    return menu_option_row;
}

const generate_main_menu = () => {
    let create_boxcar_row = generate_menu_option("create_boxcar", "Create Boxcar");
    let add_freight_row = generate_menu_option("add_freight", "Add Freight");
    let boxcar_data_row = generate_menu_option("boxcar_data", "Boxcar Data");
    let warehouse_data_row = generate_menu_option("warehouse_data", "Warehouse Data");
    let all_freight_status_row = generate_menu_option("all_freight_status", "All Freight Status");

    create_boxcar_row.addEventListener("change", toggle_create_boxcar_menu);

    $("#divA tbody").append(create_boxcar_row);
    $("#divA tbody").append(add_freight_row);
    $("#divA tbody").append(boxcar_data_row);
    $("#divA tbody").append(warehouse_data_row);
    $("#divA tbody").append(all_freight_status_row);
}

const generate_create_boxcar_menu = () => {
    // Generate Text Input
    // Boxcar ID
    let boxcar_id_row = document.createElement("tr");
    let boxcar_id_data = document.createElement("td");
    let boxcar_id_label = document.createElement("label");
    let boxcar_id_input = document.createElement("input");
    let boxcar_id_span = document.createElement("span");

    boxcar_id_label.textContent = "Boxcar ID: ";
    boxcar_id_label.setAttribute("for", "boxcar_id");
    boxcar_id_input.setAttribute("id", "boxcar_id");
    boxcar_id_input.setAttribute("type", "text");
    boxcar_id_span.setAttribute("id","boxcar_id_span");
    boxcar_id_span.textContent = "Must start with BX followed by 3 digits";
    boxcar_id_span.setAttribute("class", "hidden");

    boxcar_id_data.append(boxcar_id_label);
    boxcar_id_data.append(boxcar_id_input);
    boxcar_id_data.append(boxcar_id_span);
    boxcar_id_row.append(boxcar_id_data);

    $("#divB tbody").append(boxcar_id_row);

    // TARE Weight
    let tare_weight_row = document.createElement("tr");
    let tare_weight_data = document.createElement("td");
    let tare_weight_label = document.createElement("label");
    let tare_weight_input = document.createElement("input");
    let tare_weight_span = document.createElement("span");

    tare_weight_label.textContent = "TARE Weight: ";
    tare_weight_label.setAttribute("for", "tare_weight_id");
    tare_weight_input.setAttribute("id", "tare_weight_id");
    tare_weight_input.setAttribute("type", "text");
    tare_weight_input.addEventListener("change", validate_create_boxcar);
    tare_weight_span.setAttribute("id","tare_weight_span");
    tare_weight_span.textContent = "Must be number in range 0 to 20,000";
    tare_weight_span.setAttribute("class", "hidden");

    tare_weight_data.append(tare_weight_label);
    tare_weight_data.append(tare_weight_input);
    tare_weight_data.append(tare_weight_span);
    tare_weight_row.append(tare_weight_data);

    $("#divB tbody").append(tare_weight_row);

    // Max Gross Weight
    let max_gross_weight_row = document.createElement("tr");
    let max_gross_weight_data = document.createElement("td");
    let max_gross_weight_label = document.createElement("label");
    let max_gross_weight_input = document.createElement("input");
    let max_gross_weight_span = document.createElement("span");

    max_gross_weight_label.textContent = "Max Gross Weight: ";
    max_gross_weight_label.setAttribute("for", "max_gross_weight_id");
    max_gross_weight_input.setAttribute("id", "max_gross_weight_id");
    max_gross_weight_input.setAttribute("type", "text");
    max_gross_weight_input.addEventListener("change", validate_create_boxcar);
    max_gross_weight_span.setAttribute("id","max_gross_weight_span");
    max_gross_weight_span.textContent = "Must be greater than TARE weight and in range 0 to 20,000";
    max_gross_weight_span.setAttribute("class", "hidden");

    max_gross_weight_data.append(max_gross_weight_label);
    max_gross_weight_data.append(max_gross_weight_input);
    max_gross_weight_data.append(max_gross_weight_span);
    max_gross_weight_row.append(max_gross_weight_data);

    $("#divB tbody").append(max_gross_weight_row);

    // Cargo Weight
    let cargo_weight_row = document.createElement("tr");
    let cargo_weight_data = document.createElement("td");
    let cargo_weight_label = document.createElement("label");
    let cargo_weight_input = document.createElement("input");
    let cargo_weight_span = document.createElement("span");

    cargo_weight_label.textContent = "Cargo Weight: ";
    cargo_weight_label.setAttribute("for", "cargo_weight_id");
    cargo_weight_input.setAttribute("id", "cargo_weight_id");
    cargo_weight_input.setAttribute("type", "text");
    cargo_weight_input.setAttribute("value", "0");
    cargo_weight_input.setAttribute("disabled", "true");
    cargo_weight_span.setAttribute("id","cargo_weight_span");
    cargo_weight_span.textContent = "???";
    cargo_weight_span.setAttribute("class", "hidden");

    cargo_weight_data.append(cargo_weight_label);
    cargo_weight_data.append(cargo_weight_input);
    cargo_weight_data.append(cargo_weight_span);
    cargo_weight_row.append(cargo_weight_data);

    $("#divB tbody").append(cargo_weight_row);

    // Gross Weight
    let gross_weight_row = document.createElement("tr");
    let gross_weight_data = document.createElement("td");
    let gross_weight_label = document.createElement("label");
    let gross_weight_input = document.createElement("input");
    let gross_weight_span = document.createElement("span");

    gross_weight_label.textContent = "Gross Weight: ";
    gross_weight_label.setAttribute("for", "gross_weight_id");
    gross_weight_input.setAttribute("id", "gross_weight_id");
    gross_weight_input.setAttribute("type", "text");
    gross_weight_input.setAttribute("value", tare_weight_input.value + cargo_weight_input.value);
    gross_weight_input.setAttribute("disabled", "true");
    gross_weight_span.setAttribute("id","gross_weight_span");
    gross_weight_span.textContent = "???";
    gross_weight_span.setAttribute("class", "hidden");

    gross_weight_data.append(gross_weight_label);
    gross_weight_data.append(gross_weight_input);
    gross_weight_data.append(gross_weight_span);
    gross_weight_row.append(gross_weight_data);

    $("#divB tbody").append(gross_weight_row);

    // Generate Buttons
    button_row = document.createElement("tr");
    button_data = document.createElement("td");

    process_boxcar_button = document.createElement("input");
    process_boxcar_button.setAttribute("type","button");
    process_boxcar_button.setAttribute("value","Process Boxcar");
    process_boxcar_button.addEventListener("click", validate_create_boxcar);
    process_boxcar_button.addEventListener("click", process_new_boxcar);

    reset_form_button = document.createElement("input");
    reset_form_button.setAttribute("type","button");
    reset_form_button.setAttribute("value","Reset Form");
    reset_form_button.addEventListener("click", reset_new_boxcar_form);

    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type","button");
    main_menu_button.setAttribute("value","Return to Main Page");
    main_menu_button.addEventListener("click", toggle_create_boxcar_menu);
    main_menu_button.addEventListener("click", reset_new_boxcar_form);

    button_data.append(process_boxcar_button);
    button_data.append(reset_form_button);
    button_data.append(main_menu_button);
    button_row.append(button_data);
    $("#divC tbody").append(button_row);
}

// Validate input fields for creating a new box car
const validate_create_boxcar = () => {
    // Boxcar ID
    if ($("#boxcar_id").val().substring(0,2) == "BX" && !isNaN($("#boxcar_id").val().substring(2,))){
        $("#boxcar_id_span").addClass("hidden");
    } else {
        $("#boxcar_id_span").removeClass("hidden");
    }

    // TARE Weight
    if (!isNaN($("#tare_weight_id").val()) && parseFloat($("#tare_weight_id").val()) > 0 && parseFloat($("#tare_weight_id").val()) <= 20000){
        $("#gross_weight_id").val(parseFloat($("#cargo_weight_id").val()) + parseFloat($("#tare_weight_id").val()));
        $("#tare_weight_span").addClass("hidden");

    } else {
        $("#tare_weight_span").removeClass("hidden");
    }

    // Max Gross Weight
    if (!isNaN($("#max_gross_weight_id").val()) && (parseFloat($("#max_gross_weight_id").val()) > parseFloat($("#tare_weight_id").val())) && parseFloat($("#max_gross_weight_id").val()) > 0 && parseFloat($("#max_gross_weight_id").val()) <= 20000){
        $("#max_gross_weight_span").addClass("hidden");

    } else {
        $("#max_gross_weight_span").removeClass("hidden");
    }
}

// Create new boxcar if valid input
const process_new_boxcar = () => {
    if ($("#boxcar_id_span").attr("class") == "hidden" && $("#tare_weight_span").attr("class") == "hidden" && $("#max_gross_weight_span").attr("class") == "hidden") {
        $("#divC").removeClass("hidden");

        let new_boxcar = new Boxcar($("#boxcar_id").val(), $("#tare_weight_id").val(), $("#max_gross_weight_id").val(), $("#cargo_weight_id").val(), $("#gross_weight_id").val());
        CNA_Railsystem.add_boxcar(new_boxcar);

        let new_boxcar_row = document.createElement("tr");
        let new_boxcar_id_data = document.createElement("td");
        new_boxcar_id_data.textContent = $("#boxcar_id").val();

        let new_boxcar_tare_data = document.createElement("td");
        new_boxcar_tare_data.textContent = $("#tare_weight_id").val();

        let new_boxcar_max_gross_data = document.createElement("td");
        new_boxcar_max_gross_data.textContent = $("#max_gross_weight_id").val();

        let new_boxcar_cargo_weight_data = document.createElement("td");
        new_boxcar_cargo_weight_data.textContent = $("#cargo_weight_id").val();

        let new_boxcar_gross_data = document.createElement("td");
        new_boxcar_gross_data.textContent = $("#gross_weight_id").val();

        new_boxcar_row.append(new_boxcar_id_data);
        new_boxcar_row.append(new_boxcar_tare_data);
        new_boxcar_row.append(new_boxcar_max_gross_data);
        new_boxcar_row.append(new_boxcar_cargo_weight_data);
        new_boxcar_row.append(new_boxcar_gross_data);
    }
}

// Reset the new boxcar form fields
const reset_new_boxcar_form = () => {
    $("#boxcar_id").val("");
    $("#tare_weight_id").val("");
    $("#max_gross_weight_id").val("");
    $("#gross_weight_id").val("0");
    $("#boxcar_id_span").addClass("hidden")
    $("#tare_weight_span").addClass("hidden");
    $("#max_gross_weight_span").addClass("hidden");
}

const generate_rolling_stock_report_menu = () => {
    let button_row = document.createElement("tr");

    let return_to_create_data = document.createElement("td");
    let return_to_create_button = document.createElement("input");
    return_to_create_button.setAttribute("type","button");
    return_to_create_button.setAttribute("value","Return to Create Boxcar");
    return_to_create_button.addEventListener("click", () => {
        $("#divC").addClass("hidden");
    });
    return_to_create_button.addEventListener("click", reset_new_boxcar_form);

    let main_menu_data = document.createElement("td");
    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type","button");
    main_menu_button.setAttribute("value","Return to Main Page");
    main_menu_button.addEventListener("click", toggle_create_boxcar_menu);
    main_menu_button.addEventListener("click", reset_new_boxcar_form);


    return_to_create_data.append(return_to_create_button);
    main_menu_data.append(main_menu_button);
    button_row.append(return_to_create_data);
    button_row.append(main_menu_data);
    $("#divC tfoot").append(button_row);
}

// Toggle pages when moving between div a and div b
const toggle_create_boxcar_menu = (e) => {
    e.target.checked = !e.target.checked;
    $("#divA").toggle();
    $("#divB").toggle();
    if ($("#divC").attr("class") == "") {
        $("#divC").addClass("hidden")
    }
}

// Global Railsystem variable
var CNA_Railsystem = new Railsystem();
$(document).ready( () => { 
    generate_main_menu();
    generate_create_boxcar_menu();
    generate_rolling_stock_report_menu();
});