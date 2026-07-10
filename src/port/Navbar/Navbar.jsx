import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
    { label: "About", target: "hero" },
    { label: "Built/Designed", target: "projects" },
    { label: "What I Do", target: "do" },
    { label: "Process", target: "work" },
    { label: "Testimonials", target: "testimonials" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false); // close menu after clicking a link
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar-logo">
                <span className="logo-bracket">&lt;</span>
                <span className="logo-name"> CodeWithRogba </span>
                <span className="logo-bracket">/&gt;</span>
            </div>

            {/* Desktop links */}
            <ul className="navbar-links">
                {NAV_LINKS.map((l) => (
                    <li key={l.label}>
                        <button className="nav-link-btn" onClick={() => scrollTo(l.target)}>
                            {l.label}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Desktop CTA */}
            <button className="btn-cta" onClick={() => scrollTo("contact")}>
                Start a Project →
            </button>

            {/* Hamburger button (mobile only) */}
            <button
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                <span />
                <span />
                <span />
            </button>

            {/* Mobile dropdown menu */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <ul>
                    {NAV_LINKS.map((l) => (
                        <li key={l.label}>
                            <button className="nav-link-btn" onClick={() => scrollTo(l.target)}>
                                {l.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="btn-cta" onClick={() => scrollTo("contact")}>
                    Start a Project →
                </button>
            </div>
        </nav>
    );
}