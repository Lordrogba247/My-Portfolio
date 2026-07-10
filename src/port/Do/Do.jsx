import { useEffect, useRef, useState } from "react";
import "./Do.css";

const SERVICES = [
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        iconColor: "teal",
        title: "Built From Scratch",
        desc: "Hand-crafted HTML, CSS, JavaScript and React. Clean code, no bloat, pixel-perfect design translation.",
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        iconColor: "teal",
        title: "AI-Powered Dev",
        desc: "Leveraging the latest AI vibe coding tools and workflows to ship faster without sacrificing code quality or architecture.",
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        iconColor: "teal",
        title: "Graphic Design",
        desc: "Creative visual identities, brand assets, and print-ready designs. From logos to full brand kits — built to leave an impression.",
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        iconColor: "teal",
        title: "Responsive Design",
        desc: "Every site I build works flawlessly on mobile, tablet, and desktop — no compromises, no awkward breakpoints.",
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        iconColor: "teal",
        title: "Fast Delivery",
        desc: "Quick turnarounds without cutting corners. I work efficiently and communicate clearly so your project ships on time.",
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        iconColor: "teal",
        title: "Client-First Approach",
        desc: "I listen, understand your goals, and build around them. Your success is the metric I optimize for — not just aesthetics.",
    },
];

const SKILLS = [
    { label: "HTML", percent: 95, color: "teal" },
    { label: "CSS", percent: 95, color: "purple" },
    { label: "React", percent: 95, color: "teal" },
    { label: "JavaScript", percent: 90, color: "purple" },
    { label: "Adobe Photoshop", percent: 95, color: "teal" },
    { label: "Adobe Illustrator", percent: 80, color: "purple" },
    { label: "CorelDraw", percent: 95, color: "teal" },
    { label: "Canva", percent: 90, color: "purple" },
    { label: "AI Dev Tools", percent: 95, color: "teal" },

];

function SkillBar({ skill, index }) {
    const ref = useRef(null);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="skill-item"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="skill-label-row">
                <span className="skill-label">{skill.label}</span>
                <span className={`skill-percent skill-percent--${skill.color}`}>{skill.percent}%</span>
            </div>
            <div className="skill-track">
                <div
                    className={`skill-fill skill-fill--${skill.color}`}
                    style={{ width: animated ? `${skill.percent}%` : "0%", transitionDelay: `${index * 0.1}s` }}
                />
            </div>
        </div>
    );
}

function ServiceCard({ service, index }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.12 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`do-card ${visible ? "do-card--visible" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className={`do-icon-wrap do-icon--${service.iconColor}`}>
                {service.icon}
            </div>
            <h3 className="do-card-title">{service.title}</h3>
            <p className="do-card-desc">{service.desc}</p>
        </div>
    );
}

export default function Do() {
    return (
        <section className="do-section">
            <div className="do-header">
                <div className="do-badge">
                    <span className="do-badge-dot" />
                    WHAT I DO
                </div>
                <h2 className="do-heading">Code. Build. Deliver.</h2>
            </div>

            <div className="do-grid">
                {SERVICES.map((service, i) => (
                    <ServiceCard key={service.title} service={service} index={i} />
                ))}
            </div>

            {/* ── Skills Section ── */}
            <div className="skills-section">
                <div className="skills-grid">
                    {SKILLS.map((skill, i) => (
                        <SkillBar key={skill.label} skill={skill} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}