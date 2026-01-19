import express from 'express';
import { getUserProfile, login, logout, signup, updateProfile } from '../controllers/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login" , login)
router.post("/logout", logout)
router.get("/getUserProfile" , secureRoute , getUserProfile)
// Route 1 & 2: Set/Edit karne ke liye (PUT request)
router.put("/update", secureRoute, upload.single("profilePic"), updateProfile);

// Route 3: Delete karne ke liye (DELETE request)


export default router;