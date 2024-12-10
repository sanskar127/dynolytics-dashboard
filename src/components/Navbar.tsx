import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

type NavbarProps = {
  show: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ show }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev)
  };

  return (
    <nav className={`${show ? "block" : "hidden"} bg-indigo-600 shadow-md py-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              MyApp
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-indigo-200">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-indigo-200">
              About
            </Link>
            <Link to="/services" className="text-white hover:text-indigo-200">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-indigo-200">
              Contact
            </Link>
          </div>
          {/* SearchBar Component */}
          <div className="hidden md:flex">
            <Search />
          </div>
          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/"
              className="block text-white hover:text-indigo-200 px-4 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-white hover:text-indigo-200 px-4 py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block text-white hover:text-indigo-200 px-4 py-2"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block text-white hover:text-indigo-200 px-4 py-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
