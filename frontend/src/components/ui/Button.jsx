import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md focus:ring-blue-500 border border-transparent",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm focus:ring-slate-500",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-sm focus:ring-green-500"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-4 py-2 text-sm rounded-xl",
        lg: "px-6 py-3 text-base rounded-xl",
        xl: "px-8 py-4 text-lg rounded-2xl"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <LoadingSpinner size="sm" className="mr-2 text-current" />
            ) : Icon ? (
                <Icon className={`w-5 h-5 ${children ? 'mr-2' : ''}`} />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
