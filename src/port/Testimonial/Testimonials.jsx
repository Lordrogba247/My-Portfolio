import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";

const TESTIMONIALS = [
    {
        quote:
            "Working with Aderogba on our school website was a smooth experience from start to finish. He understood exactly what we needed — a site that reflects the professionalism of Heroes College while being easy for parents to navigate. The admissions and information pages he built have made a real difference in how we present ourselves online. Responsive, detail-oriented, and easy to communicate with throughout the project.",
        name: "Mr. Olatunde Bakare",
        role: "Proprietor, Heroes College & Primary School",
        initial: "OB",
        stars: 5,
    },
    {
        quote:
            "Whot Food websites has made ordering so much easier for our customers. The checkout process is smooth, the site looks great on mobile, and Aderogba was quick to fix issues whenever we ran into them, especially during our payment system switch. It's exactly the kind of reliable, responsive work you want from a developer",
        name: "Engr. Chidi Nwosu",
        role: "Managing Director, Whot Foods",
        initial: "CN",
        stars: 5,
    },
    {
        quote:
            "Aderogba built us a storefront that genuinely feels premium,the product filtering is smooth, the transitions are clean, and everything just works the way it should. Customers used to get stuck or drop off partway through browsing before, but that friction is gone now. He also took the time to understand what we actually needed rather than just handing over a generic template, and delivered everything on schedule without us having to chase him. It's the kind of dependable, detail-oriented work that makes a real difference to how customers experience the brand.",
        name: "Dr. Emeka Obi",
        role: "DIRECTOR, Printivo STUDIOS",
        initial: "E",
        stars: 5,
    },
];

function StarRating({ count }) {
    return (
        <div className="t-stars">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#00d4e0">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </div>
    );
}

function TestimonialCard({ t, index }) {
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
            className={`t-card ${visible ? "t-card--visible" : ""}`}
            style={{ animationDelay: `${index * 0.13}s` }}
        >
            {/* Quote mark */}
            <div className="t-quote-mark">"</div>

            <p className="t-quote">"{t.quote}"</p>

            <div className="t-footer">
                <div className="t-avatar">{t.initial}</div>
                <div className="t-meta">
                    <span className="t-name">{t.name}</span>
                    <span className="t-role">{t.role}</span>
                </div>
            </div>

            <StarRating count={t.stars} />
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className="t-section">
            <div className="t-header">
                <div className="t-badge">
                    <span className="t-badge-dot" />
                    TESTIMONIALS
                </div>
                <h2 className="t-heading">Trusted by Real Clients.</h2>
            </div>

            <div className="t-grid">
                {TESTIMONIALS.map((t, i) => (
                    <TestimonialCard key={i} t={t} index={i} />
                ))}
            </div>
        </section>
    );
}