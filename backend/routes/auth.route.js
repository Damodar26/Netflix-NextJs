import express from "express";
import {signup, login, logout, addProfile, editProfile } from "../controllers/auth.controller.js";
//import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/profile/add", protectRoute, addProfile)
router.put("/profile/edit", protectRoute, editProfile)
//router.get("/authCheck", protectRoute, authCheck);

export default router;