import api from "../api/axios.js";

export const getTrendingMovies = async () => {
    const response = await api.get("/movies/trending");
    return response.data;
};

export const getTopRatedMovies = async () => {
    const response = await api.get("/movies/top-rated");
    return response.data;
};

export const getUpcomingMovies = async () => {
    const response = await api.get("/movies/upcoming");
    return response.data;
};

export const searchMovies = async (query) => {
    const response = await api.get(`/movies/search?query=${query}`);
    return response.data;
};

export const getMovieDetails = async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
};