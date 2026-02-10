import React from 'react';
import { Mail, Phone } from 'lucide-react';

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

export default Footer;
