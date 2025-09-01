/** @format */

import { db, serverTimestamp } from "../config/firebase";

export const getAllBanners = async () => {
  try {
    const response = await db.collection("web-banners").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getBannerById = async (bannerId) => {
  try {
    const response = await db.collection("web-banners").doc(bannerId).get();
    const data = response.data();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateBanner = async (bannerId, banner) => {
  try {
    await db
      .collection("web-banners")
      .doc(bannerId)
      .update({ banner, updatedAt: serverTimestamp() });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteBanner = async (bannerId) => {
  try {
    await db.collection("web-banners").doc(bannerId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addBanner = async (banner) => {
  try {
    await db
      .collection("web-banners")
      .doc(banner.id)
      .set({ banner, createdAt: serverTimestamp() });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
