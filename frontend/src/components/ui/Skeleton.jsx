import React from 'react';

const Skeleton = ({ className = '', count = 1 }) => {
    return (
        <>
            {Array(count).fill(0).map((_, i) => (
                <div
                    key={i}
                    className={`animate-pulse bg-gray-200 rounded ${className}`}
                />
            ))}
        </>
    );
};

export default Skeleton;
