import {

    addToWatchlist,

    getWatchlist,

    removeFromWatchlist

} from "./watchlist.service.js";

/* -------------------- ADD -------------------- */

export const addMovieToWatchlist =
async (req, res, next) => {

    try {

        const { movieId } = req.body;

        const movie =
            await addToWatchlist(
                req.user.id,
                movieId
            );

        res.status(201).json({
            success: true,
            movie
        });

    } catch (error) {

        next(error);

    }
};

/* -------------------- GET -------------------- */

export const fetchWatchlist =
async (req, res, next) => {

    try {

        const watchlist =
            await getWatchlist(
                req.user.id
            );

        res.status(200).json({
            success: true,
            watchlist
        });

    } catch (error) {

        next(error);

    }
};

/* -------------------- REMOVE -------------------- */

export const deleteFromWatchlist =
async (req, res, next) => {

    try {

        const { movieId } =
            req.params;

        const result =
            await removeFromWatchlist(
                req.user.id,
                movieId
            );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        next(error);

    }
};