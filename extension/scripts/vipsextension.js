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

function getParentToAddListTo() {
    for(let widget of document.querySelectorAll('.sidebar-widget-header')) {
        if(widget.innerHTML.includes("Export")) {
            return widget.parentNode.querySelector('.sidebar-widget-content');
        }
    }
    return null;
}

function getListsOfLinksAndNames() {
    let listOfLinks = [], listOfGroupNames = [], listOfDownloadButtons = [], listOfTaskNames = [];

    let lastLinkParent = null, innerList = null;
    for(let list of document.querySelectorAll('.solution-col-5')) {
        if(lastLinkParent !== list.parentElement) {
            if(innerList !== null) listOfLinks.push(innerList);
            innerList = [];
            lastLinkParent = list.parentElement;
        }
        const link = list.querySelector('a');
        let solution = true;
        if(link.querySelector('.solution-none')) {
            solution = false;
        }
        innerList.push({link: link.href, solution: solution});
    }
    listOfLinks.push(innerList);

    for(let link of document.querySelectorAll('td > .solution-toggle')) {
        listOfGroupNames.push(link.innerText.trim());
    }
    
    for(let listOfActions of document.querySelectorAll('td > .action-menu > .action-menu-content > .action-menu-list')) {
        listOfDownloadButtons.push(listOfActions.querySelector('a'));
    }

    let lastNameParent = null;
    for(let list of document.querySelectorAll('.solution-col-5')) {
        if((lastNameParent !== null) && (lastNameParent !== list.parentElement)) {
            break;
        }
        const nameParts = list.querySelector('a > span').innerHTML.split("\n");
        let name = "";
        for(let index in nameParts) {
            console.log(nameParts[index]);
            if(index < 2) {
                continue;
            }
            name += nameParts[index].trim() + " ";
        }
        listOfTaskNames.push(name.trim());
        lastNameParent = list.parentElement;
    }

    return [listOfLinks, listOfGroupNames, listOfDownloadButtons, listOfTaskNames];
}

async function groupDownloadButtonAction() {
    const [regex, input] = getRegex("Gib hier den Regex an, den die Gruppennamen beinhalten, dessen Lösungen du herunterladen möchtest.", listOfGroupNames.length);
    if(input === null) {
        return;
    }
    console.log(`Ich lade jetzt alle Dateien herunter, die zu Gruppen gehören, die den Regex "${input}" im Namen haben (ein Download pro Sekunde).`);

    let amountOfDownloads = 0;
    for(let index in listOfGroupNames) {
        if(regex.test(listOfGroupNames[index])) {
            listOfDownloadButtons[index].click();
            await new Promise(r => setTimeout(r, 1000));
            amountOfDownloads++;
        }
    }

    if(amountOfDownloads > 0) {
        console.log(`Das waren alle Downloads (${amountOfDownloads}) von Gruppen, die den Regex "${input}" enthalten.`);
    } else {
        window.alert(`Es gibt keine Downloads von Gruppen, die den Regex "${input}" enthalten.`);
    }
}

function addButton(text, buttonAction) {
    const list = getParentToAddListTo();
    if(list === null) {
        console.log("Konnte den Button zum Herunterladen nicht einfügen.");
        return;
    }

    let additionalButton = document.createElement("button");
    additionalButton.innerText = text;
    additionalButton.setAttribute("class", "injected-button");
    additionalButton.addEventListener("click", buttonAction);
    
    list.appendChild(additionalButton);

    setTimeout(() => {
        additionalButton.classList.add("transition");
    }, "500");
}

function addGroupDownloadButton() {
    addButton("Abgaben nach Gruppennamen herunterladen", groupDownloadButtonAction);
}

function saveListOfLinks(listOfLinks, listOfGroupNames) {
    sessionStorage.setItem('listOfLinks', JSON.stringify(listOfLinks));
    sessionStorage.setItem('listOfGroupNames', JSON.stringify(listOfGroupNames));
    sessionStorage.setItem('listOfTaskNames', JSON.stringify(listOfTaskNames));
}

const [listOfLinks, listOfGroupNames, listOfDownloadButtons, listOfTaskNames] = getListsOfLinksAndNames();
saveListOfLinks(listOfLinks, listOfGroupNames, listOfTaskNames);
addStylesheet();
addGroupDownloadButton();
loadSettings();
