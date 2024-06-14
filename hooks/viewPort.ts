// hooks/useViewport.ts
import { useState, useEffect } from 'react';

interface Viewport {
    width: number;
}

const useViewport = (): Viewport => {
    const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { width };
};

export default useViewport;
