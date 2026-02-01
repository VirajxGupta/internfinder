import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

// Footer Component (Internal definition)
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

// Function to fetch internship details from Firebase
async function getInternshipDetails(id) {
  try {
    const docRef = doc(db, "internships", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching internship details:", error);
    return null;
  }
}

function ResumePage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ name: "Intern", email: "" });

  // Dialog states
  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  const [results, setResults] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
  const [dialogSkills, setDialogSkills] = useState([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

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

  const showNotification = (message) => {
    toast(message);
  };

  const handleCardClick = (method) => {
    setSelectedMethod(method);
  };

  const handleShowMoreSkills = (internship) => {
    setDialogSkills(internship.skills || []);
    setOpenSkillsDialog(true);
  };

  const handleCloseSkillsDialog = () => {
    setOpenSkillsDialog(false);
    setDialogSkills([]);
  };

  const handleOpenDetailDialog = (internship) => {
    setSelectedInternship(internship);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setSelectedInternship(null);
    setOpenDetailDialog(false);
  };

  const handleResumeUploadAndExtract = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.style.display = 'none';

    input.onchange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        toast.loading(`Processing: ${file.name}`);
        setLoading(true);

        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('get_recommendations', 'true');

          const response = await fetch('https://pipalskill-sih-ml-backend-resume-scanner.hf.space/resume-content-extractor', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
          }

          const result = await response.json();
          console.log('API Response:', result);

          const recommendations = result.recommendations || result.data || [];

          if (recommendations.length === 0) {
            toast.dismiss();
            toast.error('No recommendations found. Try manual entry.');
            return;
          }

          const fullData = await Promise.all(
            recommendations.map(async (rec) => {
              const details = await getInternshipDetails(rec.internship_id);
              return { ...details, score: rec.score };
            })
          );

          setResults(fullData.filter((item) => item !== null));
          setOpenResultsDialog(true);
          setShowMore(false);
          toast.dismiss();
          toast.success('Recommendations loaded successfully!');

        } catch (error) {
          console.error('Error:', error);
          toast.dismiss();
          toast.error(`Error: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handleButtonClick = () => {
    if (selectedMethod === 'manual') {
      navigate("/explore");
    } else if (selectedMethod === 'upload') {
      handleResumeUploadAndExtract();
    }
  };

  const renderInternshipCard = (internship) => (
    <div key={internship.id || Math.random()} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 mb-4 hover:shadow-lg transition-all dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${internship.stipend && Number(internship.stipend) > 0
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
          {internship.stipend && Number(internship.stipend) > 0 ? 'Paid Internship' : 'Unpaid Internship'}
        </span>
        {internship.score !== undefined && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
              <span className="text-[10px] font-bold text-primary">{(internship.score * 100).toFixed(0)}%</span>
            </div>
            <span className="text-xs opacity-60">Match</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold mb-1">{internship.title || "Title not available"}</h3>
      <p className="text-sm opacity-70 mb-4">
        <strong>Company:</strong> {internship.companyName || "Company not available"}
      </p>

      {internship.locationCity && (
        <p className="flex items-center gap-2 text-sm opacity-70 mb-2">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {internship.locationCity}
        </p>
      )}

      {internship.duration && (
        <p className="flex items-center gap-2 text-sm opacity-70 mb-2">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {internship.duration} months
        </p>
      )}

      <p className="text-primary font-medium text-sm mb-2">
        <strong>Ends On:</strong> {internship.endDate
          ? new Date(internship.endDate).toLocaleDateString("en-IN", {
            year: "numeric", month: "short", day: "numeric",
          })
          : "No End Date"}
      </p>

      <p className={`text-sm font-bold mb-4 ${internship.stipend && Number(internship.stipend) > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
        <strong>Stipend:</strong> {internship.stipend && Number(internship.stipend) > 0 ? `₹${internship.stipend}/month` : 'Unpaid'}
      </p>

      {internship.skills?.length > 0 && (
        <div className="mb-4">
          <strong className="text-xs uppercase opacity-70 block mb-2">Skills</strong>
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full dark:bg-primary/20">
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span
                className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-xs rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20"
                onClick={() => handleShowMoreSkills(internship)}
              >
                +{internship.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-bold"
          onClick={() => handleOpenDetailDialog(internship)}
        >
          View Details
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity text-sm font-bold"
          onClick={() => navigate("/apply")}
        >
          Apply
        </button>
      </div>
    </div>
  );

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
              { label: "Internships", path: "/resume", icon: "travel_explore" },
              { label: "Applied", path: "/saved", icon: "assignment_turned_in" },
              { label: "Profile", path: "/profile", icon: "person" },
              { label: "About", path: "/about", icon: "info" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${item.path === "/resume"
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
      <main className="relative z-10 pt-24 pb-6 px-4 container mx-auto max-w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-black mb-2">Find Your Perfect Internship</h2>
          <p className="text-lg opacity-60">Choose how you want to search for opportunities</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Manual Entry Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`glass p-8 rounded-3xl cursor-pointer transition-all border-2 ${selectedMethod === 'manual' ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent hover:border-primary/50'
              }`}
            onClick={() => handleCardClick('manual')}
          >
            <div className="text-center">
              <span className="text-6xl mb-4 block">✏️</span>
              <h3 className="text-xl font-bold mb-2">Enter Skills Manually</h3>
              <p className="opacity-60 text-sm">
                Fill out a simple form with your skills, preferred sectors, and internship type preferences
              </p>
            </div>
          </motion.div>

          {/* Upload Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`glass p-8 rounded-3xl cursor-pointer transition-all border-2 ${selectedMethod === 'upload' ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent hover:border-primary/50'
              }`}
            onClick={() => handleCardClick('upload')}
          >
            <div className="text-center">
              <span className="text-6xl mb-4 block">📄</span>
              <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
              <p className="opacity-60 text-sm">
                Upload your resume and let our system automatically extract your skills and experience
              </p>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${!selectedMethod || loading
            ? 'bg-gray-500 dark:bg-white/5 text-white cursor-not-allowed'
            : 'bg-primary text-white hover:scale-[1.02] active:scale-[0.98]'
            }`}
          disabled={!selectedMethod || loading}
          onClick={handleButtonClick}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            selectedMethod === 'manual'
              ? 'Continue with Manual Entry'
              : selectedMethod === 'upload'
                ? 'Continue with Resume Upload'
                : 'Select a method to proceed'
          )}
        </motion.button>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass p-6 rounded-2xl flex items-start gap-4"
        >
          <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
          <div>
            <h3 className="font-bold text-lg mb-1">Need Help Deciding?</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              <strong>Manual Entry</strong> gives you full control over your profile. <strong>Resume Upload</strong> automatically extracts your information and provides instant recommendations.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Results Dialog */}
      {openResultsDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#1a1f2e] w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recommended Internships</h2>
              <button onClick={() => setOpenResultsDialog(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-black/20">
              {results && results.length > 0 ? (
                <div>
                  {results.slice(0, 4).map(renderInternshipCard)}

                  {results.length > 4 && (
                    <>
                      <button
                        className="w-full py-3 mt-4 text-primary font-bold bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'Show Less' : `Show ${results.length - 4} More`}
                        <span className={`material-symbols-outlined transition-transform ${showMore ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>

                      {showMore && results.slice(4).map(renderInternshipCard)}
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 opacity-60">
                  <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                  <p>No internships found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Skills Dialog */}
      {openSkillsDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#1a1f2e] w-full max-w-md rounded-3xl shadow-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {dialogSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full dark:bg-primary/20 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                onClick={handleCloseSkillsDialog}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Internship Detail Dialog */}
      {openDetailDialog && selectedInternship && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#1a1f2e] w-full max-w-xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold leading-tight">{selectedInternship.title}</h2>
              <button onClick={handleCloseDetailDialog} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-base opacity-80">
              <p><strong>Company:</strong> {selectedInternship.companyName || "N/A"}</p>
              {selectedInternship.locationCity && <p><strong>Location:</strong> {selectedInternship.locationCity}</p>}
              {selectedInternship.duration && <p><strong>Duration:</strong> {selectedInternship.duration} months</p>}

              {/* Add more details here if available in the object */}
              <div className="bg-primary/5 p-4 rounded-xl mt-4">
                <p className="text-sm opacity-100">
                  <strong>Note:</strong> Detailed description functionality would go here.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5" onClick={handleCloseDetailDialog}>Close</button>
              <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:opacity-90" onClick={() => navigate("/apply")}>Apply Now</button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

export default ResumePage;