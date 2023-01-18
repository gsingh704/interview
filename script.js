function addContact() {
    // Get the user input
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    // Create a new table row
    var newRow = document.createElement("tr");

    // Create the cells for the row
    var nameCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var removeCell = document.createElement("td");

    // Create the remove button
    var selectbox = document.createElement("input");
    selectbox.type = "checkbox";
    selectbox.className = "selectBox";

    // Append the remove button to the remove cell
    removeCell.appendChild(selectbox);

    // Set the text content of the cells
    nameCell.textContent = name;
    emailCell.textContent = email;

    // Append the cells to the row
    newRow.appendChild(nameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(removeCell);

    // Add the new row to the table
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.appendChild(newRow);

    // Store the data in Local Storage
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name: name, email: email });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
window.onload = function () {
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < contacts.length; i++) {
        // Create a new table row
        var newRow = document.createElement("tr");

        // Create the cells for the row
        var nameCell = document.createElement("td");
        var emailCell = document.createElement("td");
        var removeCell = document.createElement("td");

        // Create the remove checkbox
        var selectbox = document.createElement("input");
        selectbox.type = "checkbox";
        selectbox.className = "selectBox";

        // Append the remove checkbox to the remove cell
        removeCell.appendChild(selectbox);

        // Set the text content of the cells
        nameCell.textContent = contacts[i].name;
        emailCell.textContent = contacts[i].email;

        // Append the cells to the row
        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(removeCell);

        // Add the new row to the table
        tbody.appendChild(newRow);
    }
}

function removeSelected() {
    var checkboxes = document.querySelectorAll(".selectBox");
    var selectedContacts = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedContacts.push({
                name: checkboxes[i].parentNode.parentNode.children[0].textContent,
                email: checkboxes[i].parentNode.parentNode.children[1].textContent
            });
            checkboxes[i].parentNode.parentNode.remove();
        }
    }
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    var updatedContacts = contacts.filter(contact => !selectedContacts.some(selected => selected.name == contact.name && selected.email == contact.email));
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
}
function mailSelected() {
    var checkboxes = document.querySelectorAll(".selectBox");
    var selectedEmails = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedEmails.push(checkboxes[i].parentNode.parentNode.children[1].textContent);
        }
    }
    if (selectedEmails.length > 0) {
        var emailLink = "mailto:" + selectedEmails.join(";") + "?subject=Email from my website&body=Hello,%0D%0A%0D%0A";
        window.location.href = emailLink;
    }
}
