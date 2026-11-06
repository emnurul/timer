# Game Preset Timer (React + Vite)

## Run locally
1. Install Node.js (18+ recommended).
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.

## Edit game presets
Open `src/games.json`. Each game supports:
- `id`: unique identifier
- `name`: label in the sidebar and title
- `description`: landing-page copy
- `backgroundImage`: image URL (or leave blank)
- `timeSeconds`: timer length in seconds

Example: `timeSeconds: 600` means 10 minutes. Save the JSON and restart/reload the app.
