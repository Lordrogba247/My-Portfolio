import { useState, useRef, useEffect } from "react";
import "./Projects.css";
import posDesign from "../../assets/design-project-1.jpg";
import shake from "../../assets/design-project-2.png";
import penWorld from "../../assets/design-project-4.jpg";
import priceList from "../../assets/design-project-5.jpg";
import december from "../../assets/design-project-3.png";
import mkCouture from "../../assets/design-project-7.jpg";
import willow from "../../assets/design-project-8.jpg";
import prettyCrown from "../../assets/design-project-11.png";
import sisiPelebe from "../../assets/design-project-13.jpg";
// Simplified to three top-level filters
const FILTERS = ["All", "Website", "Design"];

const PROJECTS = [
    {
        title: "Heroes College & Primary School",
        desc: "A fully responsive school landing site built for a Nigerian institution with campuses in Kwara State — covering admissions, about, and policy pages with smooth React Router navigation and a polished, professional finish.",
        url: " https://heroes-school.vercel.app",
        tags: ["React", "React Router", "CSS"],
        category: "Website",
        type: "dev",
        liveUrl: " https://heroes-school.vercel.app",
    },
    {
        title: "Whot Suya",
        desc: "A food ordering platform with a smooth checkout flow, dynamic order confirmation, and responsive navigation, built with careful attention to real-world payment and delivery edge cases.",
        url: "https://whotfoods.ca",
        tags: ["React", "JavaScript", "CSS"],
        category: "Website",
        type: "dev",
        liveUrl: "https://whotfoods.ca",
    },
    {
        title: "Whot Restaurant",
        desc: "A modern React-powered Canadian restaurant web application with a sleek UI, responsive layout, and seamless component-driven architecture built for performance.",
        url: "https://whot.ca",
        tags: ["React", "JavaScript", "CSS"],
        category: "Website",
        type: "dev",
        liveUrl: "https://whot.ca",
    },
    {
        title: "DocMed",
        desc: "A clean, fully responsive medical platform built from scratch — designed to present healthcare services with clarity, trust, and a professional finish.",
        url: "https://docmed-1.onrender.com",
        tags: ["HTML", "CSS"],
        category: "Website",
        type: "dev",
        liveUrl: "https://docmed-1.onrender.com",
    },
    {
        title: "Printivo",
        desc: "A dynamic print-on-demand storefront with interactive product filtering, smooth UI transitions, and a polished e-commerce experience.",
        url: "https://new-printivo.vercel.app",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "Website",
        type: "dev",
        liveUrl: "https://new-printivo.vercel.app",
    },


    // ── DESIGN WORK ──────────────────────────────────────────────
    // Replace `image` with the path to your actual design shots.
    // Drop your images in e.g. src/assets/designs/ and import them,
    // or reference a public/ path directly as done below.
    {
        title: "Adeoti Ajikanje Enterprises — POS Flyer",
        desc: "A bold, high-contrast promotional flyer designed for a POS/agent banking business — combining a strong red-and-white brand palette, clear service listing, and bank/network logos to build instant trust and communicate value at a glance.",
        image: posDesign,   // ← imported variable, not a string path
        tags: ["Flyer Design", "Branding"],
        category: "Design",
        type: "design",
    },
    {
        title: " Anettcom Technologies Academy — Tech Learning Poster",
        desc: "A striking promotional poster for a tech training academy, built around a human-meets-AI handshake visual to symbolize the shift from learner to tech professional — paired with bold typography and a clean, high-contrast blue palette for strong brand presence.",
        image: shake,
        tags: ["Poster Design", "Branding"],
        category: "Design",
        type: "design",
    },
    {
        title: "PENWorld Web Services",
        desc: "Print-ready promotional artwork combining typography and imagery for maximum visual impact — replace with your real project description.",
        image: penWorld,
        tags: ["Flyer Design", "Web Promo"],
        category: "Design",
        type: "design",
    },
    {
        title: "Ademide Food Mart — Price List Flyer",
        desc: "A tiered price-list flyer for a food mart, organizing three package options with clear iconography and product photography — using a warm yellow-and-brown palette and structured layout to make pricing easy to scan and compare at a glance.",
        image: priceList,
        tags: ["Flyer Design", "Price List"],
        category: "Design",
        type: "design",
    },
    {
        title: "Merry Christmas — Seasonal Greeting Post",
        desc: "A festive seasonal greeting design under my own brand (rogba.graphix), pairing elegant script typography with a warm, cohesive red Christmas theme — designed for social media to combine brand visibility with a personal, festive touch.",
        image: december,
        tags: ["Social Media", "Branding"],
        category: "Design",
        type: "design",
    },
    {
        title: "MK Couture — Fashion Brand Flyer",
        desc: "A layered fashion brand flyer for a custom tailoring business, combining a warm tan-and-charcoal color split, product photo grid, and a services checklist to showcase both traditional wear (agbada, kaftan) and streetwear (hoodies, joggers) under one cohesive brand identity.",
        image: mkCouture,
        tags: ["Flyer Design", "Fashion Branding"],
        category: "Design",
        type: "design",
    },
    {
        title: "The Willows Nest Hotel — Happy New Month Promo",
        desc: "A luxury hotel promotional post pairing a striking 3D architectural render with warm gold-and-brown tones, using bold seasonal messaging to build brand presence while showcasing the property itself as the centerpiece.",
        image: willow,
        tags: ["Social Media", "Hospitality Branding"],
        category: "Design",
        type: "design",
    },
    {
        title: "Pretty Crown Bubbles — Liquid Soap Product Sticker",
        desc: "A vibrant green product flyer for a multipurpose liquid soap, using circular lifestyle photography and a clean benefits checklist to communicate versatility and trust at a glance.",
        image: prettyCrown,
        tags: ["Product Design", "Branding"],
        category: "Design",
        type: "design",
    },
    {
        title: "Sisi Pelebe's Kitchen — Menu & Services Flyer",
        desc: "A warm, appetizing menu flyer for a home kitchen business, pairing a friendly chef portrait with a structured services list and mouth-watering food photography to build trust and drive orders.",
        image: sisiPelebe,
        tags: ["Flyer Design", "Food & Menu Design"],
        category: "Design",
        type: "design",
    },
    // Add more Website or Design entries below anytime — the "All" view
    // automatically shows the first 3 of each, so newest/best work first.
];

function ProjectCard({ project, index, onImageClick }) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const isDesign = project.type === "design";

    return (
        <div
            className={`proj-card ${visible ? "proj-card--visible" : ""}`}
            style={{ animationDelay: `${index * 0.13}s` }}
            ref={cardRef}
        >
            {/* Type badge — shows at a glance whether this is Dev or Design work */}
            <div className={`proj-type-badge ${isDesign ? "proj-type-badge--design" : "proj-type-badge--dev"}`}>
                {isDesign ? "🎨 Design" : "💻 Dev"}
            </div>

            {isDesign ? (
                /* ── Design preview: static image, no browser chrome ── */
                <div className="proj-preview proj-preview--design">
                    <div className="proj-frame-wrap proj-frame-wrap--design">
                        {!errored ? (
                            <>
                                {!loaded && (
                                    <div className="proj-skeleton">
                                        <div className="skeleton-shimmer" />
                                    </div>
                                )}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`proj-design-img proj-design-img--clickable ${loaded ? "proj-design-img--loaded" : ""}`}
                                    onLoad={() => setLoaded(true)}
                                    onError={() => setErrored(true)}
                                    onClick={() => onImageClick(project.image, project.title)}
                                    loading="lazy"
                                />
                            </>
                        ) : (
                            <div className="proj-fallback">
                                <span className="proj-fallback-icon">🎨</span>
                                <p>{project.title}</p>
                                <span>Image unavailable</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* ── Dev preview: fake browser window + live iframe ── */
                <div className="proj-preview">
                    <div className="proj-browser-bar">
                        <div className="browser-dots">
                            <span className="browser-dot red" />
                            <span className="browser-dot yellow" />
                            <span className="browser-dot green" />
                        </div>
                        <span className="browser-url">{project.url.replace("https://", "")}</span>
                    </div>
                    <div className="proj-frame-wrap">
                        {!errored ? (
                            <>
                                {!loaded && (
                                    <div className="proj-skeleton">
                                        <div className="skeleton-shimmer" />
                                    </div>
                                )}
                                <iframe
                                    src={project.url}
                                    title={project.title}
                                    className={`proj-iframe ${loaded ? "proj-iframe--loaded" : ""}`}
                                    onLoad={() => setLoaded(true)}
                                    onError={() => setErrored(true)}
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </>
                        ) : (
                            <div className="proj-fallback">
                                <span className="proj-fallback-icon">🌐</span>
                                <p>{project.title}</p>
                                <span>Preview unavailable</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Text info */}
            <div className="proj-info">
                <h3 className="proj-title">{project.title}</h3>
                <p className="proj-desc">{project.desc}</p>
                <div className="proj-tags">
                    {project.tags.map((t) => (
                        <span className="proj-tag" key={t}>{t}</span>
                    ))}
                </div>
                {!isDesign && (
                    <a
                        className="proj-live-btn"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live Site &gt;
                    </a>
                )}
            </div>
        </div>
    );
}

export default function Projects() {
    const [active, setActive] = useState("All");
    const sectionRef = useRef(null);
    const [sectionVisible, setSectionVisible] = useState(false);
    const [lightbox, setLightbox] = useState(null); // { image, title } | null

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") setLightbox(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // Section-level fade-in from below
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSectionVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // "All" shows a curated mix: first 3 Website + first 3 Design projects.
    // Selecting "Website" or "Design" shows everything in that category.
    const filtered =
        active === "All"
            ? [
                ...PROJECTS.filter((p) => p.category === "Website").slice(0, 3),
                ...PROJECTS.filter((p) => p.category === "Design").slice(0, 3),
            ]
            : PROJECTS.filter((p) => p.category === active);

    return (
        <section
            className={`projects-section ${sectionVisible ? "projects-section--visible" : ""}`}
            ref={sectionRef}
        >
            <div className="projects-header">
                <div className="projects-badge">
                    <span className="badge-dot" />
                    MY WORK
                </div>
                <h2 className="projects-heading">Dev &amp; Design Projects.</h2>

                <div className="projects-filters">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            className={`filter-btn ${active === f ? "filter-btn--active" : ""}`}
                            onClick={() => setActive(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="projects-grid">
                {filtered.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={i}
                        onImageClick={(image, title) => setLightbox({ image, title })}
                    />
                ))}
            </div>

            {/* ── Lightbox: click a design image to view it full size ── */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button
                        className="lightbox-close"
                        onClick={() => setLightbox(null)}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                    <img
                        src={lightbox.image}
                        alt={lightbox.title}
                        className="lightbox-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
}