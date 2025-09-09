import { db } from "../config/firebase";

export const getAllCategories = async () => {
  try {
    const response = await db.collection("web-categories").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    await db.collection("web-categories").doc(category.id).set(category);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await db.collection("web-categories").doc(categoryId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateCategory = async (categoryId, category) => {
  try {
    await db.collection("web-categories").doc(categoryId).update(category);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
