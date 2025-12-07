import React from 'react';

const FadeIn = ({ children, delay = 0, duration = 800, className = '' }) => {
    return (
        <div
            data-aos="fade-in"
            data-aos-delay={delay}
            data-aos-duration={duration}
            className={className}
        >
            {children}
        </div>
    );
};

export default FadeIn;
