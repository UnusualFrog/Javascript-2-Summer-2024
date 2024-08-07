// Railsystem which contains and manages all exisiting boxcars and the warehouse
class Railsystem {
    // Boxcars are stored as a map with the ID of the boxcar as the key
    // The warehouse is represented as a boxcar with 0 tare weight and an effectivley unlimited gross weight maximum 
    constructor() {
        this.boxcar_list = new Map;
        this.warehouse_manifest = new Boxcar("WH000", 0, Number.MAX_VALUE, 0, 0);
    }

    // Adds a new boxcar to the system
    add_boxcar(new_item) {
        this.boxcar_list.set(new_item.id, new_item);
    }

    // Calculate the total cargo weight of all boxcars
    get_total_cargo_weight() {
        let total_cargo_weight = 0;
        for (let current_boxcar of this.boxcar_list) {
            let boxcar_data = current_boxcar[1];
            total_cargo_weight += boxcar_data.cargo;
        }
        return total_cargo_weight;
    }
}

// Boxcar which holds a list of cargo items
class Boxcar {
    constructor(id, tare, max_gross, cargo, gross) {
        this.id = id;
        this.tare = tare;
        this.max_gross = max_gross;
        this.cargo = cargo;
        this.gross = gross;
        this.cargo_manifest = [];
    }

    // Adds a cargo item to the boxcar and sorts the cargo items alphabetically based on the item's transport id
    add_freight(new_item) {
        this.cargo_manifest.push(new_item);
        this.cargo_manifest.sort((a, b) => {
            if (a.transport_id < b.transport_id) {
                return -1;
            }
            if (a.transport_id > b.transport_id) {
                return 1;
            }
            return 0;
        });
    }

    // Calculates the total cargo weight of all cargo items in the boxcar
    get_total_cargo_weight() {
        let total_cargo_weight = 0;
        for (let cargo of this.cargo_manifest) {
            total_cargo_weight += cargo.cargo_weight;
        }
        return total_cargo_weight;
    }
}

// Cargo item
class Freight_Item {
    constructor(transport_id, description, cargo_weight) {
        this.transport_id = transport_id;
        this.description = description;
        this.cargo_weight = cargo_weight;
    }
}

// ------------ Main Menu Logic ------------ 
// Generates radio buttons for main menu navigtion
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

// Generate main menu elements, add page navigation listeners, and append to the main menu div
const generate_main_menu = () => {
    let create_boxcar_row = generate_menu_option("create_boxcar", "Create Boxcar");
    let add_freight_row = generate_menu_option("add_freight", "Add Freight");
    let boxcar_data_row = generate_menu_option("boxcar_data", "Boxcar Data");
    let warehouse_data_row = generate_menu_option("warehouse_data", "Warehouse Data");
    let all_freight_status_row = generate_menu_option("all_freight_status", "All Freight Status");

    create_boxcar_row.addEventListener("change", show_create_boxcar_menu);
    boxcar_data_row.addEventListener("change", show_only_rolling_stock_report);
    add_freight_row.addEventListener("change", show_add_freight_menu);
    warehouse_data_row.addEventListener("change", show_warehouse_manifest);
    all_freight_status_row.addEventListener("change", show_all_freight_status_manifest);

    create_boxcar_row.addEventListener("change", turn_off_radio_button);
    boxcar_data_row.addEventListener("change", turn_off_radio_button);
    add_freight_row.addEventListener("change", turn_off_radio_button);
    warehouse_data_row.addEventListener("change", turn_off_radio_button);
    all_freight_status_row.addEventListener("change", turn_off_radio_button);

    $("#divA tbody").append(create_boxcar_row);
    $("#divA tbody").append(add_freight_row);
    $("#divA tbody").append(boxcar_data_row);
    $("#divA tbody").append(warehouse_data_row);
    $("#divA tbody").append(all_freight_status_row);
}

// Uncheck radio button after selection
const turn_off_radio_button = (e) => {
    e.target.checked = !e.target.checked;
}


// ------------ Create Boxcar Menu Logic ------------ 
// Generates elements for the "create boxcar" menu
const generate_create_boxcar_menu = () => {
    // Generate "set of 3" (label, input, span) rows for each field
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
    boxcar_id_input.addEventListener("change", validate_new_boxcar_id);
    boxcar_id_span.setAttribute("id", "boxcar_id_span");
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
    tare_weight_input.addEventListener("change", validate_new_boxcar_tare_weight);
    tare_weight_input.addEventListener("change", validate_new_boxcar_max_gross_weight);
    tare_weight_span.setAttribute("id", "tare_weight_span");
    tare_weight_span.textContent = "Must be number in range 0 to 200,000";
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
    max_gross_weight_input.addEventListener("change", validate_new_boxcar_max_gross_weight);
    max_gross_weight_span.setAttribute("id", "max_gross_weight_span");
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
    cargo_weight_span.setAttribute("id", "cargo_weight_span");
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
    gross_weight_span.setAttribute("id", "gross_weight_span");
    gross_weight_span.textContent = "???";
    gross_weight_span.setAttribute("class", "hidden");

    gross_weight_data.append(gross_weight_label);
    gross_weight_data.append(gross_weight_input);
    gross_weight_data.append(gross_weight_span);
    gross_weight_row.append(gross_weight_data);

    $("#divB tbody").append(gross_weight_row);

    // Generate Row of Buttons
    button_row = document.createElement("tr");
    button_data = document.createElement("td");

    // Validate and process new boxcar data
    process_boxcar_button = document.createElement("input");
    process_boxcar_button.setAttribute("type", "button");
    process_boxcar_button.setAttribute("value", "Process Boxcar");
    process_boxcar_button.addEventListener("click", validate_new_boxcar_id);
    process_boxcar_button.addEventListener("click", validate_new_boxcar_tare_weight);
    process_boxcar_button.addEventListener("click", validate_new_boxcar_max_gross_weight);
    process_boxcar_button.addEventListener("click", process_new_boxcar);

    // Reset fields
    reset_form_button = document.createElement("input");
    reset_form_button.setAttribute("type", "button");
    reset_form_button.setAttribute("value", "Reset Form");
    reset_form_button.addEventListener("click", reset_new_boxcar_form);

    // Return to main menu
    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type", "button");
    main_menu_button.setAttribute("value", "Return to Main Page");
    main_menu_button.addEventListener("click", hide_create_boxcar_menu);
    main_menu_button.addEventListener("click", reset_new_boxcar_form);

    button_data.append(process_boxcar_button);
    button_data.append(reset_form_button);
    button_data.append(main_menu_button);
    button_row.append(button_data);
    $("#divB tbody").append(button_row);
}

// Validate that boxcar ID starts with "BX" and is followed by exactly 3 digits
const validate_new_boxcar_id = () => {
    if ($("#boxcar_id").val().match(/^BX\d\d\d$/)) {
        $("#boxcar_id_span").addClass("hidden");
    } else {
        $("#boxcar_id_span").removeClass("hidden");
    }
}

// Validate that tare weight is a numeric value between 0 and 20,000
const validate_new_boxcar_tare_weight = () => {
    if (!isNaN($("#tare_weight_id").val()) && parseFloat($("#tare_weight_id").val()) > 0 && parseFloat($("#tare_weight_id").val()) <= 200000) {
        $("#gross_weight_id").val(parseFloat($("#cargo_weight_id").val()) + parseFloat($("#tare_weight_id").val()));
        $("#tare_weight_span").addClass("hidden");
    } else {
        $("#tare_weight_span").removeClass("hidden");
    }
}

// Validate that max gross weight is a numeric value greater than the tare weight, and between 0 and 20,000
const validate_new_boxcar_max_gross_weight = () => {
    if (!isNaN($("#max_gross_weight_id").val()) && (parseFloat($("#max_gross_weight_id").val()) > parseFloat($("#tare_weight_id").val())) && parseFloat($("#max_gross_weight_id").val()) > 0 && parseFloat($("#max_gross_weight_id").val()) <= 200000) {
        $("#max_gross_weight_span").addClass("hidden");

    } else {
        $("#max_gross_weight_span").removeClass("hidden");
    }
}

// If boxcar fields passed validation, create new boxcar using input data and display the rolling stock report menu with the new boxcar added
const process_new_boxcar = () => {
    if ($("#boxcar_id_span").attr("class") == "hidden" && $("#tare_weight_span").attr("class") == "hidden" && $("#max_gross_weight_span").attr("class") == "hidden") {
        let new_boxcar = new Boxcar(
            $("#boxcar_id").val(),
            parseFloat($("#tare_weight_id").val()),
            parseFloat($("#max_gross_weight_id").val()),
            parseFloat($("#cargo_weight_id").val()),
            parseFloat($("#gross_weight_id").val())
        );

        CNA_Railsystem.add_boxcar(new_boxcar);
        fill_rolling_stock_report();
        $("#divC").removeClass("hidden");
    }
}

// Reset the new boxcar menu form fields to their inital values
const reset_new_boxcar_form = () => {
    $("#boxcar_id").val("");
    $("#tare_weight_id").val("");
    $("#max_gross_weight_id").val("");
    $("#gross_weight_id").val("0");
    $("#boxcar_id_span").addClass("hidden")
    $("#tare_weight_span").addClass("hidden");
    $("#max_gross_weight_span").addClass("hidden");
}

// Hide the main menu and show the "create boxcar" menu, update the "rolling stock report" menu and display the menu if there are existing boxcars
const show_create_boxcar_menu = () => {
    $("#divA").addClass("hidden");
    $("#divB").removeClass("hidden");
    if (CNA_Railsystem.boxcar_list.size == 0) {
        $("#divC").addClass("hidden");
    } else {
        $("#divC").removeClass("hidden");
        $("#return_to_create_boxcar").removeClass("hidden");
    }
    fill_rolling_stock_report();
}

// Hide the "create boxcar" and "rolling stock report" menus and show the main menu
const hide_create_boxcar_menu = () => {
    $("#divA").removeClass("hidden");
    $("#divB").addClass("hidden");
    $("#divC").addClass("hidden");
}

// ------------ Rolling Stock Report Menu Logic ------------ 
// Generate button elements for the "rolling stock report" menu
const generate_rolling_stock_report_menu = () => {
    let button_row = document.createElement("tr");

    // Return to "create boxcar" menu button
    let return_to_create_data = document.createElement("td");
    let return_to_create_button = document.createElement("input");
    return_to_create_button.setAttribute("type", "button");
    return_to_create_button.setAttribute("id", "return_to_create_boxcar");
    return_to_create_button.setAttribute("value", "Return to Create Boxcar");
    return_to_create_button.addEventListener("click", () => {
        $("#divC").addClass("hidden");
    });
    return_to_create_button.addEventListener("click", reset_new_boxcar_form);

    // Return to main menu button
    let main_menu_data = document.createElement("td");
    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type", "button");
    main_menu_button.setAttribute("value", "Return to Main Page");
    main_menu_button.addEventListener("click", hide_create_boxcar_menu);
    main_menu_button.addEventListener("click", reset_new_boxcar_form);

    // Append buttons to page
    return_to_create_data.append(return_to_create_button);
    main_menu_data.append(main_menu_button);
    button_row.append(return_to_create_data);
    button_row.append(main_menu_data);
    $("#divC tfoot").append(button_row);
}

// Generates and fills the "rolling stock report" table with a row for each existing boxcar in the Railsystem
const fill_rolling_stock_report = () => {
    $("#divC tbody").empty();
    for (let boxcar_data of CNA_Railsystem.boxcar_list) {
        let boxcar = boxcar_data[1];
        let new_boxcar_row = document.createElement("tr");

        let new_boxcar_id_data = document.createElement("td");
        new_boxcar_id_data.textContent = boxcar.id;

        let new_boxcar_tare_data = document.createElement("td");
        new_boxcar_tare_data.textContent = boxcar.tare;

        let new_boxcar_max_gross_data = document.createElement("td");
        new_boxcar_max_gross_data.textContent = boxcar.max_gross;

        let new_boxcar_cargo_weight_data = document.createElement("td");
        new_boxcar_cargo_weight_data.textContent = boxcar.cargo;

        let new_boxcar_gross_data = document.createElement("td");
        new_boxcar_gross_data.textContent = boxcar.gross;

        new_boxcar_row.append(new_boxcar_id_data);
        new_boxcar_row.append(new_boxcar_tare_data);
        new_boxcar_row.append(new_boxcar_max_gross_data);
        new_boxcar_row.append(new_boxcar_cargo_weight_data);
        new_boxcar_row.append(new_boxcar_gross_data);

        $("#divC tbody").append(new_boxcar_row);
    }
    // Update total cargo weight
    let total_cargo_weight = CNA_Railsystem.get_total_cargo_weight();
    $("#divC #total_cargo_footer").text(total_cargo_weight);
}

// Hides the main menu and shows the "rolling stock report" menu independent of the "create new boxcar" menu
// Updates the "rolling stock report" table
const show_only_rolling_stock_report = () => {
    $("#divA").addClass("hidden");
    $("#divC").removeClass("hidden");
    // "Return to create boxcar" button only visible when viewing from "create new boxcar" menu
    $("#return_to_create_boxcar").addClass("hidden");
    fill_rolling_stock_report();
}

// Hides the "rolling stock report" menu and shows the main menu
const hide_only_rolling_stock_report = () => {
    $("#divA").removeClass("hidden");
    $("#divC").addClass("hidden");
    $("#return_to_create_boxcar").removeClass("hidden");
}

// ------------ Rolling Add Freight Menu Logic ------------ 
// Generate elements for the "add freight" menu
const generate_add_freight_menu = () => {
    // Selected Boxcar
    let boxcar_selected_row = document.createElement("tr");
    let boxcar_selected_data = document.createElement("td");
    let boxcar_selected_label = document.createElement("label");
    let boxcar_selected_input = document.createElement("input");
    let boxcar_selected_span = document.createElement("span");

    boxcar_selected_label.textContent = "Boxcar ID: ";
    boxcar_selected_label.setAttribute("for", "boxcar_selected");
    boxcar_selected_input.setAttribute("id", "boxcar_selected");
    boxcar_selected_input.setAttribute("type", "text");
    boxcar_selected_input.setAttribute("disabled", true);
    boxcar_selected_span.setAttribute("id", "boxcar_selected_span");
    boxcar_selected_span.textContent = "";
    boxcar_selected_span.setAttribute("class", "hidden");

    boxcar_selected_data.append(boxcar_selected_label);
    boxcar_selected_data.append(boxcar_selected_input);
    boxcar_selected_data.append(boxcar_selected_span);
    boxcar_selected_row.append(boxcar_selected_data);

    $("#entry_section tbody").append(boxcar_selected_row);

    // Transport ID
    let transport_id_row = document.createElement("tr");
    let transport_id_data = document.createElement("td");
    let transport_id_label = document.createElement("label");
    let transport_id_input = document.createElement("input");
    let transport_id_span = document.createElement("span");
    let boxcar_or_warehouse_span = document.createElement("span");

    transport_id_label.textContent = "Transport ID: ";
    transport_id_label.setAttribute("for", "transport_id");
    transport_id_input.setAttribute("id", "transport_id");
    transport_id_input.setAttribute("type", "text");
    transport_id_span.setAttribute("id", "transport_id_span");
    transport_id_span.textContent = "Transport ID must not be blank";
    transport_id_span.setAttribute("class", "hidden");
    boxcar_or_warehouse_span.setAttribute("id", "boxcar_or_warehouse_span");
    boxcar_or_warehouse_span.textContent = "Cargo exceeded max-gross weight of boxcar, diverted to Warehouse";
    boxcar_or_warehouse_span.setAttribute("class", "hidden");

    transport_id_data.append(transport_id_label);
    transport_id_data.append(transport_id_input);
    transport_id_data.append(transport_id_span);
    transport_id_data.append(boxcar_or_warehouse_span);
    transport_id_row.append(transport_id_data);

    $("#entry_section tbody").append(transport_id_row);

    // Description
    let description_row = document.createElement("tr");
    let description_data = document.createElement("td");
    let description_label = document.createElement("label");
    let description_input = document.createElement("input");
    let description_span = document.createElement("span");

    description_label.textContent = "Description: ";
    description_label.setAttribute("for", "description");
    description_input.setAttribute("id", "description");
    description_input.setAttribute("type", "text");
    description_span.setAttribute("id", "description_span");
    description_span.textContent = "Description must not be blank";
    description_span.setAttribute("class", "hidden");

    description_data.append(description_label);
    description_data.append(description_input);
    description_data.append(description_span);
    description_row.append(description_data);

    $("#entry_section tbody").append(description_row);

    // Cargo Weight
    let total_cargo_weight_row = document.createElement("tr");
    let total_cargo_weight_data = document.createElement("td");
    let total_cargo_weight_label = document.createElement("label");
    let total_cargo_weight_input = document.createElement("input");
    let total_cargo_weight_span = document.createElement("span");

    total_cargo_weight_label.textContent = "Cargo Weight: ";
    total_cargo_weight_label.setAttribute("for", "total_cargo_weight");
    total_cargo_weight_input.setAttribute("id", "total_cargo_weight");
    total_cargo_weight_input.setAttribute("type", "text");
    total_cargo_weight_span.setAttribute("id", "total_cargo_weight_span");
    total_cargo_weight_span.textContent = "Cargo Weight must be a number greater than 0";
    total_cargo_weight_span.setAttribute("class", "hidden");

    total_cargo_weight_data.append(total_cargo_weight_label);
    total_cargo_weight_data.append(total_cargo_weight_input);
    total_cargo_weight_data.append(total_cargo_weight_span);
    total_cargo_weight_row.append(total_cargo_weight_data);

    $("#entry_section tbody").append(total_cargo_weight_row);

    // Buttons
    button_row = document.createElement("tr");
    button_data = document.createElement("td");

    // Process new cargo button
    let process_new_cargo_button = document.createElement("input");
    process_new_cargo_button.setAttribute("type", "button");
    process_new_cargo_button.setAttribute("value", "Process Cargo");
    process_new_cargo_button.addEventListener("click", validate_new_freight_item);
    process_new_cargo_button.addEventListener("click", process_new_freight_cargo);

    // Reset form button
    let reset_new_freight_form_button = document.createElement("input");
    reset_new_freight_form_button.setAttribute("type", "button");
    reset_new_freight_form_button.setAttribute("value", "Reset Form");
    reset_new_freight_form_button.addEventListener("click", reset_add_freight_form);

    // Append buttons to table
    button_data.append(process_new_cargo_button);
    button_data.append(reset_new_freight_form_button);
    button_row.append(button_data);
    $("#entry_section tfoot").append(button_row);

    // Main menu button
    let main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type", "button");
    main_menu_button.setAttribute("value", "Return to Main Page");
    main_menu_button.addEventListener("click", hide_add_freight_menu);
    main_menu_button.addEventListener("click", reset_add_freight_form);
    $("#divD").append(main_menu_button);
}

// Generate and fills the list of currently available boxcars as selectable buttons
const fill_boxcar_selection_list = () => {
    $("#boxcar_selection tbody").empty();
    for (let current_boxcar_data of CNA_Railsystem.boxcar_list) {
        let boxcar = current_boxcar_data[1];
        let boxcar_row = document.createElement("tr");
        let boxcar_data = document.createElement("td");
        let boxcar_button = document.createElement("input");
        boxcar_button.setAttribute("type", "button")
        boxcar_button.setAttribute("value", boxcar.id);
        boxcar_button.addEventListener("click", set_current_boxcar);

        boxcar_data.append(boxcar_button);
        boxcar_row.append(boxcar_data);
        $("#boxcar_selection tbody").append(boxcar_row)
    }
}

// Add new freight item to currently selected boxcar if no validation errors
// Determines if new freight should be added to boxcar or warehouse and adds the item accordingly
const process_new_freight_cargo = () => {
    if ($("#transport_id_span").attr("class") == "hidden" && $("#description_span").attr("class") && $("#total_cargo_weight_span").attr("class")) {
        let current_boxcar = CNA_Railsystem.boxcar_list.get($("#boxcar_selected").val());
        let new_freight = new Freight_Item($("#transport_id").val(), $("#description").val(), parseFloat($("#total_cargo_weight").val()))

        if (parseFloat($("#total_cargo_weight").val()) + current_boxcar.cargo + current_boxcar.tare <= current_boxcar.max_gross) {
            current_boxcar.add_freight(new_freight);
            current_boxcar.cargo += parseFloat($("#total_cargo_weight").val());
            current_boxcar.gross = current_boxcar.tare + current_boxcar.cargo;
            $("#boxcar_or_warehouse_span").addClass("hidden");
            show_boxcar_manifest();
        } else {
            CNA_Railsystem.warehouse_manifest.add_freight(new_freight);
            $("#boxcar_or_warehouse_span").removeClass("hidden");
            show_warehouse_manifest();
        }
        $("#entry_section").attr("disabled", true);
    }
}

// Set the selected boxcar based on the button selected by the user
const set_current_boxcar = (e) => {
    $("#boxcar_selected").val(e.target.value);
    $("#boxcar_selection").attr("disabled", true);
    $("#entry_section").removeAttr("disabled");
}

// Validates input fields for new freight item
const validate_new_freight_item = () => {
    // Transport ID
    if ($("#transport_id").val() != "") {
        $("#transport_id_span").addClass("hidden");

    } else {
        $("#transport_id_span").removeClass("hidden");
    }

    // Description
    if ($("#description").val() != "") {
        $("#description_span").addClass("hidden");

    } else {
        $("#description_span").removeClass("hidden");
    }

    // Cargo Weight
    if (!isNaN($("#total_cargo_weight").val()) && parseFloat($("#total_cargo_weight").val()) > 0) {
        $("#total_cargo_weight_span").addClass("hidden");

    } else {
        $("#total_cargo_weight_span").removeClass("hidden");
    }
}

// Resets the fields for the "add freight" from
const reset_add_freight_form = () => {
    $("#boxcar_selected").val("");
    $("#transport_id").val("");
    $("#description").val("");
    $("#total_cargo_weight").val("");

    $("#transport_id_span").addClass("hidden")
    $("#description_span").addClass("hidden");
    $("#total_cargo_weight_span").addClass("hidden");

    $("#boxcar_selection").removeAttr("disabled");
    $("#entry_section").attr("disabled", true);
    $("#boxcar_or_warehouse_span").addClass("hidden");
}

// Displays the "add freight" menu and hides the main menu, updates the boxcar selection list
const show_add_freight_menu = () => {
    $("#divA").addClass("hidden");
    $("#divD").removeClass("hidden");
    fill_boxcar_selection_list();
}

// Hides the "add freight" menu, as well as the boxcar and warehouse manifest menus, and displays the main menu
const hide_add_freight_menu = () => {
    $("#divA").removeClass("hidden");
    $("#divD").addClass("hidden");
    hide_boxcar_manifest();
    hide_warehouse_manifest();
}

// ------------ Boxcar Manifest Menu Logic ------------ 
// Generate button elements for the "Boxcar Manifest" menu
const generate_boxcar_manifest_menu = () => {
    return_to_create_freight_button = document.createElement("input");
    return_to_create_freight_button.setAttribute("type", "button");
    return_to_create_freight_button.setAttribute("value", "Return to Create Freight Entry");
    return_to_create_freight_button.addEventListener("click", hide_boxcar_manifest);

    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type", "button");
    main_menu_button.setAttribute("value", "Return to Main Page");
    main_menu_button.addEventListener("click", hide_add_freight_menu);

    $("#divE").append(return_to_create_freight_button);
    $("#divE").append(main_menu_button);
}

// Generate and add a row to the "boxcar manifest" menu, for each freight item in the current boxcar
const fill_current_boxcar_manifest = () => {
    $("#divE tbody").empty();
    let current_boxcar = CNA_Railsystem.boxcar_list.get($("#boxcar_selected").val());
    for (let current_boxcar_data of current_boxcar.cargo_manifest) {
        let boxcar_row = document.createElement("tr");

        let boxcar_transport_id = document.createElement("td");
        let boxcar_description = document.createElement("td");
        let boxcar_cargo_weight = document.createElement("td");

        boxcar_transport_id.textContent = current_boxcar_data.transport_id;
        boxcar_description.textContent = current_boxcar_data.description;
        boxcar_cargo_weight.textContent = current_boxcar_data.cargo_weight;

        boxcar_row.append(boxcar_transport_id);
        boxcar_row.append(boxcar_description);
        boxcar_row.append(boxcar_cargo_weight);
        $("#divE tbody").append(boxcar_row)
    }
    $("#divE #total_cargo_footer").text(current_boxcar.get_total_cargo_weight());
}

// show the boxcar manifest, set the header to match the boxcar id, and update the boxcar manifest
const show_boxcar_manifest = () => {
    $("#divE").removeClass("hidden");
    let current_boxcar = $("#boxcar_selected").val();
    $("#boxcar_manifest_title").text(current_boxcar);
    fill_current_boxcar_manifest();
}

// Reset the freight form and hide the boxcar manifest
const hide_boxcar_manifest = () => {
    reset_add_freight_form();
    $("#divE").addClass("hidden");

}

// ------------ Warehouse Manifest Menu Logic ------------ 
// Generate button elements for the "Warehouse Manifest" menu
const generate_warehouse_manifest_menu = () => {
    // Return to create freight button
    return_to_create_freight_button = document.createElement("input");
    return_to_create_freight_button.setAttribute("type", "button");
    return_to_create_freight_button.setAttribute("value", "Return to Create Freight Entry");
    return_to_create_freight_button.setAttribute("id", "return_to_create_freight_warehouse");
    return_to_create_freight_button.addEventListener("click", hide_warehouse_manifest);
    return_to_create_freight_button.addEventListener("click", reset_add_freight_form);

    // Main menu button
    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type", "button");
    main_menu_button.setAttribute("value", "Return to Main Page");
    main_menu_button.addEventListener("click", hide_add_freight_menu);

    $("#divF").append(return_to_create_freight_button);
    $("#divF").append(main_menu_button);
}

// Generate and add a row to the "warehouse manifest" menu, for each freight item in the current boxcar
const fill_warehouse_manifest = () => {
    $("#divF tbody").empty();
    let warehouse = CNA_Railsystem.warehouse_manifest;

    for (let current_warehouse_data of warehouse.cargo_manifest) {
        let boxcar_row = document.createElement("tr");

        let boxcar_transport_id = document.createElement("td");
        let boxcar_description = document.createElement("td");
        let boxcar_cargo_weight = document.createElement("td");

        boxcar_transport_id.textContent = current_warehouse_data.transport_id;
        boxcar_description.textContent = current_warehouse_data.description;
        boxcar_cargo_weight.textContent = current_warehouse_data.cargo_weight;

        boxcar_row.append(boxcar_transport_id);
        boxcar_row.append(boxcar_description);
        boxcar_row.append(boxcar_cargo_weight);
        $("#divF tbody").append(boxcar_row)
    }
    // Update total cargo weight
    $("#divF #total_cargo_footer").text(warehouse.get_total_cargo_weight());
}

// Hide the main menu and show the "warehouse manifest" menu and update the warehouse manifest list
const show_warehouse_manifest = () => {
    // Hide the "return to create freight" button if accessing "warehouse manifest" menu from the main menu
    if (!$("#divA").hasClass("hidden")) {
        $("#return_to_create_freight_warehouse").addClass("hidden");
    }
    $("#divF").removeClass("hidden");
    $("#divA").addClass("hidden");
    
    fill_warehouse_manifest();
}

// Hide the "warehouse manifest" menu
const hide_warehouse_manifest = () => {
    $("#divF").addClass("hidden");
    $("#return_to_create_freight_warehouse").removeClass("hidden");
}

// ------------ All Freight Status Menu Logic ------------ 
// Generate button elements for the "All Freight Status" menu
const generate_all_freight_status_menu = () => {
    main_menu_button = document.createElement("input");
    main_menu_button.setAttribute("type", "button");
    main_menu_button.setAttribute("value", "Return to Main Page");
    main_menu_button.addEventListener("click", hide_all_freight_status_manifest);

    $("#divG").append(main_menu_button);
}

// Generate and add a row to the "all freight status" menu, for each freight item in each of the boxcar manifests and the warehouse manifest
const fill_all_freight_status_manifest = () => {
    $("#divG tbody").empty();

    // Boxcar Manifest items
    for (let item of CNA_Railsystem.boxcar_list) {
        let current_boxcar = item[1];
        for (let current_boxcar_data of current_boxcar.cargo_manifest) {
            let boxcar_row = document.createElement("tr");

            let boxcar_transport_id = document.createElement("td");
            let boxcar_description = document.createElement("td");
            let boxcar_cargo_weight = document.createElement("td");
            let boxcar_status = document.createElement("td");

            boxcar_transport_id.textContent = current_boxcar_data.transport_id;
            boxcar_description.textContent = current_boxcar_data.description;
            boxcar_cargo_weight.textContent = current_boxcar_data.cargo_weight;
            boxcar_status.textContent = current_boxcar.id;

            boxcar_row.append(boxcar_transport_id);
            boxcar_row.append(boxcar_description);
            boxcar_row.append(boxcar_cargo_weight);
            boxcar_row.append(boxcar_status);
            $("#divG tbody").append(boxcar_row)
        }
    }

    // Warehouse Manifest items
    let warehouse = CNA_Railsystem.warehouse_manifest;
    for (let current_warehouse_data of warehouse.cargo_manifest) {
        let boxcar_row = document.createElement("tr");

        let boxcar_transport_id = document.createElement("td");
        let boxcar_description = document.createElement("td");
        let boxcar_cargo_weight = document.createElement("td");
        let boxcar_status = document.createElement("td");

        boxcar_transport_id.textContent = current_warehouse_data.transport_id;
        boxcar_description.textContent = current_warehouse_data.description;
        boxcar_cargo_weight.textContent = current_warehouse_data.cargo_weight;
        boxcar_status.textContent = "Warehouse";

        boxcar_row.append(boxcar_transport_id);
        boxcar_row.append(boxcar_description);
        boxcar_row.append(boxcar_cargo_weight);
        boxcar_row.append(boxcar_status);
        $("#divG tbody").append(boxcar_row)
    }
}

// Hide the main menu, show the "all freight status" menu and update the "all freight status" table
const show_all_freight_status_manifest = () => {
    $("#divG").removeClass("hidden");
    $("#divA").addClass("hidden");
    fill_all_freight_status_manifest();
}

// Hide the "all freight status" menu and show the main menu
const hide_all_freight_status_manifest = () => {
    $("#divG").addClass("hidden");
    $("#divA").removeClass("hidden");
}

// Global Railsystem variable for managing boxcars and warehouse
var CNA_Railsystem = new Railsystem();

// Generate base page elements for all menus
$(document).ready(() => {
    generate_main_menu();
    generate_create_boxcar_menu();
    generate_rolling_stock_report_menu();
    generate_add_freight_menu();
    generate_boxcar_manifest_menu();
    generate_warehouse_manifest_menu();
    generate_all_freight_status_menu();
});