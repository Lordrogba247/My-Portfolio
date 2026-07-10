import { useEffect, useRef } from "react";
import "./Hero.css";
import Image from "../../assets/Adedapo.png";

const TOOLS = ["HTML", "CSS", "JavaScript", "React", "AI Tools", "Adobe Photoshop", "Adobe Illustrator", "CorelDraw", "Canva", "GitHub", "Vercel", "Render"];

const STATS = [
    { label: "ROLE", value: "Frontend Developer & Graphic Designer" },
    { label: "BASED IN", value: "Nigeria, Osun & Kwara" },
    { label: "FOCUS", value: "Client Sites & Own Projects" },
    { label: "WORKING STYLE", value: "Remote, Flexible, Reliable" },
];

export default function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animId;

        let ox = 0, oy = 0, tx = 0, ty = 0;
        const onMouse = (e) => {
            tx = (e.clientX / window.innerWidth - 0.5) * 14;
            ty = (e.clientY / window.innerHeight - 0.5) * 8;
        };
        window.addEventListener("mousemove", onMouse);

        let stars = [];
        const buildStars = () => {
            stars = [];
            const n = Math.floor((canvas.width * canvas.height) / 3000);
            for (let i = 0; i < n; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 1.4 + 0.25,
                    alpha: Math.random() * 0.75 + 0.2,
                    spd: Math.random() * 0.006 + 0.002,
                    ph: Math.random() * Math.PI * 2,
                    dep: Math.random() * 0.55 + 0.35,
                });
            }
        };

        let dots = [];
        const buildDots = () => {
            dots = [];
            const spacing = 38;
            const cols = Math.ceil(canvas.width / spacing) + 1;
            const rows = Math.ceil(canvas.height / spacing) + 1;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const jx = (Math.random() - 0.5) * 10;
                    const jy = (Math.random() - 0.5) * 10;
                    dots.push({
                        x: c * spacing + jx,
                        y: r * spacing + jy,
                        r: Math.random() * 1.1 + 0.3,
                        ph: Math.random() * Math.PI * 2,
                        spd: Math.random() * 0.012 + 0.004,
                        baseAlpha: Math.random() * 0.18 + 0.04,
                    });
                }
            }
        };

        let shoots = [];
        const maybeShoot = () => {
            if (Math.random() < 0.022) {
                const fromTop = Math.random() < 0.6;
                shoots.push({
                    x: fromTop ? Math.random() * canvas.width : -50,
                    y: fromTop ? Math.random() * canvas.height * 0.4 : Math.random() * canvas.height * 0.55,
                    angle: fromTop ? Math.PI / 5 : Math.PI / 7,
                    spd: 10 + Math.random() * 9,
                    life: 0,
                    maxLife: 50 + (Math.random() * 20 | 0),
                    tail: 65 + Math.random() * 65,
                    alpha: 1,
                });
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        let t = 0;
        const draw = () => {
            t += 0.007;
            ox += (tx - ox) * 0.038;
            oy += (ty - oy) * 0.038;

            const bg = ctx.createLinearGradient(0, 0, canvas.width * 0.3, canvas.height);
            bg.addColorStop(0, "#010d1c");
            bg.addColorStop(0.35, "#031a2c");
            bg.addColorStop(0.65, "#052535");
            bg.addColorStop(1, "#021620");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const neb = ctx.createRadialGradient(
                canvas.width * 0.75, canvas.height * 0.22, 0,
                canvas.width * 0.75, canvas.height * 0.22, canvas.width * 0.5
            );
            neb.addColorStop(0, "rgba(0,185,215,0.055)");
            neb.addColorStop(0.5, "rgba(0,110,155,0.03)");
            neb.addColorStop(1, "transparent");
            ctx.fillStyle = neb;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const neb2 = ctx.createRadialGradient(
                canvas.width * 0.08, canvas.height * 0.85, 0,
                canvas.width * 0.08, canvas.height * 0.85, canvas.width * 0.55
            );
            neb2.addColorStop(0, "rgba(0,200,220,0.04)");
            neb2.addColorStop(0.6, "rgba(0,120,160,0.02)");
            neb2.addColorStop(1, "transparent");
            ctx.fillStyle = neb2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            dots.forEach((d) => {
                const wave = 0.5 + 0.5 * Math.sin(t * d.spd * 60 + d.ph);
                const alpha = d.baseAlpha * wave;
                const px = d.x + ox * 0.2;
                const py = d.y + oy * 0.2;
                const halo = ctx.createRadialGradient(px, py, 0, px, py, d.r * 3.5);
                halo.addColorStop(0, `rgba(120,210,230,${alpha * 0.7})`);
                halo.addColorStop(0.5, `rgba(60,170,200,${alpha * 0.3})`);
                halo.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(px, py, d.r * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = halo;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(px, py, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(160,230,245,${alpha * 1.6})`;
                ctx.fill();
            });

            stars.forEach((s) => {
                const flicker = 0.4 + 0.6 * Math.sin(t * s.spd * 60 + s.ph);
                const px = s.x + ox * s.dep;
                const py = s.y + oy * s.dep;
                ctx.beginPath();
                ctx.arc(px, py, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(210,238,255,${s.alpha * flicker})`;
                ctx.fill();
            });

            maybeShoot();
            shoots = shoots.filter((s) => s.life < s.maxLife);
            shoots.forEach((s) => {
                s.life++;
                s.x += Math.cos(s.angle) * s.spd;
                s.y += Math.sin(s.angle) * s.spd;
                s.alpha = 1 - s.life / s.maxLife;
                const tx2 = s.x - Math.cos(s.angle) * s.tail;
                const ty2 = s.y - Math.sin(s.angle) * s.tail;
                const g = ctx.createLinearGradient(tx2, ty2, s.x, s.y);
                g.addColorStop(0, `rgba(0,220,245,0)`);
                g.addColorStop(0.7, `rgba(0,220,245,${s.alpha * 0.55})`);
                g.addColorStop(1, `rgba(190,245,255,${s.alpha})`);
                ctx.beginPath();
                ctx.moveTo(tx2, ty2);
                ctx.lineTo(s.x, s.y);
                ctx.strokeStyle = g;
                ctx.lineWidth = 1.6;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200,248,255,${s.alpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        resize();
        buildStars();
        buildDots();
        draw();

        const onResize = () => { resize(); buildStars(); buildDots(); };
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouse);
        };
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="hero-root">
            <canvas ref={canvasRef} className="hero-canvas" />

            {/* hero-body sits below the fixed navbar via padding-top */}
            <div className="hero-body">

                <div className="hero-left-wrap">
                    <div className="hero-left-glow" />
                    <div className="hero-left">
                        <div className="about-badge">
                            <span className="badge-dot" />
                            ABOUT
                        </div>

                        <h1 className="hero-name">
                            Aderogba<br />Michael Adedapo
                        </h1>

                        <p className="hero-tagline">
                            I build websites that help businesses get{" "}
                            <span className="tagline-accent">more clients.</span>
                        </p>

                        <p className="hero-desc">
                            Your website should be your best salesperson. Most websites look good but don't bring in clients — I fix that.
                        </p>
                        <p className="hero-desc">
                            I hand-code every site from scratch using HTML, CSS, JavaScript and React. AI-powered workflows — delivered fast, without cutting corners.
                        </p>

                        <div className="hero-actions">
                            <button className="btn-primary" onClick={() => scrollTo("contact")}>
                                Start a Project →
                            </button>
                            <button className="btn-ghost" onClick={() => scrollTo("projects")}>
                                View My Work →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="profile-card">
                    <div className="card-glow-sweep" />

                    <div className="card-header">
                        <div className="card-avatar-wrap">
                            <div className="card-avatar">
                                <img src={Image} alt="Aderogba Michael Adedapo" />
                            </div>
                        </div>
                        <div>
                            <p className="card-role-label">FRONTEND DEVELOPER & GRAPHIC DESIGNER</p>
                            <p className="card-name">Aderogba Michael Adedapo</p>
                        </div>
                    </div>

                    <div className="card-divider" />

                    <div className="card-stats">
                        {STATS.map(({ label, value }) => (
                            <div className="card-stat" key={label}>
                                <p className="stat-label">{label}</p>
                                <p className="stat-value">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="card-tools">
                        <p className="stat-label">TOOLS I USE</p>
                        <div className="tools-list">
                            {TOOLS.map((tool) => (
                                <span className="tool-tag" key={tool}>{tool}</span>
                            ))}
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="card-status">
                            <span className="status-dot" />
                            <span>Currently accepting freelance projects</span>
                        </div>
                        <div className="selected-note">• Selected projects only.</div>
                    </div>
                </div>

            </div>
        </div>
    );
}