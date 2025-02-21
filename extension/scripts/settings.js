// This browser extension helps tutors manage Vips on Stud.IP.
// Copyright (C) 2025  Tobias Straube

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const showPopupToggle = document.getElementById("show-popup");
const defaultRegexText = document.getElementById("default-regex");
const correctedGreenToggle = document.getElementById("make-corrected-green");
const uncorrectedRedToggle = document.getElementById("make-uncorrected-red");
const saveButton = document.getElementById("save-settings");

function loadFromStorage() {
    browser.storage.local.get(['popup', 'defaultRegex', 'correctedGreen', 'uncorrectedRed'], result => {
        if(result.popup != null) {
            showPopupToggle.checked = result.popup;
        }
        if(result.defaultRegex != null) {
            defaultRegexText.value = result.defaultRegex;
        }
        if(result.correctedGreen != null) {
            correctedGreenToggle.checked = result.correctedGreen;
        }
        if(result.uncorrectedRed != null) {
            uncorrectedRedToggle.checked = result.uncorrectedRed;
        }
    });
}

function saveChanges() {
    const popup = showPopupToggle.checked;
    const defaultRegex = defaultRegexText.value;
    const correctedGreen = correctedGreenToggle.checked;
    const uncorrectedRed = uncorrectedRedToggle.checked;
    
    browser.storage.local.set({popup: popup, defaultRegex: defaultRegex, correctedGreen: correctedGreen, uncorrectedRed: uncorrectedRed}, () => {
        console.log("Eingaben gespeichert!");
        saveButton.classList.add("green");
        setTimeout(() => {
            saveButton.classList.remove("green");
        }, "1500");
    });
}

function addEventListeners() {
    saveButton.addEventListener("click", saveChanges);
}

loadFromStorage();
addEventListeners();