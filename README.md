# Tactical Map - WWDead Plugin

A personal fork of **DTTL**'s [Tactical Map Greasemonkey Plugin](https://greasyfork.org/en/scripts/567867-wwdead-tactical-map-v2-0) for [WWDead.com](https://www.wwdead.com) with some minor fixes.

## [⚡ Install Tactical Map (v2.0-xun.1)](https://github.com/xunoaib/wwdead_tacticalmap/raw/refs/heads/main/TacticalMap.user.js)

You can [compare the full code diff here](https://github.com/xunoaib/wwdead_tacticalmap/compare/upstream-2.0...main) to see exactly what has been modified from the original source.

> Tested with Greasemonkey 4.13 on Firefox.

## Key Improvements (v2.0-xun.1)

- Fix issue where hovered suburb location text would reset itself.
- Added local storage support to remember the collapsed/expanded state of the map.
- Implemented "hidden" state until initialization is complete to prevent layout popping/flicker.
- Simplify `@match` rules to target the main "map" URL specifically.
- Ran `npx prettitier` to improve readiability of source code.
