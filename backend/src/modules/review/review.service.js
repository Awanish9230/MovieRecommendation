import Review from "./review.model.js";

/* -------------------- CREATE REVIEW -------------------- */

export const createReview = async (
    userId,
    reviewData
) => {

    const {
        movieId,
        rating,
        reviewText
    } = reviewData;

    /* Prevent duplicate review */
    const existingReview =
        await Review.findOne({
            user: userId,
            movieId
        });

    if (existingReview) {
        throw new Error(
            "You already reviewed this movie"
        );
    }

    const review =
        await Review.create({

            user: userId,

            movieId,

            rating,

            reviewText
        });

    return review;
};

/* -------------------- GET MOVIE REVIEWS -------------------- */

export const getMovieReviews = async (
    movieId
) => {

    const reviews =
        await Review.find({
            movieId
        }).populate(
            "user",
            "name email"
        );

    return reviews;
};

/* -------------------- DELETE REVIEW -------------------- */

export const deleteReview = async (
    reviewId,
    userId
) => {

    const review =
        await Review.findById(reviewId);

    if (!review) {
        throw new Error(
            "Review not found"
        );
    }

    /* Only owner can delete */
    if (
        review.user.toString() !==
        userId
    ) {
        throw new Error(
            "Unauthorized"
        );
    }

    await review.deleteOne();

    return {
        message:
            "Review deleted successfully"
    };
};