import { db } from "../config/firebase";

export const getAllAddresses = async () => {
  try {
    const response = await db.collection("web-address").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addAddress = async (address) => {
  try {
    await db.collection("web-address").doc(address.id).set(address);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    await db.collection("web-address").doc(addressId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateAddress = async (addressId, address) => {
  try {
    await db.collection("web-address").doc(addressId).update(address);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
