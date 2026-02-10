import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  FileText,
  Briefcase,
  User,
  Mail,
  Phone
} from "lucide-react";
import Navbar from "../components/Navbar";

// Footer Component (Internal definition for self-containment)
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

export default function ApplyPage() {
  const location = useLocation();
  const internship = location.state?.internship;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    skills: "",
    resume: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10 MB. Please upload a smaller file.");
        return;
      }
      setError("");
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      setError("Please upload a resume before submitting.");
      return;
    }

    if (!user || !user.id) {
      if (!user) {
        toast.error("Please login to apply");
        return;
      }
    }

    if (!internship) {
      toast.error("No internship selected. Please go back and select one.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId: user.id || "test-user-id",
        internshipId: internship.id,
        title: internship.title,
        company: internship.companyName || internship.company,
        location: internship.locationCity || internship.location,
        stipend: internship.stipend,
        status: "Applied"
      };

      await axios.post("http://localhost:5000/api/applications/apply", payload);

      toast.success("Application submitted successfully! 🚀");
      setTimeout(() => navigate('/saved'), 2000);
    } catch (err) {
      console.error("Application error:", err);
      toast.error(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-[#6B629D] mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Apply for {internship?.title || "Internship"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Briefcase size={16} />
              {internship?.companyName || internship?.company ? `at ${internship.companyName || internship.company}` : "Please provide details below."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <User size={18} className="text-[#6B629D]" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#6B629D] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#6B629D] focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Briefcase size={18} className="text-[#6B629D]" />
                Professional Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#6B629D] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="e.g. React, Node.js, Python"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#6B629D] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Why are you a good fit for this role?"
                ></textarea>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileText size={18} className="text-[#6B629D]" />
                Resume / CV
              </h2>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-[#6B629D] transition-colors bg-slate-50 dark:bg-slate-800/50">
                <input
                  type="file"
                  name="resume"
                  id="resume-upload"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
                <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#6B629D]/10 flex items-center justify-center text-[#6B629D] mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Click to upload your resume
                  </span>
                  <span className="text-xs text-slate-500">
                    PDF, DOC, DOCX up to 10MB
                  </span>
                </label>
                {formData.resume && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#6B629D] bg-[#6B629D]/10 py-2 px-4 rounded-full w-fit mx-auto">
                    <CheckCircle size={14} />
                    {formData.resume.name}
                  </div>
                )}
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#6B629D] text-white font-bold hover:bg-[#5a5285] focus:ring-4 focus:ring-[#6B629D]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>Submit Application <ArrowRight size={18} /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
