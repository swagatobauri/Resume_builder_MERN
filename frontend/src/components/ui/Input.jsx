import React from 'react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-slate-400" />
                    </div>
                )}
                <input
                    className={`block w-full rounded-xl border-slate-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200 sm:text-sm py-2.5 text-slate-900 bg-white ${Icon ? 'pl-10' : 'pl-4'} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 ml-1 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
