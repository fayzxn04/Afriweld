import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const signUpNewUser = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    return response.user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const resetLoginPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
