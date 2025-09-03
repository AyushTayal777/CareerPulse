import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Figma } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        
        {/* Brand / Logo */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">CareerPulse</h2>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Connecting talent with opportunities. Find your dream job today and
            take the next step in your career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-white transition">Jobs</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-white transition">
              <Linkedin size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Github size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Figma size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8">
        <p className="text-center text-xs text-gray-400 py-4">
          © {new Date().getFullYear()} CareerPulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
