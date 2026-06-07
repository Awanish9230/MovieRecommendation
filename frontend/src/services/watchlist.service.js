import api from "../api/axios.js";

export const getWatchlist = async () => {
    const response = await api.get("/watchlist");
    return response.data;
};

export const addToWatchlist = async (movieId) => {
    const response = await api.post("/watchlist", { movieId });
    return response.data;
};

export const removeFromWatchlist = async (movieId) => {
    const response = await api.delete(`/watchlist/${movieId}`);
    return response.data;
};
