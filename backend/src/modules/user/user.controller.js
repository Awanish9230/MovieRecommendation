import {

    getUserProfile,

    updateUserProfile

} from "./user.service.js";

/* -------------------- GET PROFILE -------------------- */

export const fetchUserProfile =
async (req, res, next) => {

    try {

        const user =
            await getUserProfile(
                req.user.id
            );

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        next(error);

    }
};

/* -------------------- UPDATE PROFILE -------------------- */

export const editUserProfile =
async (req, res, next) => {

    try {

        const updatedUser =
            await updateUserProfile(
                req.user.id,
                req.body
            );

        res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        next(error);

    }
};