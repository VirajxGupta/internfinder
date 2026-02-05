import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LayoutDashboard, Compass, CheckCircle, User, Info, Sun, Moon, Search, Send, Bookmark, Video, BarChart, Verified, AlertTriangle, Sparkles, MapPin, IndianRupee, Mail, Phone, Calendar, ArrowRight, Bell } from "lucide-react";
import Navbar from "../components/Navbar";

// Footer Component (Internal definition for self-containment)
const Footer = () => (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        InternFinder
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        Connecting top talent with India's premier authorized internships.
                        <br />
                        <span className="text-xs opacity-70">An initiative by the Ministry of Corporate Affairs.</span>
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Platform</h3>
                    <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Browse Internships</a></li>
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Eligibility Check</a></li>
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Application Status</a></li>
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Help Center</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Contact</h3>
                    <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <li className="flex items-center gap-2">
                            <Mail size={14} />
                            support@internfinder.gov.in
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={14} />
                            1800-123-456
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Legal</h3>
                    <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Terms of Use</a></li>
                        <li><a href="#" className="hover:text-[#6B629D] transition-colors">Government Compliance</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
                <p>&copy; 2025 InternFinder. Government of India.</p>
            </div>
        </div>
    </footer>
);

export default function Dashboard() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useState({ name: "User", email: "" });

    // Extended mock data for internships
    const recommendedInternships = [
        { id: 1, title: "Product Management Fellow", company: "Google India", location: "Bangalore", stipend: "₹45,000/mo", type: "Full-time" },
        { id: 2, title: "Software Engineer Intern", company: "Microsoft IDC", location: "Hyderabad", stipend: "₹50,000/mo", type: "Remote" },
        { id: 3, title: "UX Research Intern", company: "Adobe Systems", location: "Noida", stipend: "₹40,000/mo", type: "Hybrid" },
        { id: 4, title: "Data Science Intern", company: "Amazon Development", location: "Bangalore", stipend: "₹55,000/mo", type: "Full-time" },
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

    return (
        <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">

            {/* Navbar */}
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400">Welcome back, {user.name}. Here's your daily activity overview.</p>
                    </div>
                    <button
                        onClick={() => navigate('/resume')}
                        className="bg-[#6B629D] hover:bg-[#5a5285] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm shadow-[#6B629D]/20 transition-all flex items-center gap-2"
                    >
                        <Search size={18} />
                        Find Opportunities
                    </button>
                </div>

                {/* Stats Grid - Clean Professional Look */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: "Active Applications", value: "12", icon: Send, color: "text-[#6B629D] bg-[#6B629D]/10 dark:bg-[#6B629D]/20" },
                        { label: "Saved Internships", value: "5", icon: Bookmark, color: "text-[#949D62] bg-[#949D62]/10 dark:bg-[#949D62]/20" },
                        { label: "Scheduled Interviews", value: "2", icon: Video, color: "text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="flex items-center text-xs font-medium text-[#949D62] bg-[#949D62]/10 dark:bg-[#949D62]/20 px-2 py-1 rounded">
                                    +12% vs last week
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Profile & Analytics (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Profile Strength */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-lg">Profile Completeness</h3>
                                <button onClick={() => navigate('/profile')} className="text-sm text-[#6B629D] font-medium hover:underline">Edit Profile</button>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Score</span>
                                    <span className="text-sm font-bold text-[#6B629D]">85%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#6B629D] w-[85%] rounded-full"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-[#949D62]/10 dark:bg-[#949D62]/20 border border-[#949D62]/20 dark:border-[#949D62]/30 flex items-start gap-4">
                                    <div className="text-[#949D62] mt-1"><Verified size={20} /></div>
                                    <div>
                                        <p className="font-semibold text-sm">Resume Verified</p>
                                        <p className="text-xs text-slate-500 mt-1">Your resume passed the ATS screening check.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 flex items-start gap-4">
                                    <div className="text-orange-500 mt-1"><AlertTriangle size={20} /></div>
                                    <div>
                                        <p className="font-semibold text-sm">Portfolio Missing</p>
                                        <p className="text-xs text-slate-500 mt-1">Add a portfolio link to increase visibility by 20%.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Opportunities */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Sparkles className="text-[#6B629D]" size={20} />
                                    Recommended Opportunities
                                </h2>
                                <button onClick={() => navigate('/resume')} className="text-sm text-[#6B629D] font-medium hover:underline flex items-center gap-1">
                                    View All <ArrowRight size={14} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {recommendedInternships.map((job) => (
                                    <div key={job.id} onClick={() => { toast.success("Applied to " + job.company) }} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#6B629D] transition-all cursor-pointer group">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:bg-[#6B629D]/10 dark:group-hover:bg-[#6B629D]/20 group-hover:text-[#6B629D] transition-colors">
                                                {job.company.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                                                {job.type}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#6B629D] transition-colors">{job.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{job.company}</p>

                                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <IndianRupee size={14} /> {job.stipend}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Events (1/3) */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="font-semibold text-lg mb-6">Upcoming Schedule</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#6B629D]/10 dark:bg-[#6B629D]/20 rounded-lg text-[#6B629D] dark:text-[#6B629D]">
                                        <span className="text-xs font-bold uppercase">Oct</span>
                                        <span className="text-lg font-bold">24</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Interview with Nexus</h4>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <Video size={12} /> Google Meet • 2:00 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-400">
                                        <span className="text-xs font-bold uppercase">Nov</span>
                                        <span className="text-lg font-bold">02</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Product Mgmt Workshop</h4>
                                        <p className="text-xs text-slate-500 mt-1">Live Stream</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                View Full Calendar
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-[#6B629D] to-[#5a5285] rounded-xl p-6 text-white shadow-lg shadow-[#6B629D]/20">
                            <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
                            <p className="text-white/90 text-sm mb-6 leading-relaxed">
                                Get access to premium internship listings, AI resume reviews, and priority support.
                            </p>
                            <button className="w-full py-2.5 bg-white text-[#6B629D] rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                View Plans
                            </button>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}