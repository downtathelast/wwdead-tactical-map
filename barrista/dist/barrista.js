// ==UserScript==
// @name         WWDead Barrista
// @namespace    wwd-barrista
// @version      1.0.0
// @author       DTTL
// @description  Barrista top bar with stacked HP/AP, XP, AP recovery time, classic layout
// @include      /^https:\/\/wwdead\.com\/classic\/?(\?.*)?$/
// @grant        GM.setValue
// @grant        GM.getValue
// @license      GNU General Public License v2 or later; http://www.gnu.org/licenses/gpl.txt
// ==/UserScript==

(function() {
    'use strict';

    const barSize = 163;

    // --- Grab character info ---
    function getCharacter() {
        const gtDiv = document.querySelector('div.gt');
        const nameLink = gtDiv?.querySelector('a[href*="/classic/profile"] b');
        const hrefLink = gtDiv?.querySelector('a[href*="/classic/profile"]');
        const name = nameLink ? nameLink.textContent.trim() : 'Character';
        const href = hrefLink ? hrefLink.href : '#';
        return {name, href};
    }

    // --- Grab stats ---
    function getStats() {
        const gtDiv = document.querySelector('div.gt');
        if(!gtDiv) return {hp:0,maxHp:60,ap:0,maxAp:50,xp:0,infected:false};

        const allB = Array.from(gtDiv.querySelectorAll('b'));
        const hp = parseInt(allB[1]?.textContent) || 0;
        const xp = parseInt(allB[2]?.textContent) || 0;
        const ap = parseInt(gtDiv.querySelector('span.apw b')?.textContent) || 0;

        return {hp,maxHp:60,ap,maxAp:50,xp,infected:false};
    }

    // --- AP recovery time 12hr format ---
    function getAPRecoveryTime(apVal, maxAP) {
        if(apVal >= maxAP) return 'Full AP';
        const minutesPerAP = 30;
        let minutesToAdd = minutesPerAP * (maxAP - apVal);
        const targetDate = new Date(Date.now() + minutesToAdd*60000);
        // Round to nearest half-hour
        const remainder = targetDate.getMinutes() % 30;
        targetDate.setMinutes(targetDate.getMinutes() - remainder + (remainder>=15?30:0));
        let hours = targetDate.getHours();
        const minutes = targetDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes.toString().padStart(2,'0')} ${ampm}`;
    }

    // --- Color interpolation helper ---
    function interpolateColor(val,minVal,r1,g1,b1,r2,g2,b2) {
        const pct = Math.min(Math.max((val-minVal)/(val?val:1),0),1);
        const r = Math.round(r1 + (r2-r1)*pct);
        const g = Math.round(g1 + (g2-g1)*pct);
        const b = Math.round(b1 + (b2-b1)*pct);
        return `rgb(${r},${g},${b})`;
    }

    // --- Build Barrista ---
    function createBarrista() {
        const {name, href} = getCharacter();
        const {hp,maxHp,ap,maxAp,xp,infected} = getStats();

        const newMenu = document.createElement('div');
        newMenu.id = "barrista";
        newMenu.style.cssText = 'margin:0 1px; width:100%; height:43px; position:fixed; top:0; left:0; z-index:9999;';

        const topBar = document.createElement('div');
        topBar.style.cssText = 'height:28px; width:100%; border-bottom:1px solid #454; background:#232;';

        const botBar = document.createElement('div');
        botBar.style.cssText = 'height:15px; width:100%;';

        const characterBox = document.createElement('div');
        characterBox.style.cssText = 'margin:0 2px; height:25px; float:left;';

        // --- Character info div ---
        const charInfo = document.createElement('div');
        charInfo.id = "barristacharinfo";
        charInfo.style.cssText = 'margin:0; height:27px; float:left; text-align:right; overflow:hidden; padding:1px 5px 0 5px; font-size:.7em; font-weight:bold;';

        const charLink = document.createElement('a');
        charLink.href = href;
        charLink.className = 'barristaCharName';
        charLink.innerHTML = name + '<br />';
        charInfo.appendChild(charLink);

        // XP and AP recovery
        const apRecoveryXP = document.createElement('p');
        apRecoveryXP.style.cssText = 'margin:0;';
        apRecoveryXP.innerHTML = getAPRecoveryTime(ap,maxAp) + ' | ';
        const xpLink = document.createElement('a');
        xpLink.href = 'skills.cgi';
        if(xp >= 1000) {
            const exact = Math.round(xp/1000)==xp/1000;
            xpLink.innerHTML = (exact?'':'~') + Math.floor(xp/100)/10 + 'K XP';
        } else xpLink.innerHTML = xp+' XP';
        apRecoveryXP.appendChild(xpLink);
        charInfo.appendChild(apRecoveryXP);

        // --- Bars ---
        const bars = document.createElement('div');
        bars.id="barristabar";
        bars.style.cssText = 'margin:0; height:25px; float:left;';

        // HP Bar
        const hpBox = document.createElement('div');
        hpBox.style.cssText = `margin:0; height:100%; width:24px; float:left; color:${infected?'#0f0':'#fff'}; font-size:9px; text-align:right; padding-right:3px; border-right:#fff solid 1px; background:#454;`;
        hpBox.textContent = hp+' HP';

        const hpBar = document.createElement('div');
        hpBar.style.cssText = `margin:0; height:10px; width:${barSize+28}px; border:1px solid ${infected?'#0f0':'#bcb'}; float:left; background:#454; clear:left; position:relative; top:2px;`;
        const hpFill = document.createElement('div');
        let hpColor = '#898';
        if(hp <=30) hpColor='#f00';
        hpFill.style.cssText = `margin:0; height:100%; width:${hp/barSize*barSize}px; position:relative; float:left; background:${hpColor};`;
        hpBar.appendChild(hpBox);
        hpBar.appendChild(hpFill);

        // AP Bar
        const apBox = document.createElement('div');
        apBox.style.cssText = 'margin:0; height:100%; width:24px; float:left; color:#fff; font-size:9px; text-align:right; padding-right:3px; border-right:#fff solid 1px; background:#454;';
        apBox.textContent = ap+' AP';

        const apBar = document.createElement('div');
        apBar.style.cssText = `margin:0; height:10px; width:${barSize+28}px; border:1px solid #bcb; float:left; background:#454; position:relative; top:1px;`;
        const apFill = document.createElement('div');
        let apColor = ap>20?'#345':ap>=10?interpolateColor(ap,10,171,68,85,255,0,0):'#f00';
        apFill.style.cssText = `margin:0; height:100%; width:${ap/barSize*barSize}px; float:left; background:${apColor};`;
        apBar.appendChild(apBox);
        apBar.appendChild(apFill);

        bars.appendChild(apBar);
        bars.appendChild(hpBar);

        characterBox.appendChild(charInfo);
        characterBox.appendChild(bars);

        topBar.appendChild(characterBox);
        newMenu.appendChild(topBar);
        newMenu.appendChild(botBar);

        document.body.insertBefore(newMenu, document.body.firstChild);
    }

    createBarrista();

})();