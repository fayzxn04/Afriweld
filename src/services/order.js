import { db } from "../config/firebase";

export const getAllOrders = async () => {
  try {
    const response = await db.collection("web-orders").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addOrder = async (order) => {
  try {
    await db.collection("web-orders").doc(order.id).set(order);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await db.collection("web-orders").doc(orderId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateOrder = async (orderId, order) => {
  try {
    await db.collection("web-orders").doc(orderId).update(order);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
