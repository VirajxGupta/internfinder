import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import AshokChakra from "../assets/Ashoka_Chakra.svg"; // Still needed for Navbar logo maybe? No, nav has text/different logo. Check HomePage2 Navbar

// Mock images (replace if needed, or keep existing imports if they work)
import pulastyaPhoto from "../assets/pulastya.png";
import nihariPhoto from "../assets/Nihari.jpg";
import virajPhoto from "../assets/viraj.jpg";

const teamMembers = [
  { name: "Viraj Gupta", role: "FullStack Developer", photo: virajPhoto },
  { name: "Nihari Shrivastava", role: "Frontend Developer", photo: nihariPhoto },
  { name: "Pulastya Bhagwat", role: "ML Developer", photo: pulastyaPhoto },
];

// Cleaned Footer Component
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

export default function AboutUs() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ name: "Intern", email: "" });

  useEffect(() => {
    // Dark Mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    // User
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${item.path === "/about"
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
      <main className="relative z-10 pt-32 pb-20 px-4 flex-grow container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-60 max-w-2xl mx-auto"
          >
            We are a professional team dedicated to building intuitive apps for everyone.
          </motion.p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">groups</span>
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl flex flex-col items-center text-center w-full max-w-sm hover:translate-y-[-5px] transition-transform duration-300 border-2 border-transparent hover:border-primary/20"
              >
                <div className="w-24 h-24 rounded-full p-1 border-2 border-primary mb-4 shadow-xl relative group">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black mb-6">Our Mission</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-6">
                  At InternFinder, we believe that talent is universal, but opportunities are not. Our mission is to democratize access to high-quality internships for students across India, regardless of their geographical location or college tier.
                </p>
                <p className="text-lg opacity-80 leading-relaxed">
                  By leveraging AI-driven recommendations, we connect aspiring professionals with the right opportunities, fostering a skilled workforce ready for the challenges of tomorrow.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl text-center border border-white/20">
                  <span className="block text-4xl font-black text-primary mb-2">10k+</span>
                  <span className="text-sm font-bold opacity-60 uppercase">Students Placed</span>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl text-center border border-white/20">
                  <span className="block text-4xl font-black text-purple-600 mb-2">500+</span>
                  <span className="text-sm font-bold opacity-60 uppercase">Partner Companies</span>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl text-center border border-white/20">
                  <span className="block text-4xl font-black text-pink-600 mb-2">98%</span>
                  <span className="text-sm font-bold opacity-60 uppercase">Success Rate</span>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl text-center border border-white/20">
                  <span className="block text-4xl font-black text-orange-600 mb-2">24/7</span>
                  <span className="text-sm font-bold opacity-60 uppercase">Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Visit Us</h4>
                    <p className="opacity-70 text-sm">MITS-DU<br /> Race Course road, Gwalior - 474002</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="opacity-70 text-sm">virajgupta.work@gmail.com<br /></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="opacity-70 text-sm">1800-123-456 (Toll Free)<br />Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent successfully!"); e.target.reset(); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase opacity-60">Name</label>
                    <input type="text" className="w-full bg-white/50 dark:bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase opacity-60">Email</label>
                    <input type="email" className="w-full bg-white/50 dark:bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase opacity-60">Subject</label>
                  <input type="text" className="w-full bg-white/50 dark:bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="How can we help?" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase opacity-60">Message</label>
                  <textarea className="w-full bg-white/50 dark:bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px]" placeholder="Your message here..."></textarea>
                </div>
                <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
