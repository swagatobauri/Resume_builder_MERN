import React from 'react';

const TextArea = ({ label, error, className = '', ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <textarea
                className={`block w-full rounded-xl border-slate-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200 sm:text-sm py-3 px-4 ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 ml-1 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextArea;
