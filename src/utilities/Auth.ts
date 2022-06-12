
import { auth } from './Firebase'
// import router from './router'

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

// export const createUser = async (
//   email: string, password: string
//   ) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//     console.log("userCredential", userCredential)
//     return userCredential.user;
//   }
//   catch(err) {
//     //   const errorMessage = error.message;
//     console.warn(err.code);
//     return err.code
//   }
// }

export const loginUser = async (
    email: string, 
    password: string
  ) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
  catch(err: any) {
    //   const errorMessage = error.message;
    console.warn(err.code);
    return err.code
  }
}

export const resetPassword = async (email: string) => {
  try {
    const res = await sendPasswordResetEmail(auth, email);
    return res;
  }
  catch(err: any) {
    return err.code;
  }
}