import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Sun, Moon, Rocket, Users, Building2, Briefcase, TrendingUp,
    User, GraduationCap, Globe, Zap, BadgeIndianRupee, Verified, Handshake, ArrowRight, CheckCircle, Smartphone
} from "lucide-react";

export default function HomePage() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
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
        <div className="bg-slate-50 dark:bg-[#0B1120] font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-[#6B629D] rounded-lg flex items-center justify-center text-white font-bold">IF</div>
                        <h2 className="text-xl font-semibold tracking-tight">InternFinder</h2>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium hover:text-[#6B629D] transition-colors" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
                        <a className="text-sm font-medium hover:text-[#6B629D] transition-colors" href="#eligibility" onClick={(e) => { e.preventDefault(); document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' }); }}>Eligibility</a>
                        <a className="text-sm font-medium hover:text-[#6B629D] transition-colors" href="#benefits" onClick={(e) => { e.preventDefault(); document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }}>Benefits</a>
                        <a className="text-sm font-medium hover:text-[#6B629D] transition-colors" href="#partners" onClick={(e) => { e.preventDefault(); document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' }); }}>Partners</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={toggleDarkMode}>
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="bg-[#6B629D] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#5a5285] transition-colors shadow-lg shadow-[#6B629D]/20"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6B629D]/10 text-[#6B629D] rounded-full text-sm font-bold mb-6 border border-[#6B629D]/20">
                            <Rocket size={16} />
                            Platform v2.0 Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                            Bridge the Gap Between <br />
                            <span className="text-[#6B629D]">Learning & Industry</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Experience the future of professional growth with AI-driven internship recommendations designed for the next generation of leaders.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="bg-[#6B629D] text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-[#6B629D]/20 hover:bg-[#5a5285] transition-all flex items-center justify-center gap-2"
                                onClick={() => navigate('/signup')}
                            >
                                Get Started Free <ArrowRight size={20} />
                            </button>
                            <button
                                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-lg font-bold px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                onClick={() => navigate('/about')}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 inset-x-0 h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6B629D]/5 via-slate-50/0 to-slate-50/0 dark:from-[#6B629D]/10 dark:via-slate-900/0 dark:to-slate-900/0"></div>
                </section>

                {/* Partners Stats */}
                <section id="partners" className="py-20 bg-white dark:bg-[#0f1629] border-y border-slate-100 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-2 relative overflow-hidden group hover:border-[#6B629D]/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] mb-4">
                                    <Users size={28} />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 dark:text-white">1.2L+</p>
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Candidates Registered</p>
                                <div className="absolute top-4 right-4 flex items-center gap-1 text-[#949D62] text-xs font-bold bg-[#949D62]/10 px-2 py-1 rounded">
                                    <TrendingUp size={12} /> +15%
                                </div>
                            </div>
                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-2 relative overflow-hidden group hover:border-[#6B629D]/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] mb-4">
                                    <Building2 size={28} />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 dark:text-white">500+</p>
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Partner Companies</p>
                                <div className="absolute top-4 right-4 flex items-center gap-1 text-[#949D62] text-xs font-bold bg-[#949D62]/10 px-2 py-1 rounded">
                                    <TrendingUp size={12} /> +8%
                                </div>
                            </div>
                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-2 relative overflow-hidden group hover:border-[#6B629D]/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] mb-4">
                                    <Briefcase size={28} />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 dark:text-white">45k+</p>
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Active Internships</p>
                                <div className="absolute top-4 right-4 flex items-center gap-1 text-[#949D62] text-xs font-bold bg-[#949D62]/10 px-2 py-1 rounded">
                                    <TrendingUp size={12} /> +12%
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eligibility Grid */}
                <section id="eligibility" className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Eligibility Criteria</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Simple requirements to ensure you are ready for the professional world.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: User, title: "Age Limit", desc: "18-25 years at time of application" },
                                { icon: GraduationCap, title: "Education", desc: "Final year student or recent graduate" },
                                { icon: Globe, title: "Nationality", desc: "Indian Citizen with valid ID" },
                                { icon: Zap, title: "Skills", desc: "Basic domain knowledge required" }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#6B629D] hover:shadow-lg transition-all group">
                                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#6B629D] transition-colors">
                                        <item.icon size={24} className="text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Bento Grid */}
                <section id="benefits" className="py-24 bg-slate-50 dark:bg-[#0f1629]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Join InternFinder?</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Unlock exclusive benefits designed to jumpstart your career.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Large Card */}
                            <div className="md:col-span-2 bg-[#6B629D] rounded-3xl p-10 text-white relative overflow-hidden flex flex-col justify-end min-h-[300px]">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Rocket size={200} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold mb-4">Accelerated Career Growth</h3>
                                    <p className="text-blue-100 text-lg max-w-md mb-8">Get priority access to premium internships and mentorship from industry leaders.</p>
                                    <button className="bg-white text-[#6B629D] px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                                        Explore Opportunities
                                    </button>
                                </div>
                            </div>

                            {/* Side Cards */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                                <div className="w-14 h-14 bg-[#949D62]/10 rounded-2xl flex items-center justify-center text-[#949D62] mb-6">
                                    <BadgeIndianRupee size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Paid Stipends</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Earn while you learn with competitive monthly allowances.</p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                    <Verified size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verified Certificates</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Get government-recognized certification upon completion.</p>
                            </div>

                            <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-8">
                                <div className="hidden sm:block w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                                    <Handshake size={40} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Industry Networking</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Connect with hiring managers from 500+ top companies directly through our platform events.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Success Stories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-[#0f1629] p-10 rounded-3xl border border-slate-100 dark:border-slate-800 relative">
                                <div className="absolute -top-5 left-10 text-6xl text-[#6B629D] font-serif leading-none opacity-20">"</div>
                                <p className="text-lg text-slate-600 dark:text-slate-300 italic mb-8 relative z-10">
                                    "The InternFinder platform completely changed my career trajectory. I landed a role at a top fintech company within 2 weeks of applying."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        <User className="w-full h-full p-2 text-slate-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Arjun Mehta</h4>
                                        <p className="text-xs font-semibold text-[#6B629D]">Software Engineer @ PayTM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#0f1629] p-10 rounded-3xl border border-slate-100 dark:border-slate-800 relative">
                                <div className="absolute -top-5 left-10 text-6xl text-[#6B629D] font-serif leading-none opacity-20">"</div>
                                <p className="text-lg text-slate-600 dark:text-slate-300 italic mb-8 relative z-10">
                                    "I learned more in 3 months of this internship than in 4 years of college. The mentorship program is world-class."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        <User className="w-full h-full p-2 text-slate-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Priya Sharma</h4>
                                        <p className="text-xs font-semibold text-[#6B629D]">Product Designer @ Zomato</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#6B629D] rounded flex items-center justify-center text-white text-xs font-bold">IF</div>
                            <span className="font-bold text-slate-900 dark:text-white">InternFinder</span>
                        </div>
                        <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
                            <a href="#" className="hover:text-[#6B629D] transition-colors">Privacy</a>
                            <a href="#" className="hover:text-[#6B629D] transition-colors">Terms</a>
                            <a href="#" className="hover:text-[#6B629D] transition-colors">Support</a>
                        </div>
                        <p className="text-xs text-slate-400">© 2025 Government of India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
