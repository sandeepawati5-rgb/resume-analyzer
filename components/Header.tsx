
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { ScoreIcon, MenuIcon, CloseIcon, UserIcon, LogoutIcon } from './IconComponents';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const isLandingPage = location.pathname === '/';

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ScoreIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Resume Genius Pro</span>
          </Link>

          {isLandingPage && (
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onBlur={() => setTimeout(() => setIsProfileOpen(false), 150)}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="hidden sm:inline font-medium">{currentUser.name}</span>
                  <UserIcon className="h-8 w-8 p-1 bg-gray-200 rounded-full text-gray-600" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    <Link to="/dashboard" onClick={closeMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogoutIcon className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col gap-4">
              {isLandingPage && NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} onClick={closeMenus} className="text-gray-600 hover:text-blue-600 transition-colors py-2">
                  {link.name}
                </a>
              ))}
              {!currentUser && (
                <>
                  <Link to="/login" onClick={closeMenus} className="text-gray-600 hover:text-blue-600 transition-colors py-2">
                    Login
                  </Link>
                  <Link to="/signup" onClick={closeMenus} className="w-full mt-2 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
