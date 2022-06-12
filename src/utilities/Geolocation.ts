
// https://github.com/capacitor-community/background-geolocation

import { Capacitor, registerPlugin } from "@capacitor/core";

import type { BackgroundGeolocationPlugin, Location } from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

class Geolocation {
  ID: string|null;

  constructor(){
    this.ID = null;
  }

  async watch(callback: (coordinates: Location) => void): Promise<void>{
    return await watchPosition(this, callback);
  }

  async removeWatch(): Promise<void> {
    if(this.ID){
      return BackgroundGeolocation.removeWatcher({
        id: this.ID
      });
    }
  }
}

const watchPosition = async (geolocation: Geolocation, callback: (coordinates: Location) => void) : Promise<void> => {
  if(!Capacitor.isNativePlatform()){
    console.log("App not running native. Cannot get position.")
    geolocation.ID = null;
  }
  else geolocation.ID = await BackgroundGeolocation.addWatcher(
    // SETTINGS
    {
      backgroundMessage: "Cancel to prevent battery drain.",
      backgroundTitle: "Tracking You.",
      requestPermissions: true,
      stale: false,
      distanceFilter: 0
    },
    // CALLBACK
    (location?: Location, error?) => {
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

      if(location) callback(location)
    }
  )
};

export { Geolocation }