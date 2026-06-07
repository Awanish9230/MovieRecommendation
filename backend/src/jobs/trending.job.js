import User from "../modules/user/user.model.js";

/* -------------------- RECOMMENDATION JOB -------------------- */

export const generateRecommendations =
async () => {

    try {

        const users =
            await User.find();

        users.forEach((user) => {

            console.log(
              `🎬 Generating recommendations for ${user.email}`
            );

        });

    } catch (error) {

        console.error(
          "❌ Recommendation job failed:",
          error.message
        );

    }

};