import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LayoutDashboard, Compass, CheckCircle, User, Info, Sun, Moon, Camera, Edit, Mail, FileText, Link, Paperclip, Globe, Save, Award, MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

// Reusable Footer Component
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initial User State
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    storedUser || {
      name: "Viraj Gupta",
      email: "viraj.gupta@example.com",
      bio: "Aspiring Full Stack Developer with a passion for building scalable web applications. Currently learning React and Node.js.",
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
    toast.success("Profile updated successfully! \u2705");
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
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Profile</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your personal information and resume settings.</p>
          </div>
          <button onClick={handleLogout} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-red-200 dark:border-red-900/30">
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Avatar & Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-100">
                  {user.photo ? (
                    <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2.5 bg-[#6B629D] text-white rounded-full cursor-pointer shadow-lg hover:bg-[#5a5285] transition-colors">
                  <Camera size={16} />
                  <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
                </label>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{user.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Student / Intern</p>

              <div className="w-full grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="block text-xl font-bold text-[#6B629D]">85%</span>
                  <span className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Score</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="block text-xl font-bold text-[#949D62]">12</span>
                  <span className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Applied</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Mini-Card (Optional) */}
            <div className="bg-gradient-to-br from-[#6B629D] to-[#5a5285] p-6 rounded-xl shadow-lg shadow-[#6B629D]/20 text-white">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Award size={20} />
                Pro Tip
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Complete your bio and add a portfolio link to boost your profile visibility by 2x.
              </p>
            </div>
          </div>

          {/* Right Column: Edit Form */}
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <Edit size={18} className="text-[#6B629D]" />
                Personal Information
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-400"><User size={18} /></span>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B629D]/50 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-400"><Mail size={18} /></span>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B629D]/50 transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bio</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400"><FileText size={18} /></span>
                    <textarea
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B629D]/50 transition-all min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <Link size={18} className="text-[#6B629D]" />
                Professional Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Resume / CV Link</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400"><Paperclip size={18} /></span>
                    <input
                      type="url"
                      value={user.resumeLink || ""}
                      onChange={(e) => setUser({ ...user, resumeLink: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B629D]/50 transition-all"
                      placeholder="Google Drive, Dropbox..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Portfolio Link</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400"><Globe size={18} /></span>
                    <input
                      type="url"
                      value={user.portfolioLink || ""}
                      onChange={(e) => setUser({ ...user, portfolioLink: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B629D]/50 transition-all"
                      placeholder="GitHub, Website..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                className="bg-[#6B629D] hover:bg-[#5a5285] text-white px-8 py-3 rounded-lg font-bold shadow-md shadow-[#6B629D]/20 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save size={18} />
                Save Profile
              </button>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
