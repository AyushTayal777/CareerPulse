import React from "react";
import { Linkedin, Github, Figma } from "lucide-react";

// Mock Link component for demonstration
const Link = ({ to, className, children }) => (
  <a href={to} className={className}>{children}</a>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Brand / Logo */}
          <div className="flex-1 group">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mb-3 transform transition-all duration-300 group-hover:scale-105">
              CareerPulse
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 transform transition-all duration-300 group-hover:w-24"></div>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
              Connecting talent with opportunities. Find your dream job today and
              take the next step in your career.
            </p>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="text-lg font-semibold text-white mb-4 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="relative inline-block hover:text-white transition-all duration-300 group/link"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover/link:w-full rounded px-2 -mx-2"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/jobs" 
                  className="relative inline-block hover:text-white transition-all duration-300 group/link"
                >
                  <span className="relative z-10">Jobs</span>
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover/link:w-full rounded px-2 -mx-2"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="relative inline-block hover:text-white transition-all duration-300 group/link"
                >
                  <span className="relative z-10">About Us</span>
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover/link:w-full rounded px-2 -mx-2"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="relative inline-block hover:text-white transition-all duration-300 group/link"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover/link:w-full rounded px-2 -mx-2"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="group">
            <h3 className="text-lg font-semibold text-white mb-4 relative">
              Follow Us
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/ayush685/" 
                className="relative p-3 rounded-full border border-gray-700 hover:border-blue-400 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/social"
              >
                <Linkedin size={22} />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="https://github.com/AyushTayal777" 
                className="relative p-3 rounded-full border border-gray-700 hover:border-purple-400 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/social"
              >
                <Github size={22} />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="https://www.figma.com/files/team/1537502553346163208/recents-and-sharing?fuid=1537502551034793503" 
                className="relative p-3 rounded-full border border-gray-700 hover:border-pink-400 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/social"
              >
                <Figma size={22} />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-full opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-10 pt-6 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <p className="text-center text-xs text-gray-500 hover:text-gray-400 transition-colors duration-300">
            © {new Date().getFullYear()} CareerPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;