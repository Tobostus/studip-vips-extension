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

async function triggerDownload(url, filename) {
    try {
        await browser.downloads.download({
            url: url,
            filename: filename,
            saveAs: false
        });
    } catch(error) {
        throw error;
    }
}

browser.runtime.onMessage.addListener(async request => {
    if(request.action === "download") {
        try {
            await triggerDownload(request.url, request.filename)
            return true;
        } catch(error) {
            return { error: error };
        }
    }
});
