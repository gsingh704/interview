function addContact() {
    // get the user input
    var name = document.getElementById("name").value;
    
    var email = document.getElementById("email").value;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegex.test(email)){
      alert("Invalid email address");
      return;
    }

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

    // add the remove button to the remove cell
    removeCell.appendChild(selectbox);

    // make the text content of the cells
    nameCell.textContent = name;
    emailCell.textContent = email;

    // add the cells to the row
    newRow.appendChild(nameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(removeCell);

    // add this new row to the table
    var table = document.getElementById("contact-table");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.appendChild(newRow);

    // store the data in local storage
    var potential = JSON.parse(localStorage.getItem("potential")) || [];
    potential.push({ name: name, email: email });
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
        nameCell.textContent = potential[i].name;
        emailCell.textContent = potential[i].email;

        // add the cells to the row
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
    var selectedpotential = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedpotential.push({
                name: checkboxes[i].parentNode.parentNode.children[0].textContent,
                email: checkboxes[i].parentNode.parentNode.children[1].textContent
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
            selectedEmails.push(checkboxes[i].parentNode.parentNode.children[1].textContent);
        }
    }
    if (selectedEmails.length > 0) {
        var emailLink = "mailto:" + selectedEmails.join(";") + "?subject=Email from my website&body=Hello,%0D%0A%0D%0A";
        window.location.href = emailLink;
    }
}
