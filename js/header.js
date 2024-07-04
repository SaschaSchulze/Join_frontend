/**
 * @file header.js
 * This file is used to handle the header of the application
 */

// let currentUser;

/**
 * This function initializes and loads user contacts and Initials
 */
async function initHead() {
    console.log("Initializing header...");
    await loadUsers();
    await userInitials();
}

/**
 * This function loads the logged-in user
 */
async function loadUsers() {
    try {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
        console.error('Loading Users error: ', e);
    }
}


/**
 * Show first letter of username
 */
async function userInitials() {
    let usernameFirstLetter = '';

    if (currentUser && currentUser.username) {
        usernameFirstLetter = currentUser.username.charAt(0).toUpperCase();
    }

    let headerUsernameElement = document.getElementById("header-username");

    if (headerUsernameElement) {
        headerUsernameElement.innerHTML = usernameFirstLetter || 'G';
        console.log("User initials set to:", usernameFirstLetter || 'G');
    } else {
        console.error("Element with id 'header-username' not found");
        console.log("Current DOM:", document.body.innerHTML);
    }
}

/**
 * generate and show logout button
 */
function showLogout() {
    document.getElementById('header-logout').innerHTML = /*html*/ `
    <div class="popup-frame-logout" id="hide-btn" onclick="hideLogout()">
        <div onclick="doNotClose(event)">
            <div class="logout-btn">
                <a class="mobile-btn" href="legal_notice.html">Legal notice</a>
                <a class="mobile-btn" href="privacy_policy.html">Privacy Policy</a>
                <div class="logout-inner-btn" onclick="logout()">Log out</div>
            </div>
        </div>
    </div>
    `;
}

/**
 * hide logout button
 */
function hideLogout() {
    document.getElementById('hide-btn').classList.add('d-none');
}

/**
 * stop propagation event for the logout button
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * clear active user status and send back to index.html - log in
 */
async function logout() {
    window.open("index.html", "_self");
}