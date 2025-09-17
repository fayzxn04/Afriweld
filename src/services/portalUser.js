import { db } from "../config/firebase";

export const getAllPortalUsers = async () => {
  try {
    const response = await db.collection("web-portalUsers").get(); //
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getPortalUser = async (userId) => {
  try {
    const response = await db.collection("web-portalUsers").doc(userId).get();
    const data = response.data();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updatePortalUser = async (userId, user) => {
  try {
    await db.collection("web-portalUsers").doc(userId).update(user);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deletePortalUser = async (userId) => {
  try {
    await db.collection("web-portalUsers").doc(userId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addPortalUser = async (user) => {
  try {
    await db.collection("web-portalUsers").doc(user.id).set(user);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getPortalUserByEmail = async (email) => {
  try {
    const response = await db
      .collection("web-portalUsers")
      .where("email", "==", email)
      .get();
    const data = response.docs.map((doc) => doc.data());
    if (data.length > 0) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
