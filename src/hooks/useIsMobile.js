import { useEffect, useState } from 'react';

export default function useIsMobile(breakpoint = 720) {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const listener = (event) => setIsMobile(event.matches);
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', listener);
            return () => mq.removeEventListener('change', listener);
        }
        mq.addListener(listener);
        return () => mq.removeListener(listener);
    }, [breakpoint]);

    return isMobile;
}
