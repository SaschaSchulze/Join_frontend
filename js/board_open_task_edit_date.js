/**
 * Sets up the due date input for the edit modal and fills it with the current task data.
 * 
 * @function
 * @name setupDueDateInput
 * @returns {void}
 */
function setupDueDateInput() {
    let dateElement = document.getElementById('dueDateText');

    let dateContainer = document.createElement('div');
    dateContainer.className = 'due-date-container';
    let dateHeadline = document.createElement('div');
    dateHeadline.textContent = 'Due Date';
    let dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.className = 'due-date-input';
    dateInput.required = true;

    let dateText = dateElement.textContent;
    let dateValue = dateText.replace('Due date: ', '');
    dateInput.value = dateValue;

    dateContainer.appendChild(dateHeadline);
    dateContainer.appendChild(dateInput);
    dateElement.replaceWith(dateContainer);

    dateInputStyle(dateInput);
    setupDatepicker(dateInput);
    setupInputLengthValidation(dateInput);
    setupDateInputFormatting(dateInput);
}

/**
 * Applies styling to the date input.
 * 
 * @param {HTMLInputElement} dateInput - The date input element.
 * @returns {void}
 */
function dateInputStyle(dateInput) {
    dateInput.style.backgroundImage = 'url("img/calendar.svg")';
    dateInput.style.backgroundRepeat = 'no-repeat';
    dateInput.style.backgroundPosition = 'right center';
    dateInput.style.backgroundSize = '24px';
}

/**
 * Sets up the datepicker for the date input.
 * 
 * @param {HTMLInputElement} dateInput - The date input element.
 * @returns {void}
 */
function setupDatepicker(dateInput) {
    $(dateInput).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        minDate: new Date()
    });
}

/**
 * Sets up validation for the length of the date input.
 * 
 * @param {HTMLInputElement} dateInput - The date input element.
 * @returns {void}
 */
function setupInputLengthValidation(dateInput) {
    dateInput.addEventListener('input', function(event) {
        let inputValue = event.target.value;
        if (inputValue.length === 10) {
            event.target.blur();
        }
    });
}

/**
 * Sets up formatting for the date input.
 * 
 * @param {HTMLInputElement} dateInput - The date input element.
 * @returns {void}
 */
function setupDateInputFormatting(dateInput) {
    dateInput.addEventListener('input', function(event) {
        let inputValue = event.target.value;
        if (inputValue.length === 2 || inputValue.length === 5) {
            event.target.value += '/';
        }
    });

    dateInput.addEventListener('input', function(event) {
        let inputValue = event.target.value.replace(/\//g, '');
        let day = inputValue.slice(0, 2);
        let month = inputValue.slice(2, 4);
        let year = inputValue.slice(4, 8);

        let formattedValue = formatDateStringModal(day, month, year);

        if (formattedValue !== event.target.value) {
            event.target.value = formattedValue;
        }

        handleInvalidDayModal(event, day, month, year);
        handleInvalidMonthModal(event, day, month, year);
        handleInvalidYearModal(event, day, month, year);
    });
}