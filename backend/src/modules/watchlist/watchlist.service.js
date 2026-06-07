import Watchlist from "./watchlist.model.js";

/* -------------------- ADD TO WATCHLIST -------------------- */

export const addToWatchlist = async (
    userId,
    movieId
) => {

    const existingMovie =
        await Watchlist.findOne({
            user: userId,
            movieId
        });

    if (existingMovie) {
        throw new Error(
          "Movie already in watchlist"
        );
    }

    const movie =
        await Watchlist.create({
            user: userId,
            movieId
        });

    return movie;
};

/* -------------------- GET WATCHLIST -------------------- */

export const getWatchlist = async (
    userId
) => {

    return await Watchlist.find({
        user: userId
    });

};

/* -------------------- REMOVE WATCHLIST -------------------- */

export const removeFromWatchlist =
async (userId, movieId) => {

    const deletedMovie =
        await Watchlist.findOneAndDelete({
            user: userId,
            movieId
        });

    if (!deletedMovie) {
        throw new Error(
          "Movie not found in watchlist"
        );
    }

    return {
        message:
          "Movie removed from watchlist"
    };
};