// ==UserScript==
// @name                WWDead Better Name Colorizer
// @author              Bradley Sattem (a.k.a. Aichon)
// @namespace           http://aichon.com
// @version             1.2.5
// @description         Improves and updates character name colors across WWDead for easier readability
// @contributor         DTTL — modernization for wwdead
// @contributor         xikkub — readability improvements
// @include             https://wwdead.com/classic*
// @run-at              document-idle
// @grant               none
// @license             GNU General Public License v2 or later
// @changelog
// v1.1.0 — Original WWDead adaptation, basic colors and text-shadow
// v1.2.2 — Added safe text-shadow (xikkub) and scoped links, preserved .con# colors
// v1.2.3 — Safe visited link styling added without breaking names
// v1.2.4 — Added detailed customization instructions
// v1.2.5 — Added quick color cheat sheet, cleaned up CSS, improved readability
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
 * 
 * 
 */
 

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// DEFINE YOUR COLOR RULES HERE – EASY TO CUSTOMIZE
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function addRules(css) {

    // ======================================================
    // CORE NAME COLORS
    // ======================================================
    css.push(".con1 { color: #c6c6c6 !important; font-weight: normal !important; }"); // gray
    css.push(".con2 { color: #eca1a3 !important; font-weight: normal !important; }"); // red
    css.push(".con3 { color: #f4ca79 !important; font-weight: normal !important; }"); // orange
    css.push(".con4 { color: #fef38b !important; font-weight: normal !important; }"); // yellow
    css.push(".con5 { color: #b4de88 !important; font-weight: normal !important; }"); // green
    css.push(".con6 { color: #a6bafa !important; font-weight: normal !important; }"); // blue
    css.push(".con7 { color: #caa6ea !important; font-weight: normal !important; }"); // purple
    css.push(".con8 { color: #303030 !important; font-weight: normal !important; }"); // black
    css.push(".con9 { color: #ffffff !important; font-weight: normal !important; }"); // white

    // ======================================================
    // CUSTOMIZATION NOTES
    // ======================================================
    // For those wanting to tweak colors:
    // 1. Find the .con# line you want to change
    // 2. Replace the hex code (e.g., "#eca1a3") with your preferred color
    //    Use online color pickers, Discord, Photoshop, or any hex color tool
    //
    // Example: I wanted a darker red so I switched .con2 to "#ac2525"
    //
    // ======================================================
    // QUICK COLOR CHEAT SHEET
    // ======================================================
    // Gray   : #808080
    // Red    : #ff5555
    // Orange : #ff9900
    // Yellow : #ffff55
    // Green  : #55ff55
    // Blue   : #5555ff
    // Purple : #aa55ff
    // Black  : #000000
    // White  : #ffffff
    //
    // Simply copy the hex code and paste it into the color field above.

    // ======================================================
    // TEXT SHADOW FOR READABILITY
    // ======================================================
    css.push('[class^="con"] b { text-shadow: 2px 2px 3px rgba(0,0,0,0.9) !important; }');

    // ======================================================
    // SCOPED LINK STYLING
    // ======================================================
    css.push("td.gp a { color: #ded; }"); // safe default link color
    css.push("td.gp a:hover { text-decoration: underline !important; }");
    css.push("td.gp table.c a:not([class^='con']) { color: #000 !important; }"); // do not override player names
    css.push("td.gp table.c td.sb a { color: #ded !important; }");
    css.push("td.gp a.barricade { color: #232 !important; }");
    css.push("td.gp a.barricade:hover, td.gp a.barristaButton:hover { text-decoration: none !important; }");
    css.push("td.gp a.barristaCharName:hover { text-decoration: underline !important; }");

    // ======================================================
    // SAFE VISITED LINK STYLING
    // ======================================================
    css.push("td.gp table.c a:visited:not([class^='con']) { color: #444 !important; }");
}

// Darken the nameplate text of players whose profiles have been visited.
function clarifyNamePlates() {
  if (document.getElementById('clarify-styles')) return;

  const style = document.createElement('style');
  style.id = 'clarify-styles';

  style.textContent = `
    html body table.c a:visited,
    html body table.c a:visited span {
      color: #444444 !important;
      background-color: transparent !important;
    }
  `;

  document.documentElement.appendChild(style);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// INTERNAL FUNCTIONS
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// INIT
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const cssRulesToAdd = [];
addRules(cssRulesToAdd);
writeRules(cssRulesToAdd);
clarifyNamePlates();
