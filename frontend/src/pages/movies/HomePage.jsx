import Loader from "../../components/common/Loader";
import MovieGrid from "../../components/movie/MovieGrid";
import useFetch from "../../hooks/useFetch";
import { getTrendingMovies } from "../../services/movie.service";
import { TrendingUp } from "lucide-react";

const HomePage = () => {
    const { data, loading, error } = useFetch(getTrendingMovies);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-rose-400 bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center">
                    <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // Safely extract the movies array from the TMDB response structure
    const moviesList = data?.movies?.results || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-orange-500 p-8 sm:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
                        Discover Your Next Favorite Movie
                    </h1>
                    <p className="text-rose-100 text-lg sm:text-xl mb-8 opacity-90">
                        Explore the most popular and trending movies right now. Keep track of what you want to watch.
                    </p>
                </div>
            </div>

            {/* Trending Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-8 h-8 text-rose-500" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Trending Now
                    </h2>
                </div>
                
                {moviesList.length > 0 ? (
                    <MovieGrid movies={moviesList} />
                ) : (
                    <p className="text-slate-400 text-center py-12">No trending movies found at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;