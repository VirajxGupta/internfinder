import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

// Reusable Footer Component
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initial User State
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    storedUser || {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Full-stack developer passionate about AI and clean UI design.",
      photo: null,
      resumeLink: "",
      portfolioLink: ""
    }
  );

  useEffect(() => {
    // Dark Mode Logic
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    // Ensure user is loaded from local storage if available there
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved) setUser(prev => ({ ...prev, ...saved }));
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

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Profile updated successfully! ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, photo: reader.result }));
        toast.success("Photo updated!");
      };
      reader.readAsDataURL(file);
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
            <div className="size-8 text-white bg-primary rounded-lg flex items-center justify-center p-1.5 shadow-lg shadow-primary/30">
              <img src={AshokChakra} alt="Ashok Stambh" className="w-full h-full" style={{ filter: "invert(100%)" }} />
            </div>
            <h2 className="text-lg font-bold tracking-tight">InternFinder</h2>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Dashboard", path: "/home", icon: "dashboard" },
              { label: "Internships", path: "/resume", icon: "travel_explore" },
              { label: "Applied", path: "/saved", icon: "assignment_turned_in" },
              { label: "Profile", path: "/profile", icon: "person" },
              { label: "About", path: "/about", icon: "info" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${item.path === "/profile"
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
      <main className="relative z-10 pt-24 pb-6 px-4 container mx-auto max-w-[1000px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >

          <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 mt-4">
            {/* Left Side: Avatar & Stats */}
            <div className="flex flex-col items-center gap-4 w-full md:w-auto">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden bg-white">
                  {user.photo ? (
                    <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                      <span className="material-symbols-outlined text-6xl">person</span>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors">
                  <span className="material-symbols-outlined text-xl">photo_camera</span>
                  <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
                </label>
              </div>

              <div className="w-full text-center">
                <h2 className="text-2xl font-black">{user.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Intern / Student</p>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 mt-2">
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl text-center border border-white/20">
                  <span className="block text-2xl font-bold">85%</span>
                  <span className="text-xs uppercase opacity-60 font-bold">Profile</span>
                </div>
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl text-center border border-white/20">
                  <span className="block text-2xl font-bold">12</span>
                  <span className="text-xs uppercase opacity-60 font-bold">Applied</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 w-full space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">edit_square</span>
                  Edit Profile
                </h3>
                <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                  Logout
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3.5 opacity-40">person</span>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3.5 opacity-40">mail</span>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70">Bio</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3.5 opacity-40">description</span>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              {/* NEW SECTION: Resume & Portfolio */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">link</span>
                  Professional Links
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Resume / CV Link</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3.5 opacity-40">attach_file</span>
                      <input
                        type="url"
                        value={user.resumeLink || ""}
                        onChange={(e) => setUser({ ...user, resumeLink: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        placeholder="Google Drive, LinkedIn..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Portfolio Link</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3.5 opacity-40">language</span>
                      <input
                        type="url"
                        value={user.portfolioLink || ""}
                        onChange={(e) => setUser({ ...user, portfolioLink: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        placeholder="GitHub, Personal Web..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSave}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">save</span>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
