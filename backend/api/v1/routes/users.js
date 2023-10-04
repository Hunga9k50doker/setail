import express from "express";

import { signin, signup, updateProfile, updatePassword, verifyUser } from "../controllers/users.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verify/user", verifyUser);
router.post("/update/profile", updateProfile);
router.post("/update/password", updatePassword);

export default router;
