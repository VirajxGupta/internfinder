import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Bell } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useState({ name: "User", email: "" });

    useEffect(() => {
        // Dark Mode Logic
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }

        // Load User
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDarkMode(true);
        }
    };

    const isActive = (path) => {
        return location.pathname === path
            ? "text-slate-900 dark:text-white"
            : "hover:text-[#6B629D] dark:hover:text-[#6B629D] transition-colors";
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
                        <div className="w-8 h-8 bg-[#6B629D] rounded-lg flex items-center justify-center text-white font-bold">IF</div>
                        <h2 className="text-xl font-semibold tracking-tight">InternFinder</h2>
                    </div>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <button onClick={() => navigate('/home')} className={isActive('/home')}>Dashboard</button>
                        <button onClick={() => navigate('/resume')} className={isActive('/resume')}>Internships</button>
                        <button onClick={() => navigate('/saved')} className={isActive('/saved')}>Applications</button>
                        <button onClick={() => navigate('/profile')} className={isActive('/profile')}>Profile</button>
                        <button onClick={() => navigate('/about')} className={isActive('/about')}>About</button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={toggleDarkMode}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold cursor-pointer" onClick={() => navigate('/profile')}>
                        {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                </div>
            </div>
        </nav>
    );
}
