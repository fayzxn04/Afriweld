import { db } from "../config/firebase";

export const getAllUsers = async () => {
  try {
    const response = await db.collection("web-users").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    await db.collection("web-users").doc(user.id).set(user);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await db.collection("web-users").doc(userId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateUser = async (userId, user) => {
  try {
    await db.collection("web-users").doc(userId).update(user);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
