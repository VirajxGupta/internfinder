import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode logic matching HomePage
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginValue = loginMethod === 'email' ? email : '9876543210'; // logic from old page

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginValue, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful! ✅");
        navigate("/home");
      } else {
        toast.error(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#130d1c] dark:text-white transition-colors duration-300 min-h-screen flex items-center justify-center overflow-x-hidden">
      <div className="fixed inset-0 z-0 gradient-bg">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-20 left-[10%] text-white/20 floating-element hidden lg:block">
          <span className="material-symbols-outlined text-[120px]">school</span>
        </div>
        <div className="absolute bottom-20 right-[10%] text-white/20 floating-element hidden lg:block" style={{ animationDelay: '-3s' }}>
          <span className="material-symbols-outlined text-[100px]">rocket_launch</span>
        </div>
        <div className="absolute top-1/2 left-[5%] text-white/10 floating-element hidden lg:block" style={{ animationDelay: '-1.5s' }}>
          <span className="material-symbols-outlined text-[80px]">work</span>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-[1200px] px-4 py-12 flex flex-col items-center">
        <div className="mb-8 flex items-center gap-3">
          <div className="size-10 text-white bg-primary rounded-xl flex items-center justify-center p-2 shadow-lg shadow-primary/30" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"></path>
              <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">InternFinder</h1>
        </div>
        <div className="w-full max-w-[500px] glass bg-white dark:bg-[#1f162e] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-[#130d1c] dark:text-white">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400">Access your InternFinder account to continue.</p>
          </div>

          {/* Demo Credentials Box */}
          <div className="p-3 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg text-sm">
            <p className="font-bold text-amber-800 dark:text-amber-400">Demo Credentials:</p>
            <p className="text-amber-800 dark:text-amber-400">Email: <span className="font-bold">demo@example.com</span></p>
            <p className="text-amber-800 dark:text-amber-400">Password: <span className="font-bold">demo123</span></p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-60 px-1">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">alternate_email</span>
                <input
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-60 px-1">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                <input
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-primary transition-colors">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-bold text-primary hover:underline">Forgot Password?</a>
            </div>

            <button className="w-full bg-gradient-to-r from-primary to-[#4d21b3] text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 flex items-center justify-center gap-2" type="submit">
              Sign In
              <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
              <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest opacity-40">Or login with</span>
              <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors" onClick={() => toast('Feature coming soon')}>
                <svg className="size-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-semibold">Google</span>
              </button>
              {/* DigiLocker Button (Replacing LinkedIn for Login context as per old page logic, but keeping style) */}
              <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors" onClick={() => toast.info("Redirecting to DigiLocker...")}>
                <span className="material-symbols-outlined text-blue-600">description</span>
                <span className="text-sm font-semibold">DigiLocker</span>
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Don't have an account?
              <button className="text-primary font-bold hover:underline transition-all ml-1" onClick={() => navigate('/signup')}>Register Now</button>
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-6">
          <button className="glass p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" onClick={toggleDarkMode}>
            <span className="material-symbols-outlined text-[20px] block dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined text-[20px] hidden dark:block text-white">light_mode</span>
          </button>
          <div className="flex gap-8 text-xs font-medium text-white/40 uppercase tracking-widest">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-white transition-colors" href="#">Support</a>
          </div>
        </div>
      </div>
      {/* Removed duplicate Chatbot floating button as App.jsx renders it globally */}
    </div>
  );
}