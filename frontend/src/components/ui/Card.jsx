import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
    return (
        <div
            className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 text-slate-900 ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
