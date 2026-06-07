import express from "express";

import {

    fetchUserProfile,

    editUserProfile

} from "./user.controller.js";

import {
    protect
} from "../../middleware/auth.middleware.js";

const router = express.Router();

/* -------------------- USER ROUTES -------------------- */

router.get(
    "/profile",
    protect,
    fetchUserProfile
);

router.put(
    "/profile",
    protect,
    editUserProfile
);

export default router;