import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../services/movie.service';
import Loader from '../../components/common/Loader';
import { Star, Calendar, Clock, BookmarkPlus } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { addToWatchlist } from '../../services/watchlist.service';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data.movie);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleAddToWatchlist = async () => {
        if (!user) return alert("Please login to add to watchlist");
        
        setIsAddingToWatchlist(true);
        try {
            await addToWatchlist(movie.id);
            alert("Added to watchlist!");
        } catch (error) {
            console.error(error);
        } finally {
            setIsAddingToWatchlist(false);
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Loader /></div>;
    if (error) return <div className="text-center text-rose-500 mt-20">{error}</div>;
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;
    
    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <div className="animate-in fade-in duration-700">
            {/* Backdrop Header */}
            <div className="relative w-full h-[60vh] min-h-[400px] rounded-3xl overflow-hidden mb-8">
                {backdropUrl && (
                    <img 
                        src={backdropUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-end">
                    <img 
                        src={posterUrl} 
                        alt={`${movie.title} poster`}
                        className="w-48 md:w-64 rounded-2xl shadow-2xl shadow-black/50 border border-white/10 hidden sm:block"
                    />
                    
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                            {movie.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-6 font-medium">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-rose-500 fill-current" />
                                <span className="text-white text-lg">{movie.vote_average?.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{movie.runtime} min</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres?.map(genre => (
                                <span key={genre.id} className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/10">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <button 
                            onClick={handleAddToWatchlist}
                            disabled={isAddingToWatchlist}
                            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-rose-500/25"
                        >
                            <BookmarkPlus className="w-5 h-5" />
                            {isAddingToWatchlist ? 'Adding...' : 'Add to Watchlist'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {movie.overview || "No overview available."}
                        </p>
                    </section>
                </div>
                
                <div className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-white/5 h-fit">
                    <h3 className="text-xl font-bold text-white">Movie Info</h3>
                    
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Status</p>
                        <p className="text-white font-medium">{movie.status}</p>
                    </div>
                    
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Original Language</p>
                        <p className="text-white font-medium uppercase">{movie.original_language}</p>
                    </div>
                    
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Budget</p>
                        <p className="text-white font-medium">
                            {movie.budget ? `$${movie.budget.toLocaleString()}` : 'Unknown'}
                        </p>
                    </div>
                    
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Revenue</p>
                        <p className="text-white font-medium">
                            {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'Unknown'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;