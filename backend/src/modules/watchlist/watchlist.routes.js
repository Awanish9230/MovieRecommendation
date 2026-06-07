import express from "express";

import {

    addMovieToWatchlist,

    fetchWatchlist,

    deleteFromWatchlist

} from "./watchlist.controller.js";

import {
    protect
} from "../../middleware/auth.middleware.js";

const router = express.Router();

/* -------------------- WATCHLIST ROUTES -------------------- */

router.post(
    "/",
    protect,
    addMovieToWatchlist
);

router.get(
    "/",
    protect,
    fetchWatchlist
);

router.delete(
    "/:movieId",
    protect,
    deleteFromWatchlist
);

export default router;