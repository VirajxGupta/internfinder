import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { LayoutDashboard, Compass, CheckCircle, User, Info, Sun, Moon, MapPin, Clock, Search, Sparkles, X, SearchX, ChevronDown, UserSearch } from "lucide-react";

const skills = [
  "Web Developer", "React", "Next.js", "HTML", "CSS", "JavaScript", "Node.js", "Python", "Django",
  "Full Stack Development", "Frontend Development", "Backend Development", "Data Science",
  "Machine Learning", "Artificial Intelligence", "Data Analysis", "SQL", "R", "Business Intelligence",
  "Content Writing", "Social Media", "Graphic Design", "Video Editing", "UI/UX Design",
  "Digital Marketing", "SEO", "Copywriting", "Research", "Business Development", "Market Research",
  "Human Resources", "Finance", "Project Management", "Operations Management", "Sales"
];

const sectors = [
  "Technology", "Healthcare", "Education", "Finance", "Marketing", "Government", "Biotechnology",
  "Pharmaceuticals", "Medical Devices", "Telehealth", "Online Learning", "Academic Research", "Banking",
  "Investment Banking", "Accounting", "Financial Planning", "Advertising", "Public Relations", "Non-profit",
  "Consulting", "Media & Entertainment", "Manufacturing"
];

const internshipTypes = ["Hybrid", "Onsite", "Remote"];

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
              <Mail size={16} className="mt-0.5" />
              support@internfinder.gov.in
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5" />
              1800-123-456 (Toll Free)
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5" />
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

export default function Explore() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ name: "Intern", email: "" });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [internshipType, setInternshipType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
  const [dialogSkills, setDialogSkills] = useState([]);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  const [showMore, setShowMore] = useState(false);

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

  const handleShowMoreSkills = (internship) => {
    setDialogSkills(internship.skills || []);
    setOpenSkillsDialog(true);
  };

  const handleCloseDialog = () => {
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

  const handleGetRecommendations = async () => {
    if (selectedSkills.length === 0 && selectedSectors.length === 0 && !internshipType) {
      toast.error("Please select at least one skill, sector, or internship type!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://pulastya0-sih-ml-backend.hf.space/profile-recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: selectedSkills, sectors: selectedSectors, internshipType }),
        }
      );
      if (!res.ok) throw new Error("Failed to fetch internships from the backend.");
      const data = await res.json();
      const recommendations = Array.isArray(data) ? data : data.recommendations || [];
      const fullData = await Promise.all(
        recommendations.map(async (rec) => {
          const details = await getInternshipDetails(rec.internship_id);
          return { ...details, score: rec.score };
        })
      );
      setResults(fullData.filter((item) => item !== null));
      setOpenResultsDialog(true);
      setShowMore(false);
      toast.success("Recommendations loaded!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill) =>
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  const toggleSector = (sector) =>
    setSelectedSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]));

  const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSectors = sectors.filter((sector) => sector.toLowerCase().includes(searchTerm.toLowerCase()));

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
          <MapPin size={14} />
          {internship.locationCity}
        </p>
      )}

      {internship.duration && (
        <p className="flex items-center gap-2 text-sm opacity-70 mb-2">
          <Clock size={14} />
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
              { label: "Dashboard", path: "/home", icon: LayoutDashboard },
              { label: "Internships", path: "/resume", icon: Compass },
              { label: "Applied", path: "/saved", icon: CheckCircle },
              { label: "Profile", path: "/profile", icon: User },
              { label: "About", path: "/about", icon: Info },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${item.path === "/explore" // Updated active path logic if this page is /explore
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
              >
                <item.icon size={18} strokeWidth={2} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
              {user.name && user.name.charAt(0)}
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-6 px-4">
        <div className="max-w-[800px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <UserSearch size={40} className="text-primary" />
            </div>
            <h1 className="text-3xl font-black mb-2">Tell Us About Yourself</h1>
            <p className="text-lg opacity-60">Help us find the perfect internship matches for you ✨</p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/20 shadow-xl"
          >
            {/* Skills Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Skills</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-black/20 border-none text-sm w-[200px] focus:ring-2 ring-primary/50 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSkills.includes(skill)
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'
                      }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Sectors Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Interested Sectors</h2>
              <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredSectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => toggleSector(sector)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSectors.includes(sector)
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'
                      }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Internship Type */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Internship Type</h2>
              <div className="grid grid-cols-3 gap-4">
                {internshipTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setInternshipType(type)}
                    className={`py-3 rounded-xl font-bold transition-all border-2 ${internshipType === type
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-transparent bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleGetRecommendations}
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Finding best matches...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Get My Internship Recommendations
                </>
              )}
            </button>

          </motion.div>

        </div>
      </main>

      <Footer />

      {/* Results Dialog */}
      <AnimatePresence>
        {openResultsDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1a1f2e] w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recommended Internships</h2>
                <button onClick={() => setOpenResultsDialog(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                  <X size={24} />
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
                          <ChevronDown className={`transition-transform ${showMore ? 'rotate-180' : ''}`} size={24} />
                        </button>

                        {showMore && results.slice(4).map(renderInternshipCard)}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10 opacity-60">
                    <SearchX size={48} className="mx-auto mb-2" />
                    <p>No internships found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skills Dialog */}
      <AnimatePresence>
        {openSkillsDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                  onClick={handleCloseDialog}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Internship Detail Dialog */}
      <AnimatePresence>
        {openDetailDialog && selectedInternship && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1a1f2e] w-full max-w-xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold leading-tight">{selectedInternship.title}</h2>
                <button onClick={handleCloseDetailDialog} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 text-base opacity-80">
                <p><strong>Company:</strong> {selectedInternship.companyName || "N/A"}</p>
                {selectedInternship.locationCity && <p><strong>Location:</strong> {selectedInternship.locationCity}</p>}
                {selectedInternship.duration && <p><strong>Duration:</strong> {selectedInternship.duration} months</p>}

                <p className={`font-bold ${selectedInternship.stipend && Number(selectedInternship.stipend) > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                  <strong>Stipend:</strong> {selectedInternship.stipend && Number(selectedInternship.stipend) > 0 ? `₹${selectedInternship.stipend}/month` : 'Unpaid'}
                </p>

                {selectedInternship.description && (
                  <div className="mt-4">
                    <strong>Description:</strong>
                    <p className="mt-1 text-sm leading-relaxed">{selectedInternship.description}</p>
                  </div>
                )}

                {selectedInternship.skills?.length > 0 && (
                  <div className="mt-4">
                    <strong className="block mb-2">Skills:</strong>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full dark:bg-primary/20 text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5" onClick={handleCloseDetailDialog}>Close</button>
                <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:opacity-90" onClick={() => navigate("/apply")}>Apply Now</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
