import tmdbAPI from '../../config/tmdb.js';

export const fetchTrendingMovies = async () => {
    const response = await tmdbAPI.get(
        "/trending/movie/day"
    );
    return response.data;
};

export const searchMovies = async (query) => {
    const response = await tmdbAPI.get(
        "/search/movie",
        {
            params: { query }
        }
    );
    return response.data;
};

export const fetchMovieDetails = async (movieId)=>{
    const response = await tmdbAPI.get(
        `/movie/${movieId}`
    );
    return response.data;
};

export const fetchTopRatedMovies = async () => {
    const response = await tmdbAPI.get(
        "/movie/top_rated"
    );
    return response.data;
};

export const fetchUpcomingMovies = async () => {
    const response = await tmdbAPI.get(
        "/movie/upcoming"
    );
    return response.data;
};