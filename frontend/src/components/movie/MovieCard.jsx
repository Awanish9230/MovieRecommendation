import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const MovieCard = ({ movie }) => {
    const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <Link to={`/movie/${movie.id}`} className="group relative block overflow-hidden rounded-2xl bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-2">
            {/* Poster Image */}
            <div className="aspect-[2/3] w-full overflow-hidden bg-slate-800">
                <img
                    src={imageUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <h2 className="font-bold text-lg text-white line-clamp-1 mb-1">
                    {movie.title || movie.name}
                </h2>
                
                <div className="flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-1 text-rose-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{movie.vote_average?.toFixed(1) || 'NR'}</span>
                    </div>
                    {movie.release_date && (
                        <span className="text-xs text-slate-400">
                            {new Date(movie.release_date).getFullYear()}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;