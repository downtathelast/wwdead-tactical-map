// ==UserScript==
// @name         WWDead Map Links
// @description  Creates links next to the suburb's name to wiki's and DSS' maps on WWDead.
// @namespace    wwd-map-links
// @version      1.0.0
// @match        https://wwdead.com/classic*
// @exclude		 https://wwdead.com/classic/skills*
// @exclude		 https://wwdead.com/classic/contacts*
// @exclude		 https://wwdead.com/classic/settings*
// @exclude		 https://wwdead.com/classic/logout*
// @exclude		 https://wwdead.com/classic/FAQ*
// @exclude		 https://wwdead.com/classic/profile*
// @exclude		 https://wwdead.com/classic/login*
// @exclude		 https://wwdead.com/classic/characters
// @grant        none
// @license      GNU General Public License v2 or later; http://www.gnu.org/licenses/gpl.txt
// ==/UserScript==

/**
 * Original version by http://wiki.urbandead.com/index.php/User:Aichon
 * 
 * Rewrite for WWDead by DTTL (2026)
 * 
 * License:
 * GNU General Public License v2 or later
 * http://www.gnu.org/licenses/gpl.txt
 */

function insertMaps() {
    // Try to find the suburb name container
    let subName = document.querySelector('div.location > h2, div.cp h2'); // adjust to actual WWDead DOM
    if (!subName) return;

    let suburb = subName.textContent.trim();

    // Remove bracketed info if present
    let bracketPos = suburb.indexOf("[");
    if (bracketPos > 0) suburb = suburb.substr(0, bracketPos).trim();

    // Replace spaces for URL formatting
    suburb = suburb.replace(/ /g, "_");

    // Create the container for map links
    let mapLinks = document.createElement('small');
    mapLinks.textContent = ' (';

    // Wiki link
    let wikiMapLink = document.createElement('a');
    wikiMapLink.textContent = 'wiki';
    wikiMapLink.href = 'http://wiki.urbandead.com/index.php/' + suburb + '#Suburb_Map';
    wikiMapLink.style.color = '#faa';
    wikiMapLink.target = '_blank';
    mapLinks.appendChild(wikiMapLink);

    // DSS Map link (via Archive)
    let DSSMapLink = document.createElement('a');
    DSSMapLink.textContent = 'DSS';
    DSSMapLink.href = 'https://web.archive.org/web/20160613225203/http://map.dssrzs.org/' + suburb;
    DSSMapLink.style.color = '#faa';
    DSSMapLink.target = '_blank';
    mapLinks.appendChild(document.createTextNode(', '));
    mapLinks.appendChild(DSSMapLink);

    mapLinks.appendChild(document.createTextNode(')'));

    // Append after the suburb name
    subName.appendChild(mapLinks);
}

// Run on page load
insertMaps();