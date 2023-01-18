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




var editButtons = document.getElementsByClassName("editButton");
for(var i = 0; i < editButtons.length; i++){
    editButtons[i].addEventListener("click", function(){
        editContact(this);
    });
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
    var row = editButton.parentNode.parentNode;

    for (var i = 0; i < row.cells.length-2; i++) {
        var cell = row.cells[i];
        var cellValue = cell.innerHTML;

        var input = document.createElement("input");
        input.type = "text";
        input.value = cellValue;
        cell.innerHTML = "";
        cell.appendChild(input);
    }

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.onclick = function(){
        saveChanges(this);
    }
    row.cells[4].appendChild(saveButton);
    editButton.style.display = "none";
}

function saveChanges(saveButton) {
    var row = saveButton.parentNode.parentNode;

    // Get the values of the cells in the row
    var dni = row.cells[0].children[0].value;
    var name = row.cells[1].children[0].value;
    var email = row.cells[2].children[0].value;

    // Update the text content of the cells
    row.cells[0].innerHTML = dni;
    row.cells[1].innerHTML = name;
    row.cells[2].innerHTML = email;

    // Change the text of the save button back to "Edit"
    saveButton.style.display = "none";
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function(){
        editContact(this);
    }
    row.cells[4].appendChild(editButton);

    // Get the current data in local storage
    var potential = JSON.parse(localStorage.getItem("potential")) || [];

    // Find the index of the contact to update
    var index = potential.findIndex(contact => contact.dni === dni);

    // Update the contact in the potential array
    potential[index] = { name: name, email: email, dni: dni };

    // Save the updated data in local storage
    localStorage.setItem("potential", JSON.stringify(potential));
}
