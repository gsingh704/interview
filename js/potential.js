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
    var potential = JSON.parse(localStorage.getItem("potential")) || [];
    // Check if the new contact's ID already exists in the  potential array
    var duplicate = potential.find(contact => contact.dni === dni);
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
    var editCell = document.createElement("td");

    // Create the select button
    var selectbox = document.createElement("input");
    selectbox.type = "checkbox";
    selectbox.className = "selectBox";

    // add the select button to the remove cell
    removeCell.appendChild(selectbox);

    // Create the edit button
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "editButton";
    // add the onclick event to the edit button
    editButton.onclick = function () { editContact(this) };

    // add the edit button to the edit cell
    editCell.appendChild(editButton);

    // make the text content of the cells
    dniCell.textContent = dni;
    nameCell.textContent = name;
    emailCell.textContent = email;

    // add the cells to the row
    newRow.appendChild(dniCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(removeCell);
    newRow.appendChild(editCell);

    // add this new row to the table
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.appendChild(newRow);

    // store the data in local storage
    var potential = JSON.parse(localStorage.getItem("potential")) || [];
    potential.push({ name: name, email: email, dni: dni });
    localStorage.setItem("potential", JSON.stringify(potential));
}



window.onload = function () {
    var potential = JSON.parse(localStorage.getItem("potential")) || [];
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < potential.length; i++) {
        // Create a new table row
        var newRow = document.createElement("tr");

        // Create the cells for the row
        var dniCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var emailCell = document.createElement("td");
        var removeCell = document.createElement("td");
        var editCell = document.createElement("td");

        // Create the remove checkbox
        var selectbox = document.createElement("input");
        selectbox.type = "checkbox";
        selectbox.className = "selectBox";

        // add the remove checkbox to the remove cell
        removeCell.appendChild(selectbox);
        // Create the edit button
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "editButton";
        // add the onclick event to the edit button
        editButton.onclick = function () { editContact(this) };

        // add the edit button to the edit cell
        editCell.appendChild(editButton);

        // Make the text content of the cells
        dniCell.textContent = potential[i].dni;
        nameCell.textContent = potential[i].name;
        emailCell.textContent = potential[i].email;

        // add the cells to the row
        newRow.appendChild(dniCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(removeCell);
        newRow.appendChild(editCell);


        // Add the new row to the table
        tbody.appendChild(newRow);
    }
}
// remove the selected contacts
function removeSelected() {
    var checkboxes = document.querySelectorAll(".selectBox");
    var selectedpotential = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedpotential.push({
                dni: checkboxes[i].parentNode.parentNode.children[0].textContent,
                name: checkboxes[i].parentNode.parentNode.children[1].textContent,
                email: checkboxes[i].parentNode.parentNode.children[2].textContent
            });
            checkboxes[i].parentNode.parentNode.remove();
        }
    }
    var potential = JSON.parse(localStorage.getItem("potential")) || [];
    var updatedpotential = potential.filter(contact => !selectedpotential.some(selected => selected.name == contact.name && selected.email == contact.email));
    localStorage.setItem("potential", JSON.stringify(updatedpotential));
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

function editContact(editButton) {
    // Get the parent row of the clicked button
    var row = editButton.parentNode.parentNode;

    // Get the values of the cells in the row
    var dni = row.cells[0].innerHTML;
    var name = row.cells[1].innerHTML;
    var email = row.cells[2].innerHTML;

    // Open a form with the current values pre-filled
    document.getElementById("edit-dni").value = dni;
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-email").value = email;

    // Show the form
    document.getElementById("edit-form").style.display = "block";
}

// add a submit event listener to the form
document.getElementById("edit-form").addEventListener("submit", saveChanges);

function saveChanges(event) {
    // prevent the form from submitting
    event.preventDefault();

    // get the updated values from the form
    var dni = document.getElementById("edit-dni").value;
    var name = document.getElementById("edit-name").value;
    var email = document.getElementById("edit-email").value;

    // find the contact in the local storage by dni
    var potential = JSON.parse(localStorage.getItem("potential")) || [];
    var contactIndex = potential.findIndex(contact => contact.dni === dni);

    // update the contact information
    potential[contactIndex].name = name;
    potential[contactIndex].email = email;
    potential[contactIndex].dni = dni;

    // update the local storage
    localStorage.setItem("potential", JSON.stringify(potential));

    // update the table
    var row = document.getElementById("edit-form").parentNode.parentNode;
    row.cells[0].innerHTML = dni;
    row.cells[1].innerHTML = name;
    row.cells[2].innerHTML = email;

    // close the form
    document.getElementById("edit-form").style.display = "none";
    
    
}
