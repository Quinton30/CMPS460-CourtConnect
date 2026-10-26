# CourtConnect - Module 5

**Student:** Quinton Alexandre  
**Course:** CMPS 460 Mobile Application Development  
**Assignment:** Module 5 Homework - Add Data & Persistent Storage

## Application Description

CourtConnect is a multi-screen React Native basketball court guide. The Module 5 version adds a personal saved-court collection. Users can view the collection in a FlatList, enter a new court through a validated form, delete an existing court, and return later to find their data still saved on the device.

## Module 5 Data Model

Each saved court follows the `SavedCourt` TypeScript interface and contains:

- `id` - a unique identifier
- `name` - the court name
- `neighborhood` - the court location
- `surface` - the type of playing surface

## Module 5 Requirements Met

- TypeScript `SavedCourt` interface with four properties and a unique id
- Collection stored as an array of TypeScript objects with `useState`
- Collection displayed with `FlatList`
- Court name, neighborhood, and surface displayed for every item
- Add Court screen with three `TextInput` fields
- Required-field validation and a visible error message
- Delete button for every saved court
- Empty-state message when the collection has no items
- AsyncStorage loading when the app starts
- AsyncStorage saving whenever the collection changes
- `JSON.parse()` used while loading and `JSON.stringify()` used while saving
- React Navigation integrated with the original multi-screen application
- StyleSheet styling

## Required Packages

From the CourtConnect project folder, install AsyncStorage:

```text
npm.cmd install @react-native-async-storage/async-storage
```

The Module 4 navigation packages must also remain installed:

```text
npm.cmd install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

## How to Use These Files

1. Copy this `App.tsx` into `C:\RN\CourtConnect`.
2. Choose **Replace the file in the destination** if Windows asks.
3. Copy this `README.md` into the same folder and replace the older version.
4. Open `C:\RN\CourtConnect` in Visual Studio Code.
5. Open a terminal in VS Code.
6. Install AsyncStorage using the command above.
7. Start the Android Emulator.
8. Run the application:

```text
npm.cmd run android
```

## Testing Checklist

1. Open **Saved Courts** and confirm that three starter courts appear.
2. Open **Add a Court**, leave a field blank, and press **Save Court** to confirm validation appears.
3. Complete all three fields and press **Save Court**.
4. Confirm that the new court appears in the list.
5. Close and reopen the application and confirm the new court is still present.
6. Delete one court and confirm it disappears.

## Screenshot Checklist

1. Take one screenshot of **My Saved Courts** showing the list.
2. Take one screenshot of the **Add a Court** form.
3. Add your own fourth court, return to **My Saved Courts**, and take a screenshot showing at least three stored items.

## GitHub Commands

Run each command separately inside `C:\RN\CourtConnect`:

```text
git add .
```

```text
git commit -m "Complete CMPS 460 Module 5 persistent storage"
```

```text
git push
```

## Submission Paragraph

CourtConnect stores a personal collection of basketball courts. Each saved court includes a unique identifier, court name, neighborhood, and playing surface. I selected this information because it gives basketball players the most useful details needed to recognize and compare locations. AsyncStorage saves the court array as a JSON string whenever the collection changes, and the application loads and parses that saved information when it starts. This allows added courts and deletions to remain after the application is closed and reopened.
