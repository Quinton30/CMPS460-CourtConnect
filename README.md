# CourtConnect

**Student:** Quinton Alexandre  
**Course:** CMPS 460 Mobile Application Development  
**Assignment:** Module 4 Homework - Build Your Own Multi-Screen Application

## Application Description

CourtConnect is a multi-screen React Native basketball court guide. The application lets users browse five sample basketball locations, compare basic information, and select a court to open a detailed view. It was designed to demonstrate React Navigation, native stack navigation, TypeScript navigation types, touchable navigation elements, and navigation parameters.

## Screens

1. **Home Screen** - Displays the application title, introduction, and buttons that navigate to the court list and About screen.
2. **List Screen** - Displays five basketball courts. Each item includes the court name, neighborhood, surface, and court type.
3. **Details Screen** - Displays information about the selected court. The complete court object is passed to this screen through navigation parameters.
4. **About Screen** - Displays Quinton Alexandre's name, an application description, and the application's purpose.

## Technical Requirements Met

- React Native with TypeScript
- React Navigation with Native Stack Navigation
- Four screens: Home, Courts, Details, and About
- Pressable components for navigation
- Five list items containing multiple pieces of information
- Selected court data passed to the Details screen through navigation parameters
- StyleSheet styling with colors, spacing, typography, borders, and rounded corners
- Scrollable screens for smaller Android devices

## Required Packages

Install the stable React Navigation packages and their React Native dependencies:

```text
npm.cmd install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

## Windows Setup Instructions

### 1. Create the React Native project

Open a Command Prompt or the VS Code terminal and enter each command separately:

```text
cd C:\RN
```

```text
npx.cmd @react-native-community/cli@latest init CourtConnect
```

```text
cd CourtConnect
```

### 2. Install React Navigation

```text
npm.cmd install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

### 3. Replace App.tsx

Copy the `App.tsx` file from this package into:

```text
C:\RN\CourtConnect\App.tsx
```

Choose **Replace the file in the destination** if Windows asks.

### 4. Open the project in Visual Studio Code

```text
code C:\RN\CourtConnect
```

### 5. Run the application

Start the Android Emulator first. Close any older Metro terminal that is using port 8081, and then run:

```text
cd C:\RN\CourtConnect
```

```text
npm.cmd run android
```

Keep the Metro terminal open while using the application.

## Testing and Screenshot Checklist

1. Take a screenshot of the Home screen before pressing any buttons.
2. Press **Browse Courts** and take a screenshot showing the Court List screen.
3. Select **Sunset Hoops Center** and take a screenshot of its Details screen.
4. Return to Home, press **About CourtConnect**, and take a screenshot of the About screen.
5. Verify that Android's Back button returns to the previous screen without an error.

## GitHub Submission

After testing, create a public GitHub repository named `CMPS460-CourtConnect`, commit the complete React Native project, and submit its URL with the four screenshots and the written explanation.

## Note

The court names and details are sample information created for this class project.
