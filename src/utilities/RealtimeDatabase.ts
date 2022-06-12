
import { ref, set } from "firebase/database";

import { db } from "./Firebase";

export const WriteUserData = () => {
  set(ref(db, 'user'), {
    hello: "world",
  });
}