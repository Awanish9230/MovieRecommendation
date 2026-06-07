import express from "express";

import {

    addReview,

    fetchMovieReviews,

    removeReview

} from "./review.controller.js";

import {
    protect
} from "../../middleware/auth.middleware.js";

const router = express.Router();

/* -------------------- REVIEW ROUTES -------------------- */

/* Add review */
router.post(
    "/",
    protect,
    addReview
);

/* Get reviews of movie */
router.get(
    "/:movieId",
    fetchMovieReviews
);

/* Delete review */
router.delete(
    "/:reviewId",
    protect,
    removeReview
);

export default router;