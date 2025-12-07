import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const AnimateList = ({ children, className = '' }) => {
    const [parent] = useAutoAnimate();

    return (
        <div ref={parent} className={className}>
            {children}
        </div>
    );
};

export default AnimateList;
