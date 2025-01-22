// This program visualizes mathematical series in a browser.
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

const saveButton = document.getElementById("save-settings");
const showPopupToggle = document.getElementById("show-popup");
const defaultRegexText = document.getElementById("default-regex");

function loadFromStorage() {
    browser.storage.local.get(['popup'], function(result) {
        if(result.popup != null) {
            showPopupToggle.checked = result.popup;
        }
    })
    
    browser.storage.local.get(['defaultRegex'], function(result) {
        if(result.defaultRegex != null) {
            defaultRegexText.value = result.defaultRegex;
        }
    })
}

function saveChanges() {
    const popup = showPopupToggle.checked;
    const defaultRegex = defaultRegexText.value;
    
    browser.storage.local.set({popup: popup, defaultRegex: defaultRegex}, function() {
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