import { useState, useEffect } from 'react';
import { getWatchlist, removeFromWatchlist } from '../../services/watchlist.service';
import { getMovieDetails } from '../../services/movie.service';
import MovieCard from '../../components/movie/MovieCard';
import Loader from '../../components/common/Loader';
import { Bookmark, Trash2 } from 'lucide-react';

const WatchlistPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWatchlistData = async () => {
            try {
                const data = await getWatchlist();
                const watchlistItems = data.watchlist || [];
                
                // Fetch details for each movie in the watchlist
                const movieDetailsPromises = watchlistItems.map(item => getMovieDetails(item.movieId));
                const moviesData = await Promise.all(movieDetailsPromises);
                
                setMovies(moviesData.map(res => res.movie));
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load watchlist');
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlistData();
    }, []);

    const handleRemove = async (movieId) => {
        try {
            await removeFromWatchlist(movieId);
            setMovies(movies.filter(m => m.id !== movieId));
        } catch (err) {
            alert('Failed to remove from watchlist');
        }
    };

    if (loading) {
        return <div className="flex justify-center mt-20"><Loader /></div>;
    }

    return (
        <div className="animate-in fade-in duration-700">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <Bookmark className="w-8 h-8 text-rose-500" />
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    My Watchlist
                </h1>
            </div>

            {error && (
                <div className="text-rose-400 bg-rose-500/10 p-4 rounded-xl mb-6 text-center">
                    {error}
                </div>
            )}

            {movies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {movies.map(movie => (
                        <div key={movie.id} className="relative group">
                            <MovieCard movie={movie} />
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRemove(movie.id);
                                }}
                                className="absolute top-2 right-2 bg-slate-900/80 p-2 rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white"
                                title="Remove from watchlist"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center bg-slate-800/30 rounded-3xl p-12 border border-white/5">
                    <Bookmark className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Looks like you haven't added any movies to your watchlist yet. Browse trending movies and add them here!
                    </p>
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;