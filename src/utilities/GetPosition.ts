import { Capacitor, registerPlugin } from "@capacitor/core";

import type { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

// import { writePositionData } from './firebase'

// https://github.com/capacitor-community/background-geolocation

console.log("GETTING LOCATION ???")

const printCurrentPosition = async () : Promise<string|null> => {
  if(!Capacitor.isNativePlatform()){
    console.log("App not running native. Cannot get position.")
    return null;
  }
  else {
    console.log("NATIVE YAY LOL")
  }
  return BackgroundGeolocation.addWatcher(
      // SETTINGS
    {
      backgroundMessage: "Cancel to prevent battery drain.",
      backgroundTitle: "Tracking You.",
      requestPermissions: true,
      stale: false,
      distanceFilter: 0
    },
      // CALLBACK
    (location, error) => {
      if (error) {
        if (error.code === "NOT_AUTHORIZED") {
          if (window.confirm(
            "This app needs your location, " +
            "but does not have permission.\n\n" +
            "Open settings now?"
          )) {
            BackgroundGeolocation.openSettings();
          }
        }
        console.error("LOL IT FAILED MASSIVELY")
        return console.error(error);
      }

      // const position = {
      //     lat: location.latitude,
      //     lng: location.longitude,
      //     z: location.altitude
      // }

      // writePositionData(location.time, position, location.accuracy)

      console.log("Got location!", location);
    }
  )
};

// .then(watcher_id => {
//     BackgroundGeolocation.removeWatcher({
//         id: watcher_id
//     });
// });


export { printCurrentPosition }