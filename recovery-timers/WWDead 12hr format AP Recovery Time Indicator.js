// ==UserScript==
// @name                WWDead AP Recovery Time Indicator 12hr format
// @namespace           wwdead-ap-time-indicator
// @version             1.0.3
// @description         Displays the approximate amount of time required to recover full AP in WWDead
// @author              Sean Dwyer
// @contributor         DTTL — rewrite and modernization
// @credit              Inspired by earlier Urban Dead userscript by Sean Dwyer
// @match               https://wwdead.com/classic*
// @grant               none
// @license             GNU General Public License v2 or later; http://www.gnu.org/licenses/gpl.txt
// @downloadURL https://update.greasyfork.org/scripts/567542/WWDead%20AP%20Recovery%20Time%20Indicator%2012hr%20format.user.js
// @updateURL https://update.greasyfork.org/scripts/567542/WWDead%20AP%20Recovery%20Time%20Indicator%2012hr%20format.meta.js
// ==/UserScript==

/**
 * Original Script:
 *   UrbanDead AP Recovery Time Indicator
 *   © 2006 Sean Dwyer <sean DOT dwyer AT gmail DOT com>
 *
 * Adaptation:
 *   © 2026 DTTL
 *   Adapted for WWDead
 *
 * License:
 *   GNU General Public License v2 or later
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * This script is a derivative work of the original
 * Urban Dead userscript and is distributed under
 * the terms of the GPL.
 */
(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showRecoveryTime);
    } else {
        showRecoveryTime();
    }

    function showRecoveryTime() {
        var ap = getAP();
        if (ap === null) return;
        var elem = getInfoBox();
        if (!elem) return;
        var minutesToAdd = 30 * (50 - ap);
        if (minutesToAdd <= 0) return;
        var targetDate = new Date();
        var targetMillisec = targetDate.getTime() + minutesToAdd * 60000;
        targetMillisec -= (targetMillisec % 1800000);
        targetDate.setTime(targetMillisec);
        var hours = targetDate.getHours();
        var minutes = targetDate.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        var timeStr = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;
        var maxMessage = " <span style='font-size:11px;'>Max AP";
        var nowMinutes = (new Date()).getHours() * 60 + (new Date()).getMinutes();
        var targetMinutes = nowMinutes + minutesToAdd;
        if (targetMinutes >= 2880) {
            maxMessage += " on " + targetDate.toLocaleDateString();
        } else if (targetMinutes >= 1440) {
            maxMessage += " tomorrow";
        }
        maxMessage += " at " + timeStr + ".</span>";
        elem.innerHTML += maxMessage;
    }

    function getAP() {
        var re = /You have\s*(-?\d+)\s*Action Points?/i;
        var match = document.body.textContent.match(re);
        return match ? parseInt(match[1], 10) : null;
    }

    function getInfoBox() {
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].className === 'gt') {
                return divs[i];
            }
        }
        return null;
    }
})();