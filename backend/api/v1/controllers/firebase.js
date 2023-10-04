import express from "express";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import config from "../config/firebase.config.js";

const router = express.Router();

//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage();
// Setting up multer as a middleware to grab photo uploads
export const uploadFile = async (req, res) => {
  try {
    const storageRef = ref(storage, `tours/${req.id}_${req.img.name}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.img.type,
    };

    // Upload the file in the bucket storage
    await uploadBytesResumable(
      storageRef,
      Buffer.from(
        req.img.url.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
      metadata
    );

    // Upload preview files the file in the bucket storage
    for (let i = 0; i < req.img__grid.length; i++) {
      const storageRefPreview = ref(
        storage,
        `tours/${req.id}_${req.img__grid[i].name}`
      );
      const metadataPreview = {
        contentType: req.img__grid[i].type,
      };
      await uploadBytesResumable(
        storageRefPreview,
        Buffer.from(
          req.img__grid[i].url.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),
        metadataPreview
      );
    }
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    return {
      status: 200,
      name: req.img.name,
      type: req.img.type,
    };
  } catch (error) {
    return "error";
  }
};

export const getAllFiles = async (req, res) => {
  // Specify the directory or bucket to retrieve files from
  const directoryRef = ref(storage, "tours");
  listAll(directoryRef)
    .then((result) => {
      result.items.forEach((itemRef) => {
        // Get the download URL for each file
        getFile(itemRef);
      });
    })
    .catch((error) => {
      console.log("Error retrieving files:", error);
    });
};

export const getFile = (itemRef) =>
  getDownloadURL(itemRef)
    .then((downloadURL) => {
      console.log("Download URL:", itemRef);
    })
    .catch((error) => {
      console.log("Error getting download URL:", error);
    });

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};
