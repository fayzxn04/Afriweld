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

// This function takes a Firebase Storage download URL and extracts the file’s storage path from it.
function convertFirebaseUrlToPath(firebaseUrl) {
  try {
    // Decode the URL   [ %2F = / ]
    const decodedUrl = decodeURIComponent(firebaseUrl);

    // Extract the path between 'o/' and '?'
    const matches = decodedUrl.match(/o\/(.+?)\?/);
    if (matches && matches[1]) {
      // Replace '%2F' with '/' to get the actual path
      return matches[1].replace(/%2F/g, "/");
    }
    throw new Error("Invalid Firebase URL");
  } catch (error) {
    console.error("Error converting Firebase URL to path:", error);
    return null; // or handle the error as you see fit
  }
}

// This Function is used for deleting files from Firebase Storage!
export const deleteFile = async (fileName, filePath) => {
  const storageRef = storage.ref();
  let fileRef;

  // Check if fileName includes "firebase"
  if (fileName && fileName.includes("firebase")) {
    // Convert the fileName to your desired path format here
    // This is a placeholder, replace with your actual conversion logic
    const convertedPath = convertFirebaseUrlToPath(fileName);
    fileRef = storageRef.child(convertedPath);
  } else if (fileName !== undefined) {
    fileRef = storageRef.child(`${filePath}/${fileName}`);
  } else {
    fileRef = storageRef.child(filePath);
  }

  try {
    await fileRef.delete();
    return true;
  } catch (error) {
    console.log(error);
    return false; // Indicate failure
  }
};
