import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LayoutDashboard, Compass, CheckCircle, User, Info, Sun, Moon, MapPin, Clock, ChevronDown, X, SearchX, Lightbulb, PenTool, FileText, Upload, Briefcase, IndianRupee, Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";

// Footer Component (Internal definition)
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
    <div key={internship.id || Math.random()} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <span className={`px-2.5 py-1 rounded text-xs font-bold ${internship.stipend && Number(internship.stipend) > 0
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
          }`}>
          {internship.stipend && Number(internship.stipend) > 0 ? 'Paid' : 'Unpaid'}
        </span>
        {internship.score !== undefined && (
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 rounded bg-[#6B629D]/10 text-[#6B629D] dark:bg-[#6B629D]/20 text-xs font-bold">
              {(internship.score * 100).toFixed(0)}% Match
            </div>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{internship.title || "Title not available"}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
        {internship.companyName || "Company not available"}
      </p>

      {internship.locationCity && (
        <p className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <MapPin size={14} />
          {internship.locationCity}
        </p>
      )}

      {internship.duration && (
        <p className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Clock size={14} />
          {internship.duration} months
        </p>
      )}

      <p className={`text-sm font-bold mb-4 ${internship.stipend && Number(internship.stipend) > 0 ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500'
        }`}>
        <span className="flex items-center gap-1 font-normal text-slate-500 text-xs uppercase tracking-wide mb-1">Stipend</span>
        {internship.stipend && Number(internship.stipend) > 0 ? `₹${internship.stipend}/month` : 'Unpaid'}
      </p>

      {internship.skills?.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded border border-slate-200 dark:border-slate-600">
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span
                className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs rounded border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => handleShowMoreSkills(internship)}
              >
                +{internship.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button
          className="flex-1 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-semibold"
          onClick={() => handleOpenDetailDialog(internship)}
        >
          Details
        </button>
        <button
          className="flex-1 py-2.5 rounded-lg bg-[#6B629D] text-white hover:bg-[#5a5285] transition-colors text-sm font-semibold shadow-sm"
          onClick={() => navigate("/apply")}
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Find Your Perfect Internship</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Choose how you want to search. We can analyze your resume to find the best matches, or you can browse manually.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          {/* Resume Upload Card */}
          <div
            onClick={() => handleCardClick('upload')}
            className={`cursor-pointer group relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-2xl border transition-all duration-300 ${selectedMethod === 'upload'
              ? 'border-[#6B629D] ring-2 ring-[#6B629D]/20 shadow-xl'
              : 'border-slate-200 dark:border-slate-800 hover:border-[#6B629D]/50 hover:shadow-lg'
              }`}
          >
            <div className="mb-6 w-16 h-16 bg-[#6B629D]/10 rounded-2xl flex items-center justify-center text-[#6B629D] group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Resume Match</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Upload your resume (PDF/DOCX). Our AI will analyze your skills and match you with the most relevant opportunities instantly.
            </p>
            {selectedMethod === 'upload' && (
              <div className="absolute top-4 right-4 text-[#6B629D]"><CheckCircle size={24} /></div>
            )}
          </div>

          {/* Manual Entry Card */}
          <div
            onClick={() => handleCardClick('manual')}
            className={`cursor-pointer group relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-2xl border transition-all duration-300 ${selectedMethod === 'manual'
              ? 'border-[#6B629D] ring-2 ring-[#6B629D]/20 shadow-xl'
              : 'border-slate-200 dark:border-slate-800 hover:border-[#6B629D]/50 hover:shadow-lg'
              }`}
          >
            <div className="mb-6 w-16 h-16 bg-[#949D62]/10 rounded-2xl flex items-center justify-center text-[#949D62] group-hover:scale-110 transition-transform">
              <SearchX size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Browse Manually</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Explore all available internships using filters for location, role, and stipend. Best for broad searching.
            </p>
            {selectedMethod === 'manual' && (
              <div className="absolute top-4 right-4 text-[#949D62]"><CheckCircle size={24} /></div>
            )}
          </div>

        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${!selectedMethod || loading
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            : 'bg-[#6B629D] text-white hover:bg-[#5a5285] hover:shadow-xl'
            }`}
          disabled={!selectedMethod || loading}
          onClick={handleButtonClick}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              Analyzing Resume...
            </>
          ) : (
            selectedMethod === 'manual'
              ? 'Browse All Internships'
              : selectedMethod === 'upload'
                ? 'Upload & Find Matches'
                : 'Select an Option to Continue'
          )}
        </button>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400">
            <Lightbulb size={14} />
            Trusted by 500+ Top Companies via Ministry of Corporate Affairs
          </div>
        </div>

      </main>

      <Footer />

      {/* Results Dialog */}
      {openResultsDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended for You</h2>
                <p className="text-sm text-slate-500">Based on your resume analysis</p>
              </div>
              <button onClick={() => setOpenResultsDialog(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 flex-1">
              {results && results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.slice(0, showMore ? results.length : 4).map(renderInternshipCard)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <SearchX size={48} className="mb-4 opacity-50" />
                  <p>No matching internships found.</p>
                </div>
              )}

              {results.length > 4 && (
                <div className="mt-6 text-center">
                  <button
                    className="px-6 py-2 text-sm font-semibold text-[#6B629D] bg-[#6B629D]/10 rounded-lg hover:bg-[#6B629D]/20 transition-colors inline-flex items-center gap-2"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Show Less' : `View ${results.length - 4} More Matches`}
                    <ChevronDown className={`transition-transform ${showMore ? 'rotate-180' : ''}`} size={16} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Skills Dialog */}
      {openSkillsDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {dialogSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl p-0 max-h-[90vh] overflow-y-auto flex flex-col"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-white dark:bg-slate-900 sticky top-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{selectedInternship.title}</h2>
                <p className="text-[#6B629D] font-semibold">{selectedInternship.companyName}</p>
              </div>
              <button onClick={handleCloseDetailDialog} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Location</p>
                  <p className="font-semibold text-sm">{selectedInternship.locationCity || "Remote"}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Duration</p>
                  <p className="font-semibold text-sm">{selectedInternship.duration} Months</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Stipend</p>
                  <p className="font-semibold text-sm text-green-600">{selectedInternship.stipend ? `₹${selectedInternship.stipend}` : "Unpaid"}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Type</p>
                  <p className="font-semibold text-sm">{selectedInternship.type || "Full-time"}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">About the Role</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  {selectedInternship.description || "Join our team to work on cutting-edge projects. You will collaborate with senior developers and gain hands-on experience in building scalable applications."}
                </p>
              </div>

              {selectedInternship.skills && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-[#6B629D]/5 text-[#6B629D] rounded-full text-sm font-medium border border-[#6B629D]/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 sticky bottom-0">
              <button
                className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-semibold hover:bg-white dark:hover:bg-slate-800 transition-colors"
                onClick={handleCloseDetailDialog}
              >
                Close
              </button>
              <button
                className="px-6 py-2.5 rounded-lg bg-[#6B629D] text-white font-bold hover:bg-[#5a5285] shadow-lg shadow-[#6B629D]/20 transition-all transform hover:-translate-y-0.5"
                onClick={() => navigate("/apply")}
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

export default ResumePage;