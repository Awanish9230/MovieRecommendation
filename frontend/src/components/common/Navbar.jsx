import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Film, User, LogOut, Bookmark, Search, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 border-b border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <Film className="w-8 h-8 text-rose-500 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-black tracking-tight text-gradient">
                        MovieApp
                    </span>
                </Link>

                {/* Search Bar (Placeholder for now) */}
                <div className="hidden md:flex relative w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search movies..." 
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-500"
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && e.target.value.trim()) {
                                navigate(`/search?q=${e.target.value}`);
                            }
                        }}
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/watchlist" className="flex items-center gap-2 text-slate-300 hover:text-rose-400 transition-colors font-medium">
                                <Bookmark className="w-4 h-4" />
                                <span className="hidden sm:inline">Watchlist</span>
                            </Link>

                            <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block"></div>

                            <Link to="/profile" className="flex items-center gap-2 text-slate-300 hover:text-rose-400 transition-colors font-medium">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4"/>}
                                </div>
                                <span className="hidden sm:inline">{user?.name}</span>
                            </Link>

                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium">
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                            <Link to="/register" className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full transition-all font-medium shadow-lg shadow-rose-500/20">
                                <UserPlus className="w-4 h-4" />
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;