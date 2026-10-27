# Wear Again

A mobile app for selling, exchanging and donating clothes.

Built with React Native, Expo SDK 57, TypeScript and Expo Router.

Mobile Application Development coursework project.

## Run the app

Install Node.js with npm, then install the locked dependencies:

```sh
npm ci
npx expo start --go
```

Open the project with an Expo Go version compatible with SDK 57. For the web
prototype, use `npm run web`. Android and iOS launch commands are available as
`npm run android` and `npm run ios` when the relevant emulator or simulator is
installed. The iOS simulator requires macOS.

```sh
npm run typecheck
```

## Screens

The prototype has 12 navigable screens:

| Screen | Route |
| --- | --- |
| Browse | `/` |
| Search and filters | `/search` |
| Item details | `/items/[id]` |
| Create listing | `/create` |
| My listings | `/my-listings` |
| Edit listing | `/listings/[id]/edit` |
| Profile | `/profile` |
| Edit profile | `/edit-profile` |
| My completed listings | `/completed-listings` |
| My requests | `/requests` |
| Incoming requests | `/incoming-requests` |
| Request details | `/requests/[id]` |

## Architecture

Expo Router files in `src/app` connect routes to the feature screens in
`src/features`. The root stack contains the detail and edit screens, and the
main tab navigator contains Browse, Create, My listings, Requests and Profile.
Shared form controls live in `src/components/ui`.

`src/data` defines the user, listing and request types and sample data.
`src/state/app-context.tsx` provides shared state and actions with React Context
and functional `useState` updates. Screens read the context and call its actions;
ownership checks, listing validation and request decisions stay in the context.
This keeps the prototype small and lets all screens react to the same updates.

## Prototype data

Use the demo user switcher to act as Mariam, Omar or Nour. For example, Omar can
send a purchase request for Mariam's Linen shirt. Switch to Mariam, open Requests
and then Incoming requests, and accept or reject it. Accepting reserves the item.
In My listings, the owner can complete a reserved item or make it available again.
Releasing a reservation returns its accepted request to pending.

Listing changes, requests and profile edits are kept in memory and reset when the
app reloads. Listing photos are selected from the bundled samples; avatars use
initials. This Phase 1 UI prototype does not implement authentication, persistent
storage, payments, delivery or chat.

Repository: https://github.com/george9999cpu/WA
