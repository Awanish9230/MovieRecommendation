import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './modules/auth/auth.routes.js';
import movieRoutes from './modules/movie/movie.routes.js';
import reviewRoutes from './modules/review/review.routes.js';
import recommendationRoutes from './modules/recommendation/recommendation.routes.js';
import userRoutes from "./modules/user/user.routes.js";
import watchlistRoutes from "./modules/watchlist/watchlist.routes.js";
import {errorHandler} from './middleware/error.middleware.js';

const app = express();

/* -------------------- SECURITY MIDDLEWARE -------------------- */

app.use(helmet());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const limiter = rateLimit({
    windowMs : 1 * 60 * 1000, // For 1  minute
    max : 7,
});
app.use(limiter);

/* -------------------- BODY PARSER -------------------- */

app.use(express.json());
app.use(express.urlencoded({
    extended : true,
}));

/* -------------------- HEALTH CHECK -------------------- */

app.get("/", (req, res) => {
    res.status(200).json({
        success : true,
        message: "Api is runnig fine"
    });
});

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/movies",movieRoutes)
app.use("/api/reviews", reviewRoutes);
app.use("/api/recommendations",recommendationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/watchlist",watchlistRoutes);
/* -------------------- ERROR HANDLER -------------------- */

app.use(errorHandler);

export default app;