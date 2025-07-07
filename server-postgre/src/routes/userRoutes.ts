import express from "express";
import { upload } from "../utils/multer";
import verfiyAdminToken from "../middlewares/verfiyAdminToken";
import verfiySuperAdminToken from "../middlewares/verifySuperAdmin";

import {
  signUp,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  adminLogin,
  dashboardUpdateUser,
  verifyUser,
} from "../controllers/userController";

import {
  loginValidation,
  signupValidation,
} from "../utils/validations/authenticationSchema";
import verfiyUserToken from "../middlewares/verfiyUserToken";

export const router = express.Router();

// dashboard authentication
router.post("/dashboard/login", loginValidation, adminLogin);

// dashboard update user
router.patch("/dashboard/:id", verfiyUserToken, dashboardUpdateUser);

// dashboard verify logged in user
router.post("/dashboard/verify-user", verifyUser);

// registration create new user
router.post("/signup", signupValidation, signUp);

//login
router.post("/login", loginValidation, login);

//get all users
router.get("/", verfiyAdminToken, getAllUsers);

//get user by id
router.get("/:id", verfiyUserToken, getUserById);

// update user
router.put("/:id", verfiyUserToken, upload.single("avatar"), updateUser);
router.patch("/:id", verfiyUserToken, upload.single("avatar"), updateUser);

// delete user
router.delete("/:id", verfiySuperAdminToken, deleteUser);

module.exports = router;
