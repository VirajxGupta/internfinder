import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/Sign-up.jsx";
import About from "./pages/About.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DashBoard from "./pages/HomePage2.jsx";
import Explore from "./pages/explore.jsx";
import SavedInternships from "./pages/saved.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";

import "./index.css";
import Chatbot from "./pages/chatbot.jsx";
import HomePage from "./pages/HomePage.jsx"
import ResumePage from "./pages/ResumePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


// Helper component to conditionally render Chatbot
function ChatbotWrapper() {
  const location = useLocation();
  // Hide chatbot on homepage
  if (location.pathname === "/") return null;
  return <Chatbot />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {" "}
        <Toaster position="top-center" reverseOrder={false} />{" "}
        <ErrorBoundary>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<DashBoard />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<SavedInternships />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Fallback route */}
            <Route
              path="*"
              element={
                <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                  404 – Page Not Found
                </h2>
              }
            />
          </Routes>
        </ErrorBoundary>
        {/* The Chatbot component is correctly placed here, outside the Routes, so it is visible across all pages that match a route. */}{" "}
        < ChatbotWrapper />
      </Router>
    </AuthProvider>
  );
}
export default App;
