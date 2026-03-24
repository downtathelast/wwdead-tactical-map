// ==UserScript==
// @name                WWDead AP Recovery Countdown
// @namespace           wwdead-ap-recovery-Countdown
// @version             1.0.4
// @description         Displays a countdown to full AP recovery for WWDead in HH:MM:SS
// @author              Sean Dwyer
// @contributor         DTTL — rewrite and modernization
// @include             https://wwdead.com/classic*
// @run-at              document-idle
// @grant               none
// @license             GNU General Public License v2 or later; http://www.gnu.org/licenses/gpl.txt
// @downloadURL https://update.greasyfork.org/scripts/567649/WWDead%20AP%20Recovery%20Countdown.user.js
// @updateURL https://update.greasyfork.org/scripts/567649/WWDead%20AP%20Recovery%20Countdown.meta.js
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

/**
 * DISPLAY FORMAT OPTIONS
 * ----------------------
 * By default this script shows hours, minutes, and seconds: "Max AP in 2h 30m 00s"
 * You can customize the display by editing the tick() function below.
 *
 * To show ONLY minutes and seconds (no hours):
 *   Comment out or delete the lines:
 *     var hours = Math.floor(totalSeconds / 3600);
 *     if (hours > 0) { timeStr += hours + 'h '; }
 *   And change the mins line to:
 *     var mins = Math.floor(totalSeconds / 60);
 *   Result: "Max AP in 150m 00s"
 *
 * To show ONLY hours and minutes (no seconds):
 *   Comment out or delete the lines:
 *     var secs = totalSeconds % 60;
 *     (secs < 10 ? '0' : '') + secs + 's'
 *   And change the timeStr line to:
 *     timeStr += mins + 'm';
 *   Result: "Max AP in 2h 30m"
 */

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        var ap = getAP();
        if (ap === null) return;
        var elem = getInfoBox();
        if (!elem) return;
        var minutesToAdd = 30 * (50 - ap);
        if (minutesToAdd <= 0) return;

        var targetMillisec = Date.now() + minutesToAdd * 60000;
        targetMillisec -= (targetMillisec % 1800000);

        var span = document.createElement('span');
        span.style.fontSize = '11px';
        elem.appendChild(span);

        function tick() {
            var remaining = targetMillisec - Date.now();
            if (remaining <= 0) {
                span.textContent = ' Max AP reached!';
                return;
            }
            var totalSeconds = Math.floor(remaining / 1000);
            var hours = Math.floor(totalSeconds / 3600);
            var mins = Math.floor((totalSeconds % 3600) / 60);
            var secs = totalSeconds % 60;
            var timeStr = '';
            if (hours > 0) {
                timeStr += hours + 'h ';
            }
            timeStr += mins + 'm ' + (secs < 10 ? '0' : '') + secs + 's';
            span.textContent = ' Max AP in ' + timeStr;
            setTimeout(tick, 1000);
        }

        tick();
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