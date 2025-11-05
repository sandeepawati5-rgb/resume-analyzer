
import React from 'react';
import { ScoreIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <ScoreIcon className="h-7 w-7 text-blue-600" />
            <p className="text-sm text-gray-600">Built with AI by Resume Genius Pro © 2025</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
