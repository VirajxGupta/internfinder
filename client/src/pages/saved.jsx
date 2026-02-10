import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LayoutDashboard, Compass, CheckCircle, User, Info, Sun, Moon, Briefcase, MapPin, Shapes, X, Calendar, IndianRupee, Mail, Phone, Clock, Building2, Bookmark } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

export default function SavedInternships() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ name: "Intern", email: "" });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock Data (Fallback)
  const [savedInternships, setSavedInternships] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch Applications
      if (parsedUser.id) {
        setLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/${parsedUser.id}`)
          .then(res => res.json())
          .then(data => {
            // Transform data to match UI
            const formattedData = data.map(app => ({
              id: app.id,
              title: app.title,
              company: app.company,
              location: app.location || "Remote",
              sector: "Technology", // Default for now
              duration: "3 Months", // Default
              stipend: app.stipend || "Unpaid",
              postedOn: new Date(app.appliedOn).toLocaleDateString(),
              description: "Application submitted.",
              skills: ["React", "JavaScript"], // Default
              responsibilities: [],
              status: app.status
            }));
            setSavedInternships(formattedData);
          })
          .catch(err => {
            console.error("Failed to fetch applications", err);
            toast.error("Failed to load applications.");
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
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

  const handleToggleSave = async (e, internship) => {
    e.stopPropagation();

    // logic: If status is 'Saved', we unsave. If we want to allow re-saving, we can.
    // Based on the page being "Saved Internships", items here are primarily 'Saved' or 'Applied'.
    // If 'Applied', we probably shouldn't be able to 'unsave' the application via a bookmark button (that's withdrawing).
    // So this button should only appear or be active for 'Saved' status items.

    if (internship.status === 'Applied') return;

    if (internship.status === 'Saved') {
      // Unsave
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/unsave`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, internshipId: internship.id })
        });

        toast.success("Internship removed from saved.");
        // Update local state to remove it or change status
        // For "Saved" page, removing it from the list makes sense, or changing visual state.
        // Let's remove it from the list for immediate feedback.
        setSavedInternships(prev => prev.filter(item => item.id !== internship.id));
      } catch (err) {
        console.error("Failed to unsave", err);
        toast.error("Failed to unsave.");
      }
    } else {
      // If we ever support re-saving here (e.g. if we kept it in the list but marked as unsaved)
      // For now, easier to just remove it.
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Applications</h1>
            <p className="text-slate-500 dark:text-slate-400">Track the status of your submitted internship applications.</p>
          </div>
          <div className="hidden md:block">
            <span className="bg-[#6B629D]/10 text-[#6B629D] px-4 py-2 rounded-lg text-sm font-bold">
              {savedInternships.length} Active Applications
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-slate-500">Loading applications...</p>
          ) : savedInternships.length > 0 ? (
            savedInternships.map((internship) => (
              <div key={internship.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#6B629D] group-hover:bg-[#6B629D]/10 transition-colors">
                      {internship.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{internship.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{internship.company}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className={`text-xs px-2 py-1 rounded font-bold ${internship.status === 'Applied'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                      {internship.status}
                    </span>
                    {internship.status === 'Saved' && (
                      <button
                        onClick={(e) => handleToggleSave(e, internship)}
                        className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#949D62] transition-colors"
                        title="Unsave Internship"
                      >
                        <Bookmark size={18} className="fill-[#949D62]" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={16} className="text-slate-400" />
                    {internship.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Building2 size={16} className="text-slate-400" />
                    {internship.sector}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <IndianRupee size={16} className="text-slate-400" />
                    {internship.stipend}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {internship.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-slate-200 dark:border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full py-2.5 rounded-lg border border-[#6B629D] text-[#6B629D] font-bold hover:bg-[#6B629D] hover:text-white transition-all text-sm"
                  onClick={() => handleOpen(internship)}
                >
                  View Application Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No applications found. Go to Explore to apply!</p>
          )}
        </div>

      </main>

      <Footer />

      {/* Details Dialog */}
      {isDialogOpen && selectedInternship && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl p-0 max-h-[90vh] overflow-y-auto flex flex-col"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-white dark:bg-slate-900 sticky top-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{selectedInternship.title}</h2>
                <p className="text-[#6B629D] font-semibold text-sm">{selectedInternship.company}</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Status</p>
                  <p className="font-semibold text-sm">{selectedInternship.status}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Applied On</p>
                  <p className="font-semibold text-sm">{selectedInternship.postedOn}</p>
                  {/* Note: In a real app this would be 'appliedDate', using postedOn for mock */}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Duration</p>
                  <p className="font-semibold text-sm">{selectedInternship.duration}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Stipend</p>
                  <p className="font-semibold text-sm text-green-600">{selectedInternship.stipend}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedInternship.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  {selectedInternship.responsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button
                className="px-6 py-2.5 bg-[#6B629D] text-white font-bold rounded-lg hover:bg-[#5a5285] transition-colors shadow-lg shadow-[#6B629D]/20"
                onClick={handleClose}
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}