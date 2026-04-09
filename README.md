# WWDEAD Tactical Map

A **browser-based userscript** that enhances map visibility and tracking in **WWDEAD** . It allows you to monitor multiple character “alts” and visualize their positions in real-time across city, suburb, and local maps.

## Features

- **Multi-alt tracking**: Track multiple characters and save their current coordinates.
- **Dynamic map highlights**: Alt positions are displayed and updated in real time on collapsible city, suburb, and local maps.
- **Persistent storage**: Saves character data to `localStorage` and automatically cleans up old entries (older than 7 days).
- **Alt limits**: Prevents storage overflow by enforcing a maximum number of tracked alts.
- **Collapsible UI**: Expand or collapse city, suburb, and local maps for a clean interface.

## Installation

1. Install a userscript manager such as [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. Create a new userscript and paste the code from this repository.
3. Open **WWDEAD** in your browser. The script will automatically start tracking alts and updating the map.

## Usage

- The script automatically saves your current character position whenever you move.
- Alt positions will appear highlighted on the city map.
- Old alt data is automatically removed, and limits are enforced to keep storage clean.
- Use the collapsible map UI to focus on specific areas (city, suburb, or local).

## Configuration

- **STORAGE_KEY**: Key used in `localStorage` for saving alt data.
- **MAX_AGE**: Maximum age (in milliseconds) before an alt is considered old and cleaned up.
- **MAX_ALTS**: Maximum number of alts to store.

You can tweak these values directly in the script to suit your preferences.

## Contributing

Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

## License

[MIT License](LICENSE)
