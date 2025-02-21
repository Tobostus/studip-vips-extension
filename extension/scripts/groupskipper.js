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

let currentName = "";
let groupMenu = true;
let currentRegex = null, currentInput = null;

function getParentToAddNavButtonsTo() {
    return document.getElementById('content').querySelector('.breadcrumb');
}

function getPreviousElementForInsert(list, index) {
    switch(index) {
        case 0:
            return list.children[2];
        case 1:
            return list.children[4];
        default:
            return null;
    }
}

function getInnerIndex(outerIndex) {
    for(let index in listOfLinks[outerIndex]) {
        const identifier = listOfLinks[outerIndex][index].link.split("&solver_id=")[0];
        if(window.location.href.includes(identifier)) {
            return index;
        }
    }
    return 0;
}

function buttonActionBackward() {
    const [regex, input] = getRegex("Gib hier den Regex an, den die Gruppe beinhaltet, zu der du zurückspringen willst.", listOfGroupNames.length);
    if(input === null) {
        return;
    }
    let outerIndex = -1;
    for(let index = listOfGroupNames.indexOf(currentName) - 1; index >= 0; index--) {
        if(regex.test(listOfGroupNames[index])) {
            outerIndex = index;
            break;
        }
    }
    openLinkAtIndex(outerIndex, getInnerIndex(outerIndex), input);
}

function buttonActionForward() {
    const [regex, input] = getRegex("Gib hier den Regex an, den die Gruppe beinhaltet, zu der du hinspringen willst.", listOfGroupNames.length);
    if(input === null) {
        return;
    }
    let outerIndex = -1;
    for(let index = listOfGroupNames.indexOf(currentName) + 1; index < listOfGroupNames.length; index++) {
        if(regex.test(listOfGroupNames[index])) {
            outerIndex = index;
            break;
        }
    }
    openLinkAtIndex(outerIndex, getInnerIndex(outerIndex), input);
}

function getCurrentName() {
    for(let container of getParentToAddNavButtonsTo().querySelectorAll('a')) {
        if(container.href.includes("/plugins.php/vipsplugin/solutions/assignment_solutions?")) {
            currentName = container.innerHTML.trim();
        }
    }
}

function updateCorrected() {
    if(listOfGroupNames.length === 0) {
        return;
    }
    const isCorrected = document.querySelector("input[name=\"corrected\"]").checked;
    const outerIndex = listOfGroupNames.indexOf(currentName);
    listOfLinks[outerIndex][getInnerIndex(outerIndex)].corrected = isCorrected;
    sessionStorage.setItem('listOfLinks', JSON.stringify(listOfLinks));
}

function catchSave() {
    const saveButton = document.querySelector("button[name=\"store_solution\"]:not([style=\"display: none;\"])");
    saveButton.addEventListener("click", updateCorrected);
}

function initialize() {
    loadData();
    loadSettings();
    getCurrentName();

    catchSave();

    addStylesheet();
    for(let i = 0; i < 2; i++) {
        addNavigationButton(i);
    }
}
