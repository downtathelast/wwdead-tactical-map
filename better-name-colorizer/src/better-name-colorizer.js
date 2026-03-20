// ==UserScript==
// @name                WWDead Better Name Colorizer
// @author              Bradley Sattem (a.k.a. Aichon)
// @namespace           http://aichon.com
// @version             1.1.0
// @description         Improves and updates character name colors across WWDead for easier readability
// @author              Bradley Sattem (a.k.a. Aichon)
// @contributor         DTTL — modernization for wwdead
// @include             https://wwdead.com/classic*
// @run-at              document-idle
// @grant               none
// @license             GNU General Public License v2 or later; http://www.gnu.org/licenses/gpl.txt
// ==/UserScript==
 
/*
 * WWDead Better Name Colorizer
 * Original Script:
 *   UD Better Name Colorizer
 *   © 2016 Bradley Sattem
 *
 * Initial Adaptation for World Wide Dead:
 *   © 2026 DTTL
 *   Adapted for WWDead
 *
 * Additional Improvements:
 *   © 2026 xikkub
 *
 * Thanks to the Urban Dead/World Wide Dead scripting community for inspiration.
 *
 * License:
 *   GNU General Public License v2 or later
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * This script is a derivative work of the original
 * Urban Dead userscript and is distributed under
 * the terms of the GPL.
 */
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// DEFINE YOUR COLOR RULES HERE – easy to tweak for personal preference
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function addRules(css) {
 
    // Core name colors
    css.push(".con1 { color: #c6c6c6 !important; font-weight: normal !important; }"); // gray
    css.push(".con2 { color: #eca1a3 !important; font-weight: normal !important; }"); // red
    css.push(".con3 { color: #f4ca79 !important; font-weight: normal !important; }"); // orange
    css.push(".con4 { color: #fef38b !important; font-weight: normal !important; }"); // yellow
    css.push(".con5 { color: #b4de88 !important; font-weight: normal !important; }"); // green
    css.push(".con6 { color: #a6bafa !important; font-weight: normal !important; }"); // blue
    css.push(".con7 { color: #caa6ea !important; font-weight: normal !important; }"); // purple
    css.push(".con8 { color: #303030 !important; font-weight: normal !important; }"); // black
    css.push(".con9 { color: #ffffff !important; font-weight: normal !important; }"); // white
 
    // Links & hover tweaks
    css.push("a { color: #ded !important; }");
    css.push("a:hover { text-decoration: underline !important; }");
    css.push("table.c a { color: #000 !important; }");
    css.push("table.c td.sb a { color: #ded !important; }");
    css.push("a.barricade { color: #232 !important; }");
    css.push("a.barricade:hover, a.barristaButton:hover { text-decoration: none !important; }");
    css.push("a.barristaCharName:hover { text-decoration: underline !important; }");
 
    // Added readability improvement: text shadow on bold character names
    css.push('[class^="con"] b { text-shadow: 2px 2px 3px rgba(0,0,0,0.9) !important; }');
}
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// INTERNAL FUNCTIONS – no need to edit
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function writeRules(css) {
 
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;
 
    const style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
 
    if (style.sheet && style.sheet.insertRule) {
        for (let i = 0; i < css.length; i++) {
            try {
                style.sheet.insertRule(css[i], style.sheet.cssRules.length);
            } catch (e) {}
        }
    }
}
 
// Add and write CSS rules
const cssRulesToAdd = [];
addRules(cssRulesToAdd);
writeRules(cssRulesToAdd);