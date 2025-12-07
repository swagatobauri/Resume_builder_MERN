import React from 'react';

const SlideUp = ({ children, delay = 0, duration = 800, className = '' }) => {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={delay}
            data-aos-duration={duration}
            className={className}
        >
            {children}
        </div>
    );
};

export default SlideUp;
