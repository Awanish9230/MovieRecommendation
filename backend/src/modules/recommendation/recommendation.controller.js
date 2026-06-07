import {
    getRecommendations
} from "./recommendation.service.js";

/* -------------------- GET RECOMMENDATIONS -------------------- */

export const fetchRecommendations =
async (req, res, next) => {

    try {

        const recommendations =
            await getRecommendations(
                req.user.id
            );

        res.status(200).json({
            success: true,
            recommendations
        });

    } catch (error) {

        next(error);

    }
};