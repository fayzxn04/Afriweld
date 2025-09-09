import { db } from "../config/firebase";

export const getAllProducts = async () => {
  try {
    const response = await db.collection("web-products").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    await db.collection("web-products").doc(product.id).set(product);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await db.collection("web-products").doc(productId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateProduct = async (productId, product) => {
  try {
    await db.collection("web-products").doc(productId).update(product);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
