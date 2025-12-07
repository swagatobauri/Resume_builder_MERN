import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, User, Menu, X } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Dashboard', path: '/' },
        { name: 'Job Matches', path: '/jobs' },
        { name: 'AI Analysis', path: '/analysis' },
        { name: 'Trends', path: '/trends' },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                                <FileText size={20} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                AI Resume
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:ml-8 md:flex md:space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path)
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-slate-700 pr-2">{user?.name}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                            icon={LogOut}
                        >
                            Sign Out
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                    ? 'text-primary-600 bg-primary-50'
                                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 pb-3 border-t border-slate-200">
                            <div className="flex items-center px-3 mb-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-sm mr-3">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-base font-medium text-slate-800">{user?.name}</div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
