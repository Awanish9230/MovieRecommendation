import express from "express";

import {
    fetchRecommendations
} from "./recommendation.controller.js";

import {
    protect
} from "../../middleware/auth.middleware.js";

const router = express.Router();

/* -------------------- RECOMMENDATION ROUTES -------------------- */

router.get(
    "/",
    protect,
    fetchRecommendations
);

export default router;