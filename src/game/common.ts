import { Geolocation } from "@/utilities/Geolocation";

let geolocation: Geolocation = new Geolocation()

export const initiate = async () => {
  geolocation.watch(c => {
    console.log("LAT", c.latitude)
    console.log("LNG", c.longitude)
    console.log("ELE", c.altitude)
    console.log("ACC", c.accuracy)
  });
}

export const quit = async () => {
  await geolocation.removeWatch()
}