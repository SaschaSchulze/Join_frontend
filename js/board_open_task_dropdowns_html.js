/**
 * This function creates a dropdown for the contacts in the edit modal
 */
function createContactDropdown(taskId) {
    let contactDropdownEdit = document.querySelector('.card-modal-assigned-to-headline');

    let inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    inputContainer.innerHTML = `
        <input id="assignedToEdit" type="text" class="assigned-dropdown" placeholder="Select contacts to assign">
            <img id="arrow_down_edit" onclick="showDropdownEdit('${currentTaskId}')" class="arrow_down_edit" src="img/arrow_down.svg" alt="">
        <div id="contactDropdownEdit_${currentTaskId}" class="dropdown-content-edit" data-task-id="${currentTaskId}"></div>
    `;

    contactDropdownEdit.appendChild(inputContainer);
    document.getElementById('arrow_down_edit').addEventListener('click', function () {
        showDropdownEdit(taskId);
    });
}
/**
 * Generates the HTML content for a contact in edit mode.
 *
 * @param {Object} contact - The contact object.
 * @param {boolean} isSelected - Indicates whether the contact is selected.
 * @returns {string} The HTML content for the contact.
 */
function generateContactHTMLEdit(contact, isSelected) {
    return `
        <label class="contacts-edit ${isSelected ? 'checked' : ''}" onclick="toggleContactSelectionEdit(this, '${contact.id}')">
            <div class="avatar">
                <img src="img/Ellipse5-${contact.avatarid}.svg" alt="${contact.name}">
                <div class="avatar_initletter">${contact.name.split(' ').map(n => n[0]).join('')}</div>
            </div>
            <div class="contact-dropdown-edit">
                <div>${contact.name}</div>
            </div>
            <div class="custom-checkbox" data-contact-id="${contact.id}"></div>
            <img class="checkbox-img" src="${isSelected ? 'img/checked_white.svg' : 'img/unchecked.svg'}" alt="Checkbox">
        </label>
    `;
}
/**
 * Creates a div element for a selected contact in the edit mode.
 *
 * @param {Object} contact - The contact object.
 * @returns {HTMLDivElement} The created div element for the selected contact.
 */
function createSelectedContactDivEdit(contact) {
    let selectedContactDiv = document.createElement("div");
    selectedContactDiv.classList.add("initial-container-open-card");
    selectedContactDiv.dataset.id = contact.id;
    selectedContactDiv.id = "selectedContactEdit";

    selectedContactDiv.innerHTML = `
        <div data-avatarid="${contact.id}">
            <div class="avatar">
                <img src="${contact.imagePath}" alt="Avatar">
                <div class="avatar_initletter">${contact.name.split(' ').map(n => n[0]).join('')}</div>
            </div>
        </div>
    `;

    return selectedContactDiv;
}

/**
 * Sets up the due date input for the add task modal and fills it with the current task data.
 * 
 * @function
 * @name setupDueDateInputAddTaskModal
 * @returns {void}
 */
function setupDueDateInputEdit() {
    let dateElement = document.getElementById('date');

    let dateContainer = document.createElement('div');
    dateContainer.className = 'due-date-container';
    let dateHeadline = document.createElement('div');
    let dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.id = 'date';
    dateInput.className = 'due-date-input';
    dateInput.placeholder = 'dd/mm/yyyy';
    dateInput.required = true;

    let dateText = dateElement.textContent;
    let dateValue = dateText.replace('Due date: ', '');
    dateInput.value = dateValue;

    dateInput.style.backgroundImage = 'url("img/calendar.svg")';
    dateInput.style.backgroundRepeat = 'no-repeat';
    dateInput.style.backgroundPosition = 'right center';
    dateInput.style.backgroundSize = '24px';

    dateContainer.appendChild(dateHeadline);
    dateContainer.appendChild(dateInput);
    dateElement.replaceWith(dateContainer);

    $(dateInput).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
    });
}