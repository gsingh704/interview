function addContact() {
    // Get the user input
    //name
    var name = document.getElementById("name").value;
    //email
    var email = document.getElementById("email").value;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
    }
    //dni
    var dni = document.getElementById("dni").value;
    var dniRegex = /^[a-zA-Z]{1}\d{4}$/;
    if (!dniRegex.test(dni)) {
        alert("Invalid ID format. ID must have a  letter in the first position and 4 numbers in the last four positions (e.g. A1234)");
        return;
    }
    var clientContact = JSON.parse(localStorage.getItem("clientContact")) || [];
    // Check if the new contact's ID already exists in the  clientContact array
    var duplicate = clientContact.find(contact => contact.dni === dni);
    if (duplicate) {
        alert("Error: Contact with ID " + dni + " already exists.");
        return;
    }
    // Create a new table row
    var newRow = document.createElement("tr");

    // Create the cells for the row
    var dniCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var removeCell = document.createElement("td");


    // Create the remove button
    var selectbox = document.createElement("input");
    selectbox.type = "checkbox";
    selectbox.className = "selectBox";

    // add the remove button to the remove cell
    removeCell.appendChild(selectbox);

    // make the text content of the cells
    dniCell.textContent = dni;
    nameCell.textContent = name;
    emailCell.textContent = email;

    // add the cells to the row
    newRow.appendChild(dniCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(removeCell);

    // add this new row to the table
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.appendChild(newRow);

    // store the data in local storage
    var clientContact = JSON.parse(localStorage.getItem("clientContact")) || [];
    clientContact.push({ name: name, email: email, dni: dni });
    localStorage.setItem("clientContact", JSON.stringify(clientContact));
}

window.onload = function () {
    var clientContact = JSON.parse(localStorage.getItem("clientContact")) || [];
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < clientContact.length; i++) {
        // Create a new table row
        var newRow = document.createElement("tr");

        // Create the cells for the row
        var dniCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var emailCell = document.createElement("td");
        var removeCell = document.createElement("td");

        // Create the remove checkbox
        var selectbox = document.createElement("input");
        selectbox.type = "checkbox";
        selectbox.className = "selectBox";

        // add the remove checkbox to the remove cell
        removeCell.appendChild(selectbox);

        // Make the text content of the cells
        dniCell.textContent = clientContact[i].dni;
        nameCell.textContent = clientContact[i].name;
        emailCell.textContent = clientContact[i].email;

        // add the cells to the row
        newRow.appendChild(dniCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(removeCell);

        // Add the new row to the table
        tbody.appendChild(newRow);
    }
}
// remove the selected contacts
function removeSelected() {
    var checkboxes = document.querySelectorAll(".selectBox");
    var selectedclientContact = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedclientContact.push({
                dni: checkboxes[i].parentNode.parentNode.children[0].textContent,
                name: checkboxes[i].parentNode.parentNode.children[1].textContent,
                email: checkboxes[i].parentNode.parentNode.children[2].textContent
            });
            checkboxes[i].parentNode.parentNode.remove();
        }
    }
    var clientContact = JSON.parse(localStorage.getItem("clientContact")) || [];
    var updatedclientContact = clientContact.filter(contact => !selectedclientContact.some(selected => selected.name == contact.name && selected.email == contact.email));
    localStorage.setItem("clientContact", JSON.stringify(updatedclientContact));
}
// mail the selected contacts
function mailSelected() {
    var checkboxes = document.querySelectorAll(".selectBox");
    var selectedEmails = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedEmails.push(checkboxes[i].parentNode.parentNode.children[2].textContent);//email index is 2
        }
    }
    if (selectedEmails.length > 0) {
        var emailLink = "mailto:" + selectedEmails.join(";") + "?subject=Email from my website&body=Hello,%0D%0A%0D%0A";
        window.location.href = emailLink;
    }
}
