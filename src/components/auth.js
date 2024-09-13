import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
};
export const logOut = async () => {
  try{
      await signOut(auth);
  } catch (error) {
      console.log(error);
  }
};
// Email/Password Sign-Up
export const signWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    console.log("User created: ", user);
    alert("Account created successfully");
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

