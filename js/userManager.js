/**
 * Diese Datei ist für das Verwalten der Benutzerdaten und des aktuellen Benutzers verantwortlich
 * @file userManager.js
 */

let currentUser;
let isUserLoggedIn = false;
let users = []; // Definieren Sie das users-Array hier, um globale Sichtbarkeit zu gewährleisten

/**
 * Benutzerdaten laden und Benutzer-ID initialisieren
 */
async function initUser() {
    try {
        await loadData();
        initUserID();
    } catch (error) {
        console.error('Fehler beim Initialisieren des Benutzers:', error);
    }
}

/** Initialisiert die aktuelle Benutzer-ID
 * 
 * @returns Die aktuelle Benutzer-ID des eingeloggten Benutzers. Wenn nicht eingeloggt, ist currentUser "Gast".
 */
function initUserID() {
    // Überprüfen Sie, ob users null oder nicht definiert ist, bevor Sie versuchen, darauf zuzugreifen
    if (!users) {
        console.error('Benutzerdaten sind nicht definiert oder null.');
        return;
    }

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user["isYou"]) {
            currentUser = user["userID"];
            isUserLoggedIn = true;
            return;
        }
    }
    
    // Wenn kein eingeloggter Benutzer gefunden wurde
    currentUser = 'Gast';
    isUserLoggedIn = false;
}

/**
 * Lädt die Benutzer aus unserer Speicherung
 */
async function loadData() {
    try {
        // Laden Sie die Benutzerdaten und setzen Sie das users-Array
        users = JSON.parse(await getItem('users')) || [];
    } catch (e) {
        console.error('Fehler beim Laden der Daten:', e);
    }
}

/**
 * Einfache Hilfsfunktion zum Laden eines Elements aus dem lokalen Speicher
 * @param {string} key - Der Schlüssel des Elements im lokalen Speicher
 * @returns {Promise<string|null>} - Der Inhalt des Elements oder null, wenn es nicht gefunden wurde
 */
function getItem(key) {
    return new Promise((resolve, reject) => {
        let item = localStorage.getItem(key);
        if (item) {
            resolve(item);
        } else {
            reject(`Element mit Schlüssel '${key}' nicht gefunden.`);
        }
    });
}
