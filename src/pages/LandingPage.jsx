import { useState, useEffect } from 'react'
import logo from '../../public/Screenshot_2026-06-28_200344-removebg-preview.png'
import V from '../assets/1.mp4'
import '../styles/landingPage.css'

const CLIENTS = [
    { name: 'Modern Builds' },
    { name: 'ArchStudio' },
    { name: 'NatureHomes' },
    { name: 'EcoDesign' },
    { name: 'VillaX' },
    { name: 'SkyLine' },
]

 
const aboutServices = [
    {
        icon: 'fa-solid fa-compass-drafting',
        title: 'Architectural Design',
        desc: 'Curated professional plans tailored to your vision and budget.',
    },
    {
        icon: 'fa-solid fa-helmet-safety',
        title: 'Engineering Support',
        desc: 'Licensed engineers review and validate every project detail.',
    },
    {
        icon: 'fa-solid fa-calculator',
        title: '24/7 Smart Estimation',
        desc: 'Instant cost breakdowns with real material ratios.',
    },
]

 
const sliderServices = [
    {
        id: 1,
        icon: 'fa-solid fa-building',
        title: 'Explore Designs',
        desc: 'Discover a collection of modern architectural designs created by professionals and choose the one that fits your vision.',
        tag: 'Browse Collection',
        bg: '/src/assets/img1.jpg',
    },
    {
        id: 2,
        icon: 'fa-solid fa-pen-nib',
        title: 'Customize Your Design',
        desc: 'Need changes? Work with our engineers to modify designs according to your requirements.',
        tag: 'Personalize',
        bg: '/src/assets/im3.webp',
    },
    {
        id: 3,
        icon: 'fa-solid fa-calculator',
        title: 'Estimate Construction Cost',
        desc: 'Get an initial estimation of your building cost based on your land area and project details.',
        tag: 'Smart Pricing',
        bg: '/src/assets/img4.avif',
    },
    {
        id: 4,
        icon: 'fa-solid fa-users',
        title: 'Engineering Support',
        desc: 'Receive guidance from experienced engineers throughout your design journey.',
        tag: 'Expert Team',
        bg: '/src/assets/im3.webp',
    },
    {
        id: 5,
        icon: 'fa-solid fa-cube',
        title: '2D & 3D Conversion',
        desc: "Transform your floor plans from 2D drawings into stunning 3D visualizations to see your home before it's built.",
        tag: '3D Visualization',
        bg: '/src/assets/img2.jpg',
    },
    {
        id: 6,
        icon: 'fa-solid fa-ruler-combined',
        title: 'Floor Plans',
        desc: 'Access detailed and professionally drafted floor plans for every design, optimized for space and functionality.',
        tag: 'Detailed Plans',
        bg: '/src/assets/img2.jpg',
    },
]

function LandingPage() {
    const [activeLink, setActiveLink] = useState('Home')
    const [loaded, setLoaded] = useState(false)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100)
        return () => clearTimeout(t)
    }, [])

    const links = ['Home', 'About Us', 'Services', 'Portfolio', 'Process']

    const prev = () => setActive(i => (i === 0 ? sliderServices.length - 1 : i - 1))
    const next = () => setActive(i => (i === sliderServices.length - 1 ? 0 : i + 1))

    return (
        <>
            <header className='header'>
                <video
                    className="header-video"
                    src={V}
                    autoPlay
                    muted
                    playsInline
                    // onEnded={(e) => {
                    //     e.target.currentTime = 0
                    //     e.target.pause()
                    // }}
                />

                <div className="overlay">
                    {/* Navbar */}
                    <div className={`nav-wrapper ${loaded ? 'nav-loaded' : ''}`}>
                        <nav>
                            <div className="logo">
                                <img src={logo} alt="Homi Logo" />
                            </div>
                            <div className="links">
                                <ul>
                                    {links.map(link => (
                                        <li
                                            key={link}
                                            className={activeLink === link ? 'active' : ''}
                                        >
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setActiveLink(link)
                                                }}
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="nav-cta">Sign In</button>
                        </nav>
                    </div>

                    {/* Hero Row */}
                    <div className={`hero-row ${loaded ? 'hero-loaded' : ''}`}>

                        <div className="header-content">
                            <span className="eyebrow">ARCHITECTURE & DESIGN</span>
                            <h1>Design Your <span style={{ color: "#33B3B3" }}>Dream Home</span> With Confidence</h1>
                            <p>Explore professionally designed homes, customize your favorite plans,
                                and estimate your building cost — all in one place.</p>
                            <div className="btns">
                                <button className="btn-outline btn-1">
                                    <span>Explore Plans</span>
                                    <span className="btn-arrow">→</span>
                                </button>
                                <button className="btn-outline">
                                    <span>Calculate Cost</span>
                                    <span className="btn-arrow">→</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="hero-right">
                            <div className="stats-card">
                                <div className="stats-card-glow" />
                                <div className="stats-top">
                                    <div className="stats-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="stats-big-number">150+</div>
                                        <div className="stats-big-label">Projects Delivered</div>
                                    </div>
                                </div>
                                <div className="stats-progress-section">
                                    <div className="stats-progress-header">
                                        <span>Client Satisfaction</span>
                                        <span>98%</span>
                                    </div>
                                    <div className="stats-progress-bar">
                                        <div className="stats-progress-fill" />
                                    </div>
                                </div>
                                <div className="stats-divider" />
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <span className="stat-value">5+</span>
                                        <span className="stat-label">Years</span>
                                    </div>
                                    <div className="stats-vline" />
                                    <div className="stat-item">
                                        <span className="stat-value">24/7</span>
                                        <span className="stat-label">Support</span>
                                    </div>
                                    <div className="stats-vline" />
                                    <div className="stat-item">
                                        <span className="stat-value">100%</span>
                                        <span className="stat-label">Quality</span>
                                    </div>
                                </div>
                                <div className="stats-tags">
                                    <div className="stats-tag">
                                        <span className="ping-dot">
                                            <span className="ping-ring" />
                                            <span className="ping-core" />
                                        </span>
                                        ACTIVE
                                    </div>
                                    <div className="stats-tag">★ PREMIUM</div>
                                </div>
                            </div>

                            <div className="marquee-card">
                                <p className="marquee-title">Trusted by Industry Leaders</p>
                                <div className="marquee-mask">
                                    <div className="marquee-track">
                                        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                                            <div key={i} className="marquee-item">
                                                <span>{client.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <div className="scroll-mouse">
                        <div className="scroll-dot" />
                    </div>
                    <div className="scroll-chevrons">
                        <span />
                        <span />
                    </div>
                </div>
            </header>

            {/* ===== ABOUT SECTION ===== */}
            <section className="about-section">
                <div className="about-container">
                    <div className="about-left">
                        <span className="about-eyebrow">
                            <i className="fa-solid fa-location-crosshairs" />
                            About Homi
                        </span>
                        <h2 className="about-heading">
                            Delivering Exceptional <br />
                            <span>Architectural Solutions.</span>
                        </h2>
                        <p className="about-desc">
                            Homi is an architectural platform that connects you with professional
                            home designs and engineering solutions. We make the journey of building
                            your dream home simpler — from choosing the right design to understanding
                            your construction budget.
                        </p>
                        <ul className="about-checks">
                            <li><i className="fa-solid fa-check" /> Professional Architectural Designs</li>
                            <li><i className="fa-solid fa-check" /> Engineering Support</li>
                            <li><i className="fa-solid fa-check" /> Smart Cost Estimation</li>
                        </ul>
                        <a href="#" className="about-btn">
                            Homi Team <i className="fa-solid fa-arrow-right" />
                        </a>
                    </div>

                    <div className="about-images">
                        <div className="about-img-main">
                            <img src="/src/assets/img4.avif" alt="Architecture" />
                        </div>
                        <div className="about-img-secondary">
                            <img src="/src/assets/img2.jpg" alt="Interior" />
                        </div>
                        <div className="about-badge">
                            <span className="badge-number">25</span>
                            <span className="badge-label">Years Of Experience</span>
                        </div>
                    </div>

                    <div className="about-services">
                        {aboutServices.map((s, i) => (
                            <div className="about-service-card" key={i}>
                                <div className="service-icon-wrap">
                                    <i className={s.icon} />
                                </div>
                                <div className="service-text">
                                    <h4>{s.title}</h4>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SERVICES SECTION ===== */}
            <section className="services-section">
                <div className="services-top">
                    <span className="services-eyebrow">
                        <i className="fa-solid fa-location-crosshairs" /> Our Services
                    </span>
                    <h2 className="services-heading">
                        Everything You Need To <span>Build Your Home</span>
                    </h2>
                </div>

                <div className="services-slider-wrap">
                    <div className="services-main-card" style={{ backgroundImage: `url(${sliderServices[active].bg})` }}>
                        <div className="services-main-overlay" />
                        <div className="services-main-content">
                            <div className="srv-icon-pill">
                                <i className={sliderServices[active].icon} />
                                <span>{sliderServices[active].tag}</span>
                            </div>
                            <h3>{sliderServices[active].title}</h3>
                            <p>{sliderServices[active].desc}</p>
                            <button className="srv-cta">See More</button>
                        </div>
                    </div>

                    <div className="services-side-cards">
                        {sliderServices.map((s, i) => {
                            if (i === active) return null
                            const isNext = i === (active + 1) % sliderServices.length
                            const isNext2 = i === (active + 2) % sliderServices.length
                            if (!isNext && !isNext2) return null
                            return (
                                <div
                                    key={s.id}
                                    className={`services-side-card ${isNext ? 'side-first' : 'side-second'}`}
                                    style={{ backgroundImage: `url(${s.bg})` }}
                                    onClick={() => setActive(i)}
                                >
                                    <div className="services-side-overlay" />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="services-nav">
                    <button className="srv-nav-btn" onClick={prev}>
                        <i className="fa-solid fa-chevron-left" />
                    </button>
                    <div className="srv-dots">
                        {sliderServices.map((_, i) => (
                            <button
                                key={i}
                                className={`srv-dot ${i === active ? 'dot-active' : ''}`}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>
                    <button className="srv-nav-btn" onClick={next}>
                        <i className="fa-solid fa-chevron-right" />
                    </button>
                </div>
            </section>
        </>
    )
}

export default LandingPage