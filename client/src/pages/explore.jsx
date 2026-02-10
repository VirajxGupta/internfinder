import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { MapPin, Clock, Search, Sparkles, X, SearchX, ChevronDown, UserSearch, Mail, Phone } from "lucide-react";

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

export default function Explore() {
  const navigate = useNavigate();

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
            <div className="w-10 h-10 rounded-full border-2 border-[#6B629D] flex items-center justify-center bg-[#6B629D]/10">
              <span className="text-[10px] font-bold text-[#6B629D]">{(internship.score * 100).toFixed(0)}%</span>
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

      <p className="text-[#6B629D] font-medium text-sm mb-2">
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
              <span key={index} className="px-3 py-1 bg-[#6B629D]/10 text-[#6B629D] text-xs rounded-full dark:bg-[#6B629D]/20">
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
          className="px-4 py-2 rounded-lg border border-[#6B629D] text-[#6B629D] hover:bg-[#6B629D]/5 transition-colors text-sm font-bold"
          onClick={() => handleOpenDetailDialog(internship)}
        >
          View Details
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-[#6B629D] text-white hover:opacity-90 transition-opacity text-sm font-bold"
          onClick={() => navigate("/apply", { state: { internship } })}
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
      <main className="max-w-4xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Find Your Perfect Internship</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Tell us about your skills and interests to get personalized recommendations.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Skills</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm w-[200px] focus:ring-2 ring-[#6B629D]/50 outline-none text-slate-900 dark:text-slate-200"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSkills.includes(skill)
                    ? 'bg-[#6B629D] text-white shadow-md shadow-[#6B629D]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                    ? 'bg-[#6B629D] text-white shadow-md shadow-[#6B629D]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                  className={`py-3 rounded-xl font-bold transition-all border ${internshipType === type
                    ? 'border-[#6B629D] bg-[#6B629D]/5 text-[#6B629D]'
                    : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
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
            className="w-full py-4 bg-[#6B629D] text-white rounded-xl font-bold text-lg hover:bg-[#5a5285] transition-colors shadow-lg shadow-[#6B629D]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                          className="w-full py-3 mt-4 text-[#6B629D] font-bold bg-[#6B629D]/10 rounded-xl hover:bg-[#6B629D]/20 transition-colors flex items-center justify-center gap-2"
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
                  <span key={idx} className="px-3 py-1 bg-[#6B629D]/10 text-[#6B629D] rounded-full dark:bg-[#6B629D]/20 text-sm font-medium">
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
                        <span key={idx} className="px-3 py-1 bg-[#6B629D]/10 text-[#6B629D] rounded-full dark:bg-[#6B629D]/20 text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5" onClick={handleCloseDetailDialog}>Close</button>
                <button className="px-5 py-2.5 rounded-xl bg-[#6B629D] text-white font-bold hover:opacity-90"
                  onClick={() => navigate("/apply", { state: { internship: selectedInternship } })}
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div >
  );
}
