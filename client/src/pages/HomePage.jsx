import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="bg-background-light dark:bg-background-dark font-display text-[#130d1c] dark:text-white transition-colors duration-300 min-h-screen">
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[960px] px-4">
                <header className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="size-8 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"></path>
                                <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">InternFinder</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#eligibility" onClick={(e) => { e.preventDefault(); document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' }); }}>Eligibility</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#benefits" onClick={(e) => { e.preventDefault(); document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }}>Benefits</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#partners" onClick={(e) => { e.preventDefault(); document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' }); }}>Partners</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" onClick={toggleDarkMode}>
                            <span className="material-symbols-outlined text-[20px]">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        <button
                            className="bg-primary text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </header>
            </div>
            <main className="pt-24 pb-8 px-4 md:px-0">
                <div className="max-w-[1100px] mx-auto">
                    <section className="relative mb-20">
                        <div className="rounded-3xl overflow-hidden relative min-h-[560px] flex items-center justify-center p-8 bg-gradient-to-br from-[#130d1c] via-[#4d21b3] to-[#833cf6]" data-alt="Dynamic deep indigo and violet gradient pattern with geometric shapes">
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                            <div className="relative z-10 text-center max-w-3xl">
                                <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6">
                                    Bridge the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">Learning and Industry</span>
                                </h1>
                                <p className="text-white/80 text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
                                    Experience the future of professional growth with ultra-modern placement solutions designed for the next generation of leaders.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <button
                                        className="bg-white text-primary text-base font-bold h-14 px-8 rounded-xl shadow-lg hover:bg-opacity-90 transition-all"
                                        onClick={() => navigate('/signup')}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="partners" className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass glow-card rounded-2xl p-8 flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined text-3xl">groups</span>
                                </div>
                                <p className="text-sm font-semibold opacity-60 uppercase tracking-widest">Total Candidates</p>
                                <p className="text-3xl md:text-4xl font-black">1,25,000+</p>
                                <p className="text-[#078845] text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> +15% this month
                                </p>
                            </div>
                            <div className="glass glow-card rounded-2xl p-8 flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined text-3xl">business</span>
                                </div>
                                <p className="text-sm font-semibold opacity-60 uppercase tracking-widest">Partner Firms</p>
                                <p className="text-3xl md:text-4xl font-black">500+</p>
                                <p className="text-[#078845] text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> +8% increase
                                </p>
                            </div>
                            <div className="glass glow-card rounded-2xl p-8 flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined text-3xl">work</span>
                                </div>
                                <p className="text-sm font-semibold opacity-60 uppercase tracking-widest">Active Internships</p>
                                <p className="text-3xl md:text-4xl font-black">45,000+</p>
                                <p className="text-[#078845] text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> +12% growth
                                </p>
                            </div>
                        </div>
                    </section>
                    <section id="eligibility" className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">Are you Eligible?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-[#d8cee8] dark:border-white/10 hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-primary mb-4 block text-3xl transition-transform group-hover:scale-110">person</span>
                                <h3 className="font-bold text-lg mb-2">Age Criteria</h3>
                                <p className="text-sm opacity-70">Aged 18-25 years at the time of application.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-[#d8cee8] dark:border-white/10 hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-primary mb-4 block text-3xl transition-transform group-hover:scale-110">school</span>
                                <h3 className="font-bold text-lg mb-2">Academic Status</h3>
                                <p className="text-sm opacity-70">Final year students or recent graduates from recognized institutions.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-[#d8cee8] dark:border-white/10 hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-primary mb-4 block text-3xl transition-transform group-hover:scale-110">public</span>
                                <h3 className="font-bold text-lg mb-2">Nationality</h3>
                                <p className="text-sm opacity-70">Must be an Indian Citizen with valid identification.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-[#d8cee8] dark:border-white/10 hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-primary mb-4 block text-3xl transition-transform group-hover:scale-110">bolt</span>
                                <h3 className="font-bold text-lg mb-2">Skill Proficiency</h3>
                                <p className="text-sm opacity-70">Demonstrable basic domain knowledge and willingness to learn.</p>
                            </div>
                        </div>
                    </section>
                    <section id="benefits" className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">Core Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
                            <div className="md:col-span-2 md:row-span-2 bento-item bg-primary text-white rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden">
                                <div className="absolute top-8 right-8 text-white/20">
                                    <span className="material-symbols-outlined text-[120px]">rocket_launch</span>
                                </div>
                                <h3 className="text-3xl font-black mb-4">Fast-Track Career Growth</h3>
                                <p className="text-white/80 max-w-md">Get direct exposure to industry-leading projects and mentorship from top-tier professionals in your field.</p>
                                <button className="mt-8 bg-white text-primary font-bold px-6 py-3 rounded-xl self-start">Learn More</button>
                            </div>
                            <div className="md:col-span-2 md:row-span-1 bento-item glass rounded-3xl p-8 flex items-center gap-6">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-3xl">currency_rupee</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Monthly Stipend</h3>
                                    <p className="text-sm opacity-70">Generous monthly allowance to support your professional journey.</p>
                                </div>
                            </div>
                            <div className="md:col-span-1 md:row-span-1 bento-item glass rounded-3xl p-8 flex flex-col justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3">verified</span>
                                <h3 className="font-bold">Certification</h3>
                                <p className="text-xs opacity-70 mt-2">Government recognized experience certificate.</p>
                            </div>
                            <div className="md:col-span-1 md:row-span-1 bento-item bg-white dark:bg-white/5 border border-primary/20 rounded-3xl p-8 flex flex-col justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3">handshake</span>
                                <h3 className="font-bold">Networking</h3>
                                <p className="text-xs opacity-70 mt-2">Connect with 500+ partner firms.</p>
                            </div>
                        </div>
                    </section>
                    <section className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">What Interns Say</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 glass p-8 rounded-3xl relative">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-serif italic">"</div>
                                <p className="text-lg italic mb-6 opacity-80">"The InternFinder Scheme transformed my career. The hands-on experience at a top tech firm was exactly what I needed after college."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-primary p-0.5">
                                        <img alt="Professional portrait of male intern" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAprOthUi8oQnZQLRB__l2gMwvzPtr5iSA6fNQILcNchhpQgblFeJYRaeFrXOQcsl1KccHdK7HqgnreSWH3SKi9XToKjhcbVL85MQ5PrM7WJaIGaEp7yDBF07eUJZFPufd-r-tRPUkAH3mdn481oo12q1vkiN4ODRWp0lY3QrQkJkNBTv1Najz3gN19sFyf4jSs3gBp8O89Lew9TBLg8GiKqeZBxaCHjDfcJjQH37B0_O3lop2AunBQiXsKbTQrKOx1ENlkiggbWk-q" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Arjun Mehta</h4>
                                        <p className="text-xs opacity-60">Software Engineer Intern @ TechCorp</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 glass p-8 rounded-3xl relative">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-serif italic">"</div>
                                <p className="text-lg italic mb-6 opacity-80">"I learned more in 3 months of this internship than in 4 years of theory. The mentorship program is truly world-class."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-primary p-0.5">
                                        <img alt="Professional portrait of female intern" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfoGUBXcvk41OVYrX0Du6jeCKpCidd3vgprfJVeZKwJJuAPZ9lLTqkVcS9dxlrS4nAdN1IIlXZF5TnnJH38b0nQBk_SXhRnBYlB7RBuqAPqPjMUWsxcCsEFBgjIZqqBo-PCGq1s5gbZSOotpIbMTUHM3cAqWz450p6ERnImeIEatsOG9Lew9TBLg8GiKqeZBxaCHjDfcJjQH37B0_O3lop2AunBQiXsKbTQrKOx1ENlkiggbWk-q" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Priya Sharma</h4>
                                        <p className="text-xs opacity-60">Product Design Intern @ CreativeFlow</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="bg-white dark:bg-black/20 py-12 border-t border-black/5 dark:border-white/5">
                <div className="max-w-[1100px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-6 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-base font-bold">InternFinder</h2>
                    </div>
                    <div className="flex gap-8 text-sm opacity-60">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
                    </div>
                    <p className="text-xs opacity-40">© 2025 InternFinder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
