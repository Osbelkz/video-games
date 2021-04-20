import {useEffect, useRef} from "react";

export function useUnlimScroll(action, condition) {

    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    action();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            },
        );
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, condition, action]);

    return {ref};
}
