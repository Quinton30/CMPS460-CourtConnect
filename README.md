# CourtConnect - External API Integration

**Student:** Quinton Alexandre  
**Course:** CMPS 460 Mobile Application Development  
**Assignment:** Integrate an External API

## Application Overview

CourtConnect is a multi-screen React Native basketball court application. The API-powered Court Weather screen adds a seven-day Brooklyn forecast so users can decide which days are suitable for outdoor basketball. This screen is integrated into the existing semester application through React Navigation.

## API Selection

**API:** Open-Meteo Weather Forecast API  
**Authentication:** No API key is required for this educational, non-commercial project.  
**Request method:** GET

**Endpoint:**

```text
https://api.open-meteo.com/v1/forecast?latitude=40.6782&longitude=-73.9442&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=America%2FNew_York
```

The endpoint returns JSON forecast information for the Brooklyn coordinates used by CourtConnect. The application converts the daily arrays into typed `WeatherDay` records.

Each displayed record contains:

- Forecast date
- Weather condition derived from the WMO weather code
- Maximum temperature in Fahrenheit
- Minimum temperature in Fahrenheit
- Maximum precipitation probability

This data supports CourtConnect by helping basketball players plan when to visit an outdoor court.

## Technical Design

- `fetch()` sends the external API request.
- `async/await` handles the asynchronous response.
- `WeatherApiResponse` describes the JSON returned by Open-Meteo.
- `WeatherDay` describes each record stored in React state.
- `useState<WeatherDay[]>` maintains the typed forecast collection.
- `FlatList` displays the seven-day forecast.
- A loading screen appears while the request is in progress.
- An error screen appears when the request fails.
- A Retry button repeats the valid request after an error.
- An empty-state card appears if the response contains no daily records.
- The Test Error State button requests an intentionally invalid Open-Meteo path so the required error and recovery behavior can be demonstrated reliably.

## Setup Instructions

This version continues the existing CourtConnect React Native project. No additional npm package is needed because `fetch()` is built into React Native.

1. Copy the new `App.tsx` into:

```text
C:\RN\CourtConnect
```

2. Replace the existing `App.tsx` when Windows asks.
3. Copy this `README.md` into the same folder.
4. Open `C:\RN\CourtConnect` in Visual Studio Code.
5. Start the Android Emulator.
6. Open a PowerShell terminal in Visual Studio Code.

If the Java environment variables are not available in the new terminal, run:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
```

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

```powershell
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:Path"
```

7. Run the Android application:

```powershell
npm.cmd run android -- --port 8082
```

## Test Steps

### Successful response

1. Open CourtConnect.
2. Scroll down on the Home screen.
3. Press **View Court Weather**.
4. Wait for the loading state to finish.
5. Confirm that seven forecast cards appear.
6. Confirm that every card shows a date, condition, high temperature, low temperature, and rain chance.
7. Take the successful API response screenshot.

### Error and recovery

1. On the Court Weather screen, press **Test Error State**.
2. Confirm that the Weather Unavailable screen appears.
3. Take the required error-state screenshot while the Retry button is visible.
4. Press **Retry**.
5. Confirm that the valid forecast list appears again.

### Empty state

The `ListEmptyComponent` displays **No forecast records found** if a successful response contains no daily forecast records.

## Design Decisions

Weather was selected because it has a direct purpose within a basketball court application. A seven-day list is easier to understand than raw JSON and helps users compare several possible playing days. The screen uses the same blue, orange, and teal design as the rest of CourtConnect so the API feature feels like part of the existing application. The Retry and Test Error State controls make request recovery clear and allow the error requirement to be tested without waiting for an accidental network outage.

## Screenshot Checklist

1. Successful Court Weather screen with forecast records.
2. Weather Unavailable screen with the Retry button visible.
3. Optional recovery screenshot after pressing Retry.

## GitHub Submission

After testing, run each command separately inside `C:\RN\CourtConnect`:

```powershell
git add .
```

```powershell
git commit -m "Integrate Open-Meteo API into CourtConnect"
```

```powershell
git push
```

Submit the accessible CourtConnect GitHub repository URL, README, and screenshots through the LMS. Do not upload `node_modules`, private credentials, or generated Android build folders separately.

## Attribution

Weather forecast data is provided by Open-Meteo under its published data-use terms.
