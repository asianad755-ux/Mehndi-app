# Mehndi App

A React Native mobile application built with Expo, featuring file-based routing via Expo Router.

## Project Structure

- `mehndi-app/` — Main application directory
  - `app/` — Screens and routing (Expo Router)
    - `(tabs)/` — Tab-based navigation screens
    - `_layout.tsx` — Root layout
  - `components/` — Reusable UI components
  - `assets/` — Images and fonts
  - `constants/` — App constants (theme, colors)
  - `hooks/` — Custom React hooks
  - `app.json` — Expo configuration

## Tech Stack

- **Framework:** React Native with Expo SDK 54
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based routing)
- **Package Manager:** npm

## Development

The app runs in web mode via Expo on port 5000.

**Workflow:** `Start application`
**Command:** `cd mehndi-app && npx expo start --web --port 5000`

Users can also scan the QR code from the Replit URL bar menu to test on a physical device via Expo Go.

## Deployment

Configured as a static site deployment:
- **Build:** `cd mehndi-app && npx expo export --platform web`
- **Public Dir:** `mehndi-app/dist`
