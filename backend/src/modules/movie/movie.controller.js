import { fetchTrendingMovies, searchMovies, fetchMovieDetails, fetchTopRatedMovies,fetchUpcomingMovies } from "./movie.service.js";

export const getTrendingMovies = async (req, res, next) => {
    try {
        const movies = await fetchTrendingMovies();
        res.status(200).json({
            success: true,
            movies
        });
    } catch (error) {
        next(error);
    }
};

export const getSearchMovies = async (req, res, next) => {
    try {
        const {query} = req.query;
        if(!query){
            throw new Error("Please enter the movie name ")
        }

        const movies = await searchMovies(query);
        res.status(200).json({
            success: true,
            movies
        });

    } catch (error) {
        next(error);
    }
};

export const getMoviesDetails = async (req, res, next) => {
    try {
        const {movieId} = req.params;
        const movie = await fetchMovieDetails(movieId);
        res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        next(error);
    }
};

export const getTopRatedMovies = async (req, res, next) => {
    try {
        const movies = await fetchTopRatedMovies();
        res.status(200).json({
            success: true,
            movies
        });
    } catch (error) {
        next(error);
    }
};

export const getUpcomingMovies = async (req, res, next) => {
    try {
        const movies = await fetchUpcomingMovies();
        res.status(200).json({
            success: true,
            movies
        });
    } catch (error) {
        next(error);
    }
};