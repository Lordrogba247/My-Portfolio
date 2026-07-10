import { useEffect, useRef, useState } from "react";
import "./Stats.css";

const STATS = [
    { value: 10, suffix: "+", label: "PROJECTS COMPLETED", countUp: true },
    { value: 3, suffix: "+", label: "YEARS EXPERIENCE", countUp: true },
    { value: 100, suffix: "%", label: "CLIENT SATISFACTION", countUp: true },
    { value: "24/7", suffix: "", label: "ALWAYS ON TIME", countUp: false },
];

function useCountUp(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);

    return count;
}

function StatItem({ stat, animate }) {
    const count = useCountUp(
        typeof stat.value === "number" ? stat.value : 0,
        1800,
        animate && stat.countUp
    );

    const display = stat.countUp
        ? `${count}${stat.suffix}`
        : `${stat.value}${stat.suffix}`;

    return (
        <div className="stat-item">
            <span className="stat-number">{display}</span>
            <span className="stat-label">{stat.label}</span>
        </div>
    );
}

export default function Stats() {
    const [animate, setAnimate] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section" ref={ref}>
            <div className="stats-inner">
                {STATS.map((stat, i) => (
                    <div key={i} className="stat-col">
                        <StatItem stat={stat} animate={animate} />
                        {i < STATS.length - 1 && <div className="stat-divider" />}
                    </div>
                ))}
            </div>
        </section>
    );
}