
import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser, updateProfile } from '../controller/userController.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Route के साथ controller जोड़ो
userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.put("/profile", isAuth,upload.single("photoUrl"), updateProfile)

export default userRouter;
