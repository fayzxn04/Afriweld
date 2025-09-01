import { storage } from "../config/firebase";
import { encode } from "blurhash";
// import { deleteObject, listAll, ref } from "firebase/storage";

export function processPathSegments(segments) {
  return segments.map((segment) => {
    let newSegment = segment.charAt(0).toUpperCase() + segment.slice(1);
    newSegment = newSegment.replace(/([A-Z])/g, " $1").trim();
    return newSegment;
  });
}

export const convertToCamelCase = (str) => {
  const words = str.split(" ");
  const firstWord = words[0].toLowerCase();
  const otherWords = words
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return [firstWord, ...otherWords].join("");
};

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

function convertFirebaseUrlToPath(firebaseUrl) {
  try {
    // Decode the URL
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

export const generateBlurHash = async (
  file,
  componentX = 4,
  componentY = 3
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("Invalid file type. Please provide an image file."));
      return;
    }
    // console.log(file)
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, img.width, img.height);

        try {
          const hash = encode(
            imageData.data,
            imageData.width,
            imageData.height,
            componentX,
            componentY
          );
          resolve(hash);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = event.target.result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
