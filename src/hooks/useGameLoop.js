import { useEffect, useRef } from 'react';
export function useGameLoop(callback, isRunning) {
    const callbackRef = useRef(callback);
    const rafIdRef = useRef(0);
    const lastTimeRef = useRef(0);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    useEffect(() => {
        if (!isRunning) {
            cancelAnimationFrame(rafIdRef.current);
            return;
        }
        const loop = (timestamp) => {
            const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05 // Max 50ms delta
            );
            lastTimeRef.current = timestamp;
            callbackRef.current(deltaTime);
            rafIdRef.current = requestAnimationFrame(loop);
        };
        rafIdRef.current = requestAnimationFrame((ts) => {
            lastTimeRef.current = ts;
            rafIdRef.current = requestAnimationFrame(loop);
        });
        return () => cancelAnimationFrame(rafIdRef.current);
    }, [isRunning]);
}
