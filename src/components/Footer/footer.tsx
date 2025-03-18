import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 mb-4 font-light">
          Let's connect and create something amazing together! ✨
        </p>
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://github.com/AdiNehama"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1 group"
          >
            <Github size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Check out my code</span>
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="https://www.linkedin.com/in/adi-nehama-194222253/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1 group"
          >
            <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Connect with me</span>
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="mailto:adinehama6@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1 group"
          >
            <Mail size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Send me an email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
