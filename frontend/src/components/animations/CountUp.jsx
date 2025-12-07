import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const CountUp = ({ n, className = '' }) => {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 200,
        config: { mass: 1, tension: 20, friction: 10 },
    });

    return <animated.span className={className}>{number.to((n) => n.toFixed(0))}</animated.span>;
};

export default CountUp;
