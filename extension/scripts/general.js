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

console.log("Die Stud.IP Vips Extension ist jetzt aktiv.");

let popup = true, defaultRegex = "", correctedGreen = true, uncorrectedRed = false;

function getRegex(msg, amountOfCandidates = 0) {
    if(amountOfCandidates === 0) {
        window.alert("Es sind aktuell keine Gruppennamen zwischengespeichert.\nBesuche dafür zuerst die Übersicht dieses Aufgabenblatts und komme dann hierher zurück.");
        return [null, null];
    }
    let input = defaultRegex;
    if(popup) {
        input = window.prompt(msg, defaultRegex)
    }
    return [new RegExp("^.*"+input+".*$"), input];
}

function addStylesheet() {
    const head = document.head;

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = browser.runtime.getURL('styles/injected_style.css');

    head.appendChild(link);
}

function loadSettings() {
    browser.storage.local.get(['popup', 'defaultRegex', 'correctedGreen', 'uncorrectedRed'], result => {
        if(result.popup != null) {
            popup = result.popup;
        }
        if(result.defaultRegex != null) {
            defaultRegex = result.defaultRegex;
        }
        if(result.correctedGreen != null) {
            correctedGreen = result.correctedGreen;
        }
        if(result.uncorrectedRed != null) {
            uncorrectedRed = result.uncorrectedRed;
        }
    });
}

browser.storage.onChanged.addListener((changes, areaName) => {
    if(areaName === "local") {
        loadSettings();
    }
});
