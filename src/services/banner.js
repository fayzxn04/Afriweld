import { db } from "../config/firebase";

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

export const addBanner = async (banner) => {
  try {
    await db.collection("web-banners").doc(banner.id).set(banner);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
