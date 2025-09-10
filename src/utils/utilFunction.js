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

function convertFirebaseUrlToPath(firebaseUrl) {
  try {
    if (!firebaseUrl || typeof firebaseUrl !== "string") return null;

    // gs://<bucket>/<path>
    if (firebaseUrl.startsWith("gs://")) {
      // strip "gs://<bucket>/" and return just the object path
      const withoutScheme = firebaseUrl.replace(/^gs:\/\/[^/]+\//, "");
      return withoutScheme || null;
    }

    // https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encodedPath>?alt=media&token=...
    const decoded = decodeURIComponent(firebaseUrl);
    const m = decoded.match(/\/o\/(.+?)(\?|$)/);
    if (m && m[1]) {
      // m[1] is the encoded object path where %2F == '/'
      return m[1].replace(/%2F/g, "/");
    }

    // Also handle any pre-decoded variant that already contains '/o/<path>'
    const m2 = firebaseUrl.match(/\/o\/([^?]+)(\?|$)/);
    if (m2 && m2[1]) {
      return m2[1].replace(/%2F/g, "/");
    }

    console.error(
      "convertFirebaseUrlToPath: URL did not match expected patterns:",
      firebaseUrl
    );
    return null;
  } catch (err) {
    console.error("Error converting Firebase URL to path:", err);
    return null;
  }
}

/**
 * Delete a file from Firebase Storage.
 * Accepts any of the following call patterns:
 *  - deleteFile("https://firebasestorage.googleapis.com/...")  // download URL
 *  - deleteFile("gs://<bucket>/<path>")                        // gs URL
 *  - deleteFile("banners/<id>/<fileName.ext>")                 // storage path
 *  - deleteFile("<fileName.ext>", "banners/<id>")              // name + directory path
 */
export const deleteFile = async (fileNameOrUrlOrPath, filePath) => {
  try {
    let refToDelete = null;

    // Case A: Single-arg URL (https or gs://) → delete via refFromURL
    if (
      typeof fileNameOrUrlOrPath === "string" &&
      (fileNameOrUrlOrPath.startsWith("http") ||
        fileNameOrUrlOrPath.startsWith("gs://"))
    ) {
      // Prefer refFromURL if available
      if (typeof storage.refFromURL === "function") {
        refToDelete = storage.refFromURL(fileNameOrUrlOrPath);
      } else {
        // Fallback: convert URL to path
        const path = convertFirebaseUrlToPath(fileNameOrUrlOrPath);
        if (!path) throw new Error("Cannot derive path from Firebase URL");
        refToDelete = storage.ref().child(path);
      }
    }

    // Case B: name + directory path → "dir/name"
    if (
      !refToDelete &&
      filePath &&
      typeof filePath === "string" &&
      fileNameOrUrlOrPath
    ) {
      // Normalize slashes and join
      const dir = filePath.replace(/\/+$/, ""); // trim trailing slash
      const name = String(fileNameOrUrlOrPath).replace(/^\/+/, ""); // trim leading slash
      const joined = `${dir}/${name}`;

      if (!/\.[a-z0-9]+$/i.test(name)) {
        // No extension in file name is suspicious; still allow if you know your naming
        console.warn(
          "deleteFile: name has no extension—ensure this is an actual object:",
          joined
        );
      }

      refToDelete = storage.ref().child(joined);
    }

    // Case C: single-arg storage path → delete that object
    if (!refToDelete && typeof fileNameOrUrlOrPath === "string") {
      const path = fileNameOrUrlOrPath;

      // Guard: refuse to delete likely folder-only refs
      const looksLikeFolderOnly = !/\.[a-z0-9]+$/i.test(
        path.split("/").pop() || ""
      );
      if (looksLikeFolderOnly) {
        throw new Error(
          `Refusing to delete a folder path. Provide the full object path (e.g., "banners/<id>/<file.ext>") or the download URL. Got: "${path}"`
        );
      }

      refToDelete = storage.ref().child(path);
    }

    if (!refToDelete) {
      throw new Error(
        "deleteFile: Unable to build a valid Storage ref from the provided arguments."
      );
    }

    await refToDelete.delete();
    return true;
  } catch (error) {
    console.error("[deleteFile] failed:", error);
    return false;
  }
};
