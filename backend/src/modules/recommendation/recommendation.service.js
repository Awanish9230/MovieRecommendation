import User from "../user/user.model.js";
import tmdbAPI from "../../config/tmdb.js";

/* -------------------- GET RECOMMENDATIONS -------------------- */

export const getRecommendations =
async (userId) => {

    const user =
        await User.findById(userId);

    if (!user) {
        throw new Error(
          "User not found"
        );
    }

    /* Get popular movies */
    const response =
        await tmdbAPI.get(
          "/movie/popular"
        );

    const movies =
        response.data.results;

    /* Filter based on genres */
    const recommendedMovies =
        movies.filter((movie) => {

            return movie.genre_ids?.some(
                (genre) =>
                    user.favoriteGenres
                    ?.includes(
                        genre.toString()
                    )
            );

        });

    return recommendedMovies;
};