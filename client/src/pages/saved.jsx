import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

// Footer Component
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

export default function SavedInternships() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ name: "Intern", email: "" });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock Data (Preserved)
  const savedInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechVision Pvt. Ltd.",
      location: "Remote",
      sector: "Technology",
      duration: "3 Months",
      stipend: "₹10,000/month",
      postedOn: "Sept 5, 2025",
      description:
        "We are looking for a passionate Frontend Developer Intern to join our tech team. You will work on building modern, responsive web applications using React, JavaScript, and Material-UI.",
      skills: ["React", "JavaScript", "UI/UX", "Git", "Teamwork"],
      responsibilities: [
        "Develop UI components using React & MUI",
        "Collaborate with backend developers",
        "Fix bugs and optimize performance",
      ],
    },
    {
      id: 2,
      title: "Digital Marketing Intern",
      company: "Growthify Marketing",
      location: "Hybrid",
      sector: "Marketing",
      duration: "2 Months",
      stipend: "₹8,000/month",
      postedOn: "Sept 3, 2025",
      description:
        "Join our marketing team to learn SEO, social media management, and ad campaigns. Work on real projects and boost your portfolio.",
      skills: ["SEO", "Social Media", "Content Writing"],
      responsibilities: [
        "Manage social media accounts",
        "Assist in running ad campaigns",
        "Write engaging content",
      ],
    },
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

  const handleOpen = (internship) => {
    setSelectedInternship(internship);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setSelectedInternship(null);
    setIsDialogOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${item.path === "/saved"
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
      <main className="relative z-10 pt-24 pb-6 px-4 container mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black">Applied Internships</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Track all the opportunities you have applied for 🚀</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {savedInternships.map((internship) => (
            <motion.div
              key={internship.id}
              variants={itemVariants}
              className="glass p-6 rounded-3xl flex flex-col hover:border-primary/50 transition-all group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-xl font-bold shadow-sm">
                    <span className="material-symbols-outlined text-primary">work</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{internship.title}</h3>
                    <p className="text-sm opacity-60">{internship.company}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {internship.location}
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <span className="material-symbols-outlined text-sm">category</span>
                  {internship.sector}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {internship.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-md font-bold border border-primary/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
                  onClick={() => handleOpen(internship)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />

      {/* Details Dialog */}
      {isDialogOpen && selectedInternship && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#1a1f2e] w-full max-w-lg rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold leading-tight">{selectedInternship.title}</h2>
                <p className="text-primary font-bold">{selectedInternship.company}</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                  <p className="text-xs opacity-60 uppercase mb-1">Duration</p>
                  <p className="font-bold">{selectedInternship.duration}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                  <p className="text-xs opacity-60 uppercase mb-1">Stipend</p>
                  <p className="font-bold text-green-600 dark:text-green-400">{selectedInternship.stipend}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                  <p className="text-xs opacity-60 uppercase mb-1">Posted On</p>
                  <p className="font-bold">{selectedInternship.postedOn}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                  <p className="text-xs opacity-60 uppercase mb-1">Location</p>
                  <p className="font-bold">{selectedInternship.location}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-sm opacity-70 leading-relaxed">{selectedInternship.description}</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 text-sm opacity-70 space-y-1">
                  {selectedInternship.responsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}