import User from "./user.model.js";

/* -------------------- GET USER PROFILE -------------------- */

export const getUserProfile = async (
    userId
) => {

    const user = await User.findById(
        userId
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

/* -------------------- UPDATE USER PROFILE -------------------- */

export const updateUserProfile = async (
    userId,
    updateData
) => {

    const user = await User.findById(
        userId
    );

    if (!user) {
        throw new Error("User not found");
    }

    user.name =
        updateData.name || user.name;

    user.favoriteGenres =
        updateData.favoriteGenres
        || user.favoriteGenres;

    const updatedUser =
        await user.save();

    return updatedUser;
};