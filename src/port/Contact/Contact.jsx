import { useState } from "react";
import "./Contact.css";

const SOCIALS = [
    {
        label: "GitHub",
        href: "https://github.com/Lordrogba247",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://instagram.com/rogba_graphix",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aderogba-adedapo-402247324",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
];

export default function Contact() {
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResult("");
        const formData = new FormData(event.target);
        formData.append("access_key", "66323cb7-4f63-46a4-a14f-29a9afdaf9db");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setLoading(false);

        if (data.success) {
            setResult("success");
            event.target.reset();
        } else {
            setResult("error");
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-inner">

                {/* ── Left ── */}
                <div className="contact-left">
                    <div className="contact-badge">
                        <span className="contact-badge-dot" />
                        LET'S WORK TOGETHER
                    </div>

                    <h2 className="contact-heading">
                        Ready to Start<br />a Project?
                    </h2>

                    <p className="contact-desc">
                        Whether you need a hand-coded website, a React web app, or a stunning graphic design — I'm available and ready. Let's build something great.
                    </p>

                    <div className="contact-actions">
                        <a
                            className="contact-btn-primary"

                        >
                            Start a Project →
                        </a>
                        <a
                            className="contact-btn-ghost"
                            href={`https://wa.me/2348165011479?text=Hi%20Rogba%2C%20I%20found%20you%20through%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%20Please%20let%20me%20know%20how%20we%20can%20connect`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp Me →
                        </a>
                    </div>

                    <div className="contact-socials">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-btn"
                                aria-label={s.label}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Right — Form ── */}
                <div className="contact-form-wrap">
                    <form className="contact-form" onSubmit={onSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">NAME</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">EMAIL</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">SUBJECT</label>
                            <input
                                className="form-input"
                                type="text"
                                name="subject"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">MESSAGE</label>
                            <textarea
                                className="form-textarea"
                                name="message"
                                placeholder="Tell me about your project..."
                                rows={5}
                                required
                            />
                        </div>

                        <button
                            className={`form-submit ${loading ? "form-submit--loading" : ""}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message →"}
                        </button>

                        {result === "success" && (
                            <p className="form-result form-result--success">
                                ✓ Message sent successfully! I'll get back to you soon.
                            </p>
                        )}
                        {result === "error" && (
                            <p className="form-result form-result--error">
                                ✕ Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </div>

            </div>
        </section>
    );
}