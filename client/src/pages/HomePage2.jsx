import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

// Footer Component (Internal definition for self-containment)
const Footer = () => (
    <footer className="bg-[#0a45a3] text-white pt-8 pb-6 border-t border-white/10 mt-10">
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                        InternFinder
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                        Bridging the gap between academic learning and industry requirements through quality internship opportunities in India's leading companies.
                    </p>
                    <p className="text-white/60 text-xs">Ministry of Corporate Affairs</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-white/60">
                        <li><a href="#" className="hover:text-white transition-colors">Guidelines & Instructions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Eligibility Criteria</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Application Process</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Support</h3>
                    <ul className="space-y-3 text-sm text-white/60">
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm mt-0.5">mail</span>
                            support@internfinder.gov.in
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm mt-0.5">call</span>
                            1800-123-456 (Toll Free)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm mt-0.5">location_on</span>
                            Shastri Bhawan, New Delhi - 110001
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Government Links</h3>
                    <ul className="space-y-2 text-sm text-white/60">
                        <li><a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">India.gov.in</a></li>
                        <li><a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ministry of Corporate Affairs</a></li>
                        <li><a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Digital India</a></li>
                        <li><a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MyGov.in</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
                <p>© 2025 InternFinder. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                    <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
);

export default function Dashboard() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useState({ name: "Intern", email: "" });

    // Extended mock data for internships (12 items)
    const recommendedInternships = [
        { id: 1, title: "Product Management Intern", company: "Google", location: "Bangalore", stipend: "₹45,000/mo", type: "Full-time" },
        { id: 2, title: "Software Engineering Intern", company: "Microsoft", location: "Hyderabad", stipend: "₹50,000/mo", type: "Remote" },
        { id: 3, title: "UX Design Intern", company: "Adobe", location: "Noida", stipend: "₹40,000/mo", type: "Hybrid" },
        { id: 4, title: "Data Science Intern", company: "Amazon", location: "Bangalore", stipend: "₹55,000/mo", type: "Full-time" },
        { id: 5, title: "Frontend Developer Intern", company: "Swiggy", location: "Bangalore", stipend: "₹35,000/mo", type: "Full-time" },
        { id: 6, title: "Marketing Intern", company: "Zomato", location: "Gurgaon", stipend: "₹25,000/mo", type: "Hybrid" },
        { id: 7, title: "AI/ML Intern", company: "Ola", location: "Bangalore", stipend: "₹45,000/mo", type: "Remote" },
        { id: 8, title: "Business Analyst Intern", company: "Paytm", location: "Noida", stipend: "₹30,000/mo", type: "Full-time" },
        { id: 9, title: "Cyber Security Intern", company: "Infosys", location: "Mysore", stipend: "₹20,000/mo", type: "Full-time" },
        { id: 10, title: "Cloud Engineer Intern", company: "Wipro", location: "Bangalore", stipend: "₹22,000/mo", type: "Hybrid" },
        { id: 11, title: "Content Writer Intern", company: "InMobi", location: "Bangalore", stipend: "₹15,000/mo", type: "Remote" },
        { id: 12, title: "HR Intern", company: "Flipkart", location: "Bangalore", stipend: "₹20,000/mo", type: "Full-time" },
    ];

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

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#130d1c] dark:text-white transition-colors duration-300 min-h-screen flex flex-col relative overflow-x-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 gradient-bg">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
                <header className="max-w-[1200px] mx-auto glass rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-white/20 dark:border-white/10">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>

                        <h2 className="text-lg font-bold tracking-tight">InternFinder</h2>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {[
                            { label: "Dashboard", path: "/home", icon: "dashboard" },
                            { label: "Internships", path: "/resume", icon: "travel_explore" }, // Renamed from Explore
                            { label: "Applied", path: "/saved", icon: "assignment_turned_in" }, // Changed from Saved
                            { label: "Profile", path: "/profile", icon: "person" },
                            { label: "About", path: "/about", icon: "info" }, // Added About
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${item.path === "/home"
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "hover:bg-black/5 dark:hover:bg-white/10"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" onClick={toggleDarkMode}>
                            <span className="material-symbols-outlined text-[20px]">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                            {user.name && user.name.charAt(0)}
                        </div>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="relative z-10 pt-24 pb-6 px-4">
                <div className="max-w-[1200px] mx-auto">

                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
                    >
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black mb-2">Hello, {user.name ? user.name.split(' ')[0] : 'Intern'}! </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Ready to find your dream internship today?</p>
                        </div>
                        <button
                            className="bg-white dark:bg-white/10 text-primary dark:text-white font-bold px-6 py-3 rounded-xl shadow-lg border border-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
                            onClick={() => navigate('/resume')}
                        >
                            <span className="material-symbols-outlined">search</span>
                            Find Internships
                        </button>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { label: "Applied", value: "12", icon: "send", color: "bg-blue-500" },
                            { label: "Saved", value: "5", icon: "bookmark", color: "bg-pink-500" },
                            { label: "Interviews", value: "2", icon: "video_call", color: "bg-emerald-500" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-6 rounded-3xl flex items-center gap-6 hover:-translate-y-1 transition-transform cursor-default"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                    <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-4xl font-black mb-1">{stat.value}</p>
                                    <p className="font-bold opacity-60 uppercase tracking-widest text-xs">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* NEW SECTION: Profile Strength & Events */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Profile Strength Card (2/3 width) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-2 glass p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">bar_chart</span>
                                <h3 className="text-xl font-bold">Profile Strength</h3>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Completion</span>
                                <span className="font-black text-purple-600 dark:text-purple-400">85%</span>
                            </div>
                            <div className="w-full h-3 bg-white dark:bg-white/10 rounded-full overflow-hidden mb-8">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[85%] rounded-full shadow-lg shadow-purple-500/30"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl flex items-center gap-4 border border-purple-100 dark:border-purple-800">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-xl">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Resume Verified</p>
                                        <p className="text-xs opacity-60">Updated 2 days ago</p>
                                    </div>
                                </div>
                                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl flex items-center gap-4 border border-amber-100 dark:border-amber-800">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-800 text-amber-600 dark:text-amber-300 rounded-xl">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Missing Portfolio</p>
                                        <p className="text-xs opacity-60">Add link to boost visibility</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Upcoming Events Card (1/3 width) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="glass p-8 rounded-3xl"
                        >
                            <h3 className="text-xl font-bold mb-6">Upcoming Events</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl p-2 text-center min-w-[60px]">
                                        <span className="block text-xs font-bold uppercase">Oct</span>
                                        <span className="block text-xl font-black">24</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Interview with Nexus</p>
                                        <p className="text-xs opacity-60 mt-1">Virtual • 2:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl p-2 text-center min-w-[60px]">
                                        <span className="block text-xs font-bold uppercase">Nov</span>
                                        <span className="block text-xl font-black">02</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">PM Workshop #4</p>
                                        <p className="text-xs opacity-60 mt-1">Live Stream</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-8 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold py-3 rounded-xl transition-colors text-sm">
                                View Calendar
                            </button>
                        </motion.div>
                    </div>

                    {/* Recommended Section */}
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            Recommended for you
                        </h2>
                        <button className="text-primary font-bold hover:underline">View All</button>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {recommendedInternships.map((internship) => (
                            <motion.div
                                key={internship.id}
                                variants={itemVariants}
                                className="glass p-6 rounded-3xl flex flex-col h-full hover:border-primary/50 transition-colors group cursor-pointer"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-2xl font-bold shadow-sm">
                                        {internship.company.charAt(0)}
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                        {internship.type}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{internship.title}</h3>
                                <p className="text-sm opacity-60 mb-4">{internship.company}</p>

                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {internship.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                                        <span className="material-symbols-outlined text-sm">payments</span>
                                        {internship.stipend}
                                    </div>
                                    <button
                                        className="w-full mt-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                                        onClick={(e) => { e.stopPropagation(); toast.success(`Applied to ${internship.company}`); }}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}