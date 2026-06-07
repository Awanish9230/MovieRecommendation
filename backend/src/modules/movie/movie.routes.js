import express from "express";
import { getTrendingMovies, getSearchMovies, getMoviesDetails, getTopRatedMovies, getUpcomingMovies } from "./movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/search", getSearchMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/:movieId", getMoviesDetails);

export default router;