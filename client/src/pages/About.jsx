import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { LayoutDashboard, Compass, CheckCircle, User, Info, Sun, Moon, Users, MapPin, Mail, Phone, TrendingUp, Briefcase, Award, Globe, Zap, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

// Team data
const teamMembers = [
  { name: "Viraj Gupta", role: "FullStack Developer", photo: null },
  { name: "Nihari Shrivastava", role: "Frontend Developer", photo: null },
  { name: "Pulastya Bhagwat", role: "ML Developer", photo: null },
];

// Footer Component
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
    <div className="bg-slate-50 dark:bg-[#0B1120] font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-grow">

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white"
          >
            About <span className="text-[#6B629D]">InternFinder</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Empowering the next generation of Indian professionals with AI-driven career opportunities.
          </motion.p>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2 text-slate-900 dark:text-white">
            <Users className="text-[#6B629D]" />
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-[#6B629D]/30 transition-all w-full max-w-sm text-center group"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-200 dark:border-slate-700 group-hover:border-[#6B629D] transition-colors">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-slate-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-[#6B629D] font-medium text-sm bg-[#6B629D]/10 px-3 py-1 rounded-full inline-block">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-20">
          <div className="bg-[#6B629D] rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">
                  At InternFinder, we believe that talent is universal, but opportunities are not. Our mission is to democratize access to high-quality internships for students across India, regardless of their geographical location or college tier.
                </p>
                <p className="text-blue-100 text-lg leading-relaxed">
                  By leveraging AI-driven recommendations, we connect aspiring professionals with the right opportunities, fostering a skilled workforce ready for the challenges of tomorrow.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "10k+", label: "Students Placed" },
                  { val: "500+", label: "Partners" },
                  { val: "98%", label: "Success Rate" },
                  { val: "24/7", label: "Support" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20">
                    <span className="block text-3xl font-bold text-white mb-2">{stat.val}</span>
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-white">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Visit Us</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">MITS-DU<br /> Race Course road, Gwalior - 474002</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email Us</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">virajgupta.work@gmail.com<br /></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Call Us</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">1800-123-456 (Toll Free)<br />Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Send us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent successfully!"); e.target.reset(); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6B629D] transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Email</label>
                    <input type="email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6B629D] transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Subject</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6B629D] transition-all" placeholder="How can we help?" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-500">Message</label>
                  <textarea className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6B629D] transition-all min-h-[120px]" placeholder="Your message here..."></textarea>
                </div>
                <button className="w-full bg-[#6B629D] text-white font-bold py-3 rounded-lg hover:bg-[#5a5285] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#6B629D]/20">
                  <Send size={18} />
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
