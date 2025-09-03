import { storage } from "../config/firebase";

// This Function is used for camelCase  -- mybannerworks -- MyBannerWorks!
export const convertToCamelCase = (str) => {
  const words = str.split(" ");
  const firstWord = words[0].toLowerCase();
  const otherWords = words
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return [firstWord, ...otherWords].join("");
};

// This Function is used for Path Segment -- mybannerworks -- My Banner Works!
export function processPathSegments(segments) {
  return segments.map((segment) => {
    let newSegment = segment.charAt(0).toUpperCase() + segment.slice(1);
    newSegment = newSegment.replace(/([A-Z])/g, " $1").trim();
    return newSegment;
  });
}

// This Function is used for uploading files to Firebase Storage!
export const addFile = async (file, fileName, filePath) => {
  const storageRef = storage.ref();
  let fileRef;
  if (fileName) {
    fileRef = storageRef.child(`${filePath}/${fileName}`);
  } else {
    fileRef = storageRef.child(filePath);
  }
  try {
    const snapshot = await fileRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};
