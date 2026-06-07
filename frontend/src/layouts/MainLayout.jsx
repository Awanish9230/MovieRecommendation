import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import { Film } from "lucide-react";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <Outlet />
            </main>
            <footer className="border-t border-white/10 bg-black/20 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Film className="w-6 h-6 text-rose-500" />
                        <span className="text-xl font-bold text-slate-300">MovieApp</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;