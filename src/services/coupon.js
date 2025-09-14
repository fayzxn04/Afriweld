import { db } from "../config/firebase";

export const getAllCoupons = async () => {
  try {
    const response = await db.collection("web-coupons").get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addCoupon = async (coupon) => {
  try {
    await db.collection("web-coupons").doc(coupon.id).set(coupon);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteCoupon = async (couponId) => {
  try {
    await db.collection("web-coupons").doc(couponId).delete();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateCoupon = async (couponId, coupon) => {
  try {
    await db.collection("web-coupons").doc(couponId).update(coupon);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
