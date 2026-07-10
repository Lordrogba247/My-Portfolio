import { useEffect, useRef, useState } from "react";
import "./Work.css";

const STEPS = [
    {
        number: 1,
        title: "Discovery",
        desc: "Understanding your business goals, target audience, and project requirements.",
    },
    {
        number: 2,
        title: "Design",
        desc: "Creating wireframes and UI mockups tailored to your brand identity.",
    },
    {
        number: 3,
        title: "Build",
        desc: "Writing clean, responsive code. Turning designs into functional reality.",
    },
    {
        number: 4,
        title: "Launch",
        desc: "Final testing, SEO optimization, and deploying to live servers seamlessly.",
    },
];

export default function Work() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="work-section">
            {/* Header */}
            <div className="work-header">
                <div className="work-badge">
                    <span className="work-badge-dot" />
                    HOW I WORK
                </div>
                <h2 className="work-heading">My Process.</h2>
            </div>

            {/* Timeline */}
            <div className={`work-timeline ${visible ? "work-timeline--visible" : ""}`} ref={ref}>

                {/* Connecting line */}
                <div className="work-line">
                    <div className="work-line-fill" />
                </div>

                {/* Steps */}
                {STEPS.map((step, i) => (
                    <div
                        key={step.number}
                        className="work-step"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        <div className="work-circle">
                            <span>{step.number}</span>
                            <div className="work-circle-ring" />
                        </div>
                        <h3 className="work-step-title">{step.title}</h3>
                        <p className="work-step-desc">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}