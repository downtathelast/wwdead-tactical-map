# Tactical Map - WWDead Plugin

A personal fork of **DTTL**'s [Tactical Map Greasemonkey Plugin](https://greasyfork.org/en/scripts/567867-wwdead-tactical-map-v2-0) for [WWDead.com](https://wwdead.com) with some minor fixes.

## [⚡ Install Tactical Map (v2.0.0-xun.1)](https://github.com/xunoaib/wwdead_tacticalmap/raw/refs/heads/main/TacticalMap.user.js)

You can [compare the full code diff here](https://github.com/xunoaib/wwdead_tacticalmap/compare/upstream-2.0...main) to see exactly what has been modified from the original source.

You may have to click the `Files changed` tab to see the actual content.

> Tested with Greasemonkey 4.13 on Firefox.

## Changelog

### [v2.0.0-xun.1]

- Show GPS coordinates for other map locations on hover.
- Added local storage support to remember the collapsed/expanded state of the map.
- Use fixed cell size to prevent grid from shifting
- Fix issue where hovered suburb location text would reset itself.
- Implemented "hidden" state until initialization is complete to prevent layout popping/flicker.
- Simplify `@match` rules to specifically target the main "map" URL.
- Ran `npx prettier` to improve readability of source code.
