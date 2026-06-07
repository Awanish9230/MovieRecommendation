import useAuth from '../../hooks/useAuth';
import { User, Mail, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
                <p>Please log in to view your profile.</p>
                <Link to="/login" className="mt-4 text-rose-500 hover:text-rose-400 underline">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
            <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-2xl shadow-rose-500/20 mb-6">
                        <span className="text-6xl">{user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                    </div>
                    
                    <button className="mt-8 w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition-colors border border-slate-700">
                        <Settings className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>

                {/* Account Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-slate-800/50 rounded-3xl p-8 border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Account Information</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-400 text-sm block mb-1">Full Name</label>
                                <p className="text-white text-lg font-medium">{user.name}</p>
                            </div>
                            
                            <div>
                                <label className="text-slate-400 text-sm block mb-1">Email Address</label>
                                <p className="text-white text-lg font-medium">{user.email}</p>
                            </div>
                            
                            <div>
                                <label className="text-slate-400 text-sm block mb-1">Member Since</label>
                                <div className="flex items-center gap-2 text-white text-lg font-medium">
                                    <Calendar className="w-5 h-5 text-rose-500" />
                                    <span>{new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;