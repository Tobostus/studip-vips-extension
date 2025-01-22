# ![icon](/extension/icons/vipsextension-32.png) Stud.IP Vips Extension

Die **Stud.IP Vips Extension** erleichtert das Herunterladen von ausgewählten Abgaben und das Eintragen von Bewertungen in den [Vips](https://hilfe.studip.de/help/4.5/de/Vips/HomePage) von [Stud.IP](https://www.studip.de/).

## Features

* Download von Abgaben bestimmter Gruppen

* Springen zu bestimmten Gruppen zum Eintragen der Bewertung

## Installation

Aktuell ist die Extension nur offiziell für [Firefox](https://www.mozilla.org/de/firefox/new/) verfügbar.

Lade die Extension unter [Releases](https://github.com/Tobostus/studip-vips-extension) herunter und installiere sie in den Einstellungen:

> Add-ons und Themes $\rightarrow$ Erweiterungen $\rightarrow$ Zahnrad $\rightarrow$ Add-on aus Datei installieren

## Verwendung

_**Achtung**: Die [Navigationsfeatures](#navigation) funktionieren nur in einem Browsertab, in dem zuvor die Abgabeübersicht geöffnet wurde. Die vorhandenen Gruppennamen und Links zu zugehörigen Abgaben werden daraus extrahiert und zwischengespeichert._

### Einstellungen

Unter deinen Erweiterungen in der Browserleiste kannst du die Einstellungen der Extension aufrufen:

![gotosettings](images/gotosettings.png)

Dann erscheint folgendes kleines Fenster, in dem du zwei Einstellungen treffen kannst:

![settings](images/settings.png)

* "Pop-Up verwenden" bestimmt, ob jedes Mal bei der Verwendung eines Buttons der Extension nach einem neuen regulären Ausdruck gefragt werden soll. Falls aktiviert, erscheint jeweils eine "Prompt", die die "Standardeingabe" enthält und von da veränderbar ist.

* Falls du "Pop-Up verwenden" deaktivierst, werden immer direkt alle die Gruppen rausgefiltert, die den regulären Ausdruck in der "Standardeingabe" enthalten.

* Um deine Änderungen zu übernehmen, drücke schließlich auf "Speichern". Der Button wird kurz grün, wenn das Speichern erfolgreich war.

### Download

Die Extension fügt Seiten mit dem Pfad `/plugins.php/vipsplugin/solutions/assignment_solutions?...` einen Button zum Herunterladen hinzu:

![settings](images/download.png)

Dieser verwendet den eingegebenen regulären Ausdruck, um die Abgaben aller Gruppen, dessen Name ihn enthalten, im Sekundentakt in einzelnen .zip-Dateien herunterzuladen. Ein leerer regulärer Ausdruck lädt entsprechend alle Abgaben herunter, aber in einzelnen .zip-Dateien.

### Navigation

In der Detailansicht einer Aufgabe, also auf Seiten mit dem Pfad `/plugins.php/vipsplugin/solutions/edit_solution?...`, fügt die Extension folgende drei Buttons hinzu:

![settings](images/backward.png) ![settings](images/forward.png)

Diese zwei Buttons springen zur vorherigen bzw. nächsten Gruppe, die den eingegebenen regulären Ausdruck beinhaltet.

![settings](images/selectionmenu.png)

Dieser Button öffnet eine Liste von allen Gruppen, die den regulären Ausdruck enthalten, und lässt durch Klicken auf einen Gruppennamen zu der Detailansicht für die entsprechende Gruppe springen. Falls es bei einem Aufgabenblatt mehrere Aufgaben gibt, kann man zusätzlich die Aufgabe bestimmen, die man öffnen möchte.