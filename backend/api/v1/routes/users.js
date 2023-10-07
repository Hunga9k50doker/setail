import express from "express";

import {
  signin,
  signup,
  updateProfile,
  updatePassword,
  verifyUser,
  getProfile,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verify/user", verifyUser);
router.get("/getProfile", auth, getProfile);
router.post("/update/profile", auth, updateProfile);
router.post("/update/password", auth, updatePassword);

export default router;
