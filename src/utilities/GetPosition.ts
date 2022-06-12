import { registerPlugin } from "@capacitor/core";

import type { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

// import { writePositionData } from './firebase'

// https://github.com/capacitor-community/background-geolocation

const printCurrentPosition = async () => {
    BackgroundGeolocation.addWatcher(
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
                return console.error(error);
            }

            // const position = {
            //     lat: location.latitude,
            //     lng: location.longitude,
            //     z: location.altitude
            // }

            // writePositionData(location.time, position, location.accuracy)
    
            console.log("Write location", location);
        }
    )
};

// .then(watcher_id => {
//     BackgroundGeolocation.removeWatcher({
//         id: watcher_id
//     });
// });


export { printCurrentPosition }