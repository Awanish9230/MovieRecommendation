import {

    createReview,

    getMovieReviews,

    deleteReview

} from "./review.service.js";

/* -------------------- ADD REVIEW -------------------- */

export const addReview = async (
    req,
    res,
    next
) => {

    try {

        const review =
            await createReview(
                req.user.id,
                req.body
            );

        res.status(201).json({
            success: true,
            review
        });

    } catch (error) {

        next(error);

    }
};

/* -------------------- GET REVIEWS -------------------- */

export const fetchMovieReviews =
async (req, res, next) => {

    try {

        const { movieId } =
            req.params;

        const reviews =
            await getMovieReviews(
                movieId
            );

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {

        next(error);

    }
};

/* -------------------- DELETE REVIEW -------------------- */

export const removeReview =
async (req, res, next) => {

    try {

        const { reviewId } =
            req.params;

        const result =
            await deleteReview(
                reviewId,
                req.user.id
            );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        next(error);

    }
};