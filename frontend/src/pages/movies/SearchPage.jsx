import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchMovies } from '../../services/movie.service';
import MovieGrid from '../../components/movie/MovieGrid';
import Loader from '../../components/common/Loader';
import { Search } from 'lucide-react';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await searchMovies(query);
                setMovies(data.movies?.results || []);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to search movies');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (!query) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                <Search className="w-16 h-16 mb-4 opacity-50" />
                <h2 className="text-2xl font-bold text-white mb-2">Search Movies</h2>
                <p>Type something in the search bar to find your next favorite movie.</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-8 border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Search Results for <span className="text-rose-500">"{query}"</span>
                </h1>
                <p className="text-slate-400">
                    {!loading && `${movies.length} movies found`}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center mt-20"><Loader /></div>
            ) : error ? (
                <div className="text-center text-rose-500 mt-20">{error}</div>
            ) : movies.length > 0 ? (
                <MovieGrid movies={movies} />
            ) : (
                <div className="text-center text-slate-400 mt-20">
                    No movies found matching your search.
                </div>
            )}
        </div>
    );
};

export default SearchPage;