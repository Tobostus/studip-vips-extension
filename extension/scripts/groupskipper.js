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

let currentName = "";
let listOfLinks = [], listOfGroupNames = [], listOfTaskNames = [];
let groupMenu = true;
let currentRegex = null, currentInput = null;

function getParentToAddListTo() {
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

function openLinkAtIndex(outerIndex, innerIndex, input) {
    if(outerIndex > -1) {
        const linkToOpen = listOfLinks[outerIndex][innerIndex].link;
        if(linkToOpen) {
            window.location.href = linkToOpen;
        }
    } else {
        window.alert(`Es gibt in der Richtung keine weitere Gruppe, die den Regex "${input}" beinhaltet.\n`);
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

function addSelectMenu() {
    let menu = document.createElement('div');
    menu.id = "select-group-menu";
    menu.classList.add('hidden');

    menu.addEventListener('click', (event) => {
        if (event.target === menu) {
            menu.classList.add('hidden');
        }
    });

    let menuContent = document.createElement('div');
    menuContent.id = "select-group-menu-content";

    let menuHeader = document.createElement('h3');
    menuHeader.id = "select-group-menu-header";

    let menuList = document.createElement('ul');
    menuList.id = "select-group-menu-list";

    let closeButtonContainer = document.createElement('div');
    closeButtonContainer.id = "close-select-group-menu-button-container";
    closeButtonContainer.classList.add('right-aligned');

    let infoTextAboutMatches = document.createElement('div');
    infoTextAboutMatches.id = "select-group-menu-counter";
    infoTextAboutMatches.setAttribute('class', "grayed-out left-corner-text");

    let closeButton = document.createElement('button');
    closeButton.id = "close-select-group-menu";
    closeButton.classList.add("injected-button");
    closeButton.innerHTML = "Schließen";
    closeButton.addEventListener('click', function() {
        if(groupMenu) {
            menu.classList.add('hidden');
        } else {
            populateSelectMenu(true);
        }
    });

    closeButtonContainer.appendChild(infoTextAboutMatches);
    closeButtonContainer.appendChild(closeButton);

    menuContent.appendChild(menuHeader);
    menuContent.appendChild(menuList);
    menuContent.appendChild(closeButtonContainer);

    menu.appendChild(menuContent);

    document.body.appendChild(menu);
}

function populateSelectMenuWithSubMenu(outerIndex) {
    groupMenu = false;
    const menuHeader = document.getElementById("select-group-menu-header");
    menuHeader.innerHTML = "Wähle die gewünschte Aufgabe aus";
    const menuList = document.getElementById("select-group-menu-list");
    menuList.innerHTML = "";
    for(let innerIndex in listOfLinks[outerIndex]) {
        let li = document.createElement('li');
        li.textContent = (Number(innerIndex) + 1) + ". " + listOfTaskNames[innerIndex];
        li.addEventListener('click', function() {
            openLinkAtIndex(outerIndex, innerIndex, "");
        });
        if(listOfLinks[outerIndex][innerIndex].corrected) {
            li.classList.add("greened-in");
        } else if(!listOfLinks[outerIndex][innerIndex].solution) {
            li.classList.add("grayed-out");
        }
        menuList.appendChild(li);
    }
    document.getElementById("select-group-menu-counter").innerText = `${menuList.children.length} Treffer`;
}

function populateSelectMenu(useOldInput = false) {
    groupMenu = true;
    let regex, input;

    if(useOldInput) {
        regex = currentRegex;
        input = currentInput;
    } else {
        [regex, input] = getRegex("Gib hier den Regex an, den Gruppen beinhalten sollen, um in der Auswahlliste aufzutauchen.", listOfGroupNames.length);
        if(input === null) {
            return -1;
        }
    }

    const menuHeader = document.getElementById("select-group-menu-header");
    menuHeader.innerHTML = "Wähle die gewünschte Gruppe aus";
    const menuList = document.getElementById("select-group-menu-list");
    menuList.innerHTML = "";
    for(let index in listOfGroupNames) {
        if(!regex.test(listOfGroupNames[index])) {
            continue;
        }
        let li = document.createElement('li');
        li.textContent = listOfGroupNames[index];
        li.addEventListener('click', function() {
            if(listOfLinks[index].length > 1) {
                populateSelectMenuWithSubMenu(index);
            } else {
                openLinkAtIndex(index, 0, input);
            }
        });
        let corrected = true;
        for(let task of listOfLinks[index]) {
            corrected &= task.corrected || !task.solution;
        }
        if(corrected) {
            li.classList.add("greened-in");
        }
        menuList.appendChild(li);
    }
    if(menuList.children.length === 0) {
        window.alert(`Es gibt keine Gruppe, die den Regex "${input}" beinhaltet.`);
        return -1;
    }
    document.getElementById("select-group-menu-counter").innerText = `${menuList.children.length} Treffer`;
    currentRegex = regex;
    currentInput = input;
    return 0;
}

function buttonActionSelectMenu() {
    if(populateSelectMenu() == -1) {
        return;
    }
    document.getElementById("select-group-menu").classList.remove('hidden');
}

function addNavigationButton(index) {
    const list = getParentToAddListTo();

    if(list === null) {
        console.error(`Konnte Navigationsbutton ${index} nicht einfügen.`);
        return;
    }

    let additionalButton = document.createElement("button");
    additionalButton.setAttribute("class", "injected-button small");
    let event;
    switch(index) {
        case 0:
            additionalButton.innerText = "<<";
            event = buttonActionBackward;
            break;
        case 1:
            additionalButton.innerText = ">>";
            event = buttonActionForward;
            break;
        case 2:
            let listIcon = document.createElement("img");
            listIcon.src = browser.runtime.getURL("../icons/open-list.png");
            additionalButton.appendChild(listIcon);
            event = buttonActionSelectMenu;
            break;
    }
    additionalButton.addEventListener("click", event);
    
    const previousElement = getPreviousElementForInsert(list, index);
    list.appendChild(additionalButton);
    list.insertBefore(additionalButton, previousElement);

    setTimeout(() => {
        additionalButton.classList.add("transition");
    }, "500");
}

function getCurrentName() {
    for(let container of getParentToAddListTo().querySelectorAll('a')) {
        if(container.href.includes("/plugins.php/vipsplugin/solutions/assignment_solutions?")) {
            currentName = container.innerHTML.trim();
        }
    }
}

function loadData() {
    const lol = sessionStorage.getItem('listOfLinks');
    if(lol) {
        listOfLinks = JSON.parse(lol);
    }
    
    const logn = sessionStorage.getItem('listOfGroupNames');
    if(logn) {
        listOfGroupNames = JSON.parse(logn);
    }

    const lotn = sessionStorage.getItem('listOfTaskNames');
    if(lotn) {
        listOfTaskNames = JSON.parse(lotn);
    }
}

loadData();
loadSettings();
getCurrentName();

addSelectMenu();
addStylesheet();
for(let i = 0; i < 3; i++) {
    addNavigationButton(i);
}
