import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import config from "../config/firebase.config.js";

//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
export const uploadFile = async (req, res) => {
  const { folder } = req;
  try {
    // Create file metadata including the content type
    const metadata = {
      contentType: req.type,
    };

    // Upload the file in the bucket storage
    const storageRef = ref(storage, `${folder || "tours"}/${req.name}`);
    //check existing upload file
    await getDownloadURL(storageRef)
      .then((download) => ({
        status: 200,
        name: req.name,
        type: req.type,
        url: download,
        message: "File uploaded successfully.",
      }))
      .catch((error) => ({
        status: 500,
        message:
          "Error handle file: " + error.message + " Please try again later.",
      }));

    const snapshot = await uploadBytesResumable(
      storageRef,
      Buffer.from(req.url.replace(/^data:image\/\w+;base64,/, ""), "base64"),
      metadata
    );
    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      status: 200,
      name: req.name,
      type: req.type,
      url: downloadURL,
      message: "File uploaded successfully.",
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Error handle file: " + error.message + " Please try again later.",
    };
  }
};

export const getFile = (itemRef) =>
  getDownloadURL(itemRef)
    .then((downloadURL) => {
      return downloadURL;
    })
    .catch((error) => {
      return false;
    });
