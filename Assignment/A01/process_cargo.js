
// Steps 1 & 2 Create and add label
let headerLbl = "<h3>Cargo Box Car Manifest for Box Car XXXXX</h3>";
headerLbl = headerLbl.substring(0,headerLbl.indexOf("XXXXX"));
headerLbl += $("#BoxCarID").val();
document.write(headerLbl);

//Step 3 Table

document.write("<table>");
document.write("<tr><th>Transport ID</th><th>Description</th><th>Weight</th></tr>");
document.write("<tr><td>XXXXX</td><td>XXXXX</td><td>XXXXX</td></tr>");
document.write("<tr><td>XXXXX</td><td>XXXXX</td><td>XXXXX</td></tr>");
document.write("<tr><td>XXXXX</td><td>XXXXX</td><td>XXXXX</td></tr>");
document.write("<tr><td>XXXXX</td><td>XXXXX</td><td>XXXXX</td></tr>");
document.write("<tr><td>XXXXX</td><td>XXXXX</td><td>XXXXX</td></tr>");
document.write("<tr><td>Total Weight:</td><td>XXXXX</td></tr>")
document.write("</table>");

$("document").ready( () => {
    console.log("Ready!")
    $("td").text("hahaha")
});