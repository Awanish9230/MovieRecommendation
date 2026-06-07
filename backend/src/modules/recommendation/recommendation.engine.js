export const calculateRecommendationScore =
(
    movie,
    user
) => {

    let score = 0;

    /* Genre matching */
    if (
        user.favoriteGenres?.includes(
            movie.genre
        )
    ) {
        score += 5;
    }

    /* Search history matching */
    user.searchHistory?.forEach(
        (search) => {

            if (
                movie.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
            ) {
                score += 2;
            }

        }
    );

    return score;
};