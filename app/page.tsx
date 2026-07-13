"use client";

import { ContactForm } from '@/components/contact-form';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroArcsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = document.getElementById('siteHeader');
    const hero = heroRef.current;
    const heroArcs = heroArcsRef.current;

    const handleScroll = () => {
      header?.classList.toggle('scrolled', window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealEls.forEach((element) => observer.observe(element));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const handleMouseMove = (event: MouseEvent) => {
      if (!heroArcs) {
        return;
      }

      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 24;
      const y = (event.clientY / innerHeight - 0.5) * 24;
      heroArcs.style.transform = `translate(${x}px, ${y}px)`;
      heroArcs.style.transition = 'transform .3s ease-out';
    };

    if (hero && heroArcs && !prefersReducedMotion) {
      hero.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();

      if (hero && heroArcs && !prefersReducedMotion) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --verde: #1a2620;
          --verde-2: #223028;
          --crema: #f4e3d3;
          --terracota: #e8543e;
          --hueso: #fafaf8;
          --carbon: #2b362f;
          --verde-texto-suave: #9daa9e;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          background: #1a2620;
        }

        body {
          background: var(--verde);
          color: var(--hueso);
          font-family: 'Space Grotesk', sans-serif;
          overflow-x: hidden;
        }

        ::selection {
          background: var(--terracota);
          color: var(--hueso);
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font-family: inherit;
          border: none;
          cursor: pointer;
          background: none;
        }

        :focus-visible {
          outline: 2px solid var(--terracota);
          outline-offset: 4px;
        }

        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.8s cubic-bezier(0.2, 0.7, 0.3, 1),
            transform 0.8s cubic-bezier(0.2, 0.7, 0.3, 1);
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal.d1 {
          transition-delay: 0.08s;
        }

        .reveal.d2 {
          transition-delay: 0.16s;
        }

        .reveal.d3 {
          transition-delay: 0.24s;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          * {
            animation: none !important;
          }
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 26px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          mix-blend-mode: normal;
          transition:
            background 0.4s ease,
            backdrop-filter 0.4s ease,
            padding 0.4s ease;
        }

        header.scrolled {
          background: rgba(26, 38, 32, 0.82);
          backdrop-filter: blur(10px);
          padding: 16px 40px;
          border-bottom: 1px solid rgba(250, 250, 248, 0.08);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 19px;
          letter-spacing: 0.01em;
        }

        .mark-img {
          width: 34px;
          height: auto;
          display: block;
          flex-shrink: 0;
        }

        nav ul {
          list-style: none;
          display: flex;
          gap: 38px;
        }

        nav a {
          font-size: 14.5px;
          color: var(--verde-texto-suave);
          position: relative;
          padding-bottom: 4px;
        }

        nav a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: var(--terracota);
          transition: width 0.3s ease;
        }

        nav a:hover {
          color: var(--hueso);
        }

        nav a:hover::after {
          width: 100%;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 2px;
          font-size: 14.5px;
          font-weight: 500;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            box-shadow 0.25s ease;
          white-space: nowrap;
        }

        .btn-solid {
          background: var(--terracota);
          color: var(--hueso);
        }

        .btn-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(232, 84, 62, 0.55);
        }

        .btn-outline {
          border: 1px solid rgba(250, 250, 248, 0.35);
          color: var(--hueso);
        }

        .btn-outline:hover {
          border-color: var(--hueso);
          background: rgba(250, 250, 248, 0.06);
          transform: translateY(-2px);
        }

        .btn-dark {
          background: var(--verde);
          color: var(--hueso);
        }

        .btn-dark:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -10px rgba(26, 38, 32, 0.5);
        }

        .hero {
          min-height: 100vh;
          position: relative;
          background: var(--verde);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 120px;
          overflow: hidden;
        }

        .hero-arcs {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .arc {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(250, 250, 248, 0.07);
          top: 50%;
          left: 78%;
          transform: translate(-50%, -50%);
          transition: transform 0.2s ease-out;
        }

        .arc.a1 {
          width: 1500px;
          height: 1500px;
        }

        .arc.a2 {
          width: 1140px;
          height: 1140px;
          border-color: rgba(232, 84, 62, 0.28);
        }

        .arc.a3 {
          width: 800px;
          height: 800px;
        }

        @keyframes spin-slow {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .arc.a2 {
          animation: spin-slow 90s linear infinite;
        }

        .hero-notch {
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 130px 130px 0;
          border-color: transparent var(--terracota) transparent transparent;
          opacity: 0;
          animation: drop-in 1.1s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          z-index: 1;
        }

        @keyframes drop-in {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--terracota);
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .eyebrow::before {
          content: '';
          width: 26px;
          height: 1px;
          background: var(--terracota);
        }

        .hero-headline {
          position: relative;
          z-index: 2;
          margin-top: 28px;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.02em;
          max-width: 920px;
        }

        .hero-headline .line {
          overflow: hidden;
          display: block;
        }

        .hero-headline .line span {
          display: block;
          transform: translateY(105%);
          animation: line-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-headline .line:nth-child(1) span {
          animation-delay: 0.15s;
        }

        .hero-headline .line:nth-child(2) span {
          animation-delay: 0.28s;
        }

        .hero-headline em {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--terracota);
        }

        @keyframes line-up {
          to {
            transform: translateY(0);
          }
        }

        .hero-sub {
          position: relative;
          z-index: 2;
          margin-top: 32px;
          max-width: 560px;
          font-size: 19px;
          line-height: 1.6;
          color: var(--verde-texto-suave);
          opacity: 0;
          animation: fade-up 0.9s 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-ctas {
          position: relative;
          z-index: 2;
          margin-top: 44px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fade-up 0.9s 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-scroll {
          position: absolute;
          bottom: 44px;
          left: 40px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--verde-texto-suave);
          letter-spacing: 0.08em;
          opacity: 0;
          animation: fade-up 0.9s 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-scroll .line-anim {
          width: 1px;
          height: 34px;
          background: rgba(250, 250, 248, 0.2);
          position: relative;
          overflow: hidden;
        }

        .hero-scroll .line-anim::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--terracota);
          animation: scroll-drip 1.8s ease-in-out infinite;
        }

        @keyframes scroll-drip {
          0% {
            top: -100%;
          }

          60% {
            top: 100%;
          }

          100% {
            top: 100%;
          }
        }

        .section {
          padding: 150px 0;
          position: relative;
        }

        .section-cream {
          background: var(--crema);
          color: var(--verde);
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--terracota);
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-label::before {
          content: '';
          width: 26px;
          height: 1px;
          background: var(--terracota);
        }

        .section-title {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.08;
          max-width: 680px;
        }

        .section-title em {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--terracota);
        }

        .section-cream .section-title em {
          color: var(--terracota);
        }

        .servicios-grid {
          margin-top: 70px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: rgba(26, 38, 32, 0.12);
          border: 1px solid rgba(26, 38, 32, 0.12);
        }

        .servicio-card {
          background: var(--crema);
          padding: 44px 34px;
          position: relative;
          transition: background 0.35s ease;
          overflow: hidden;
        }

        .servicio-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 0 0;
          border-color: transparent transparent transparent transparent;
          transition: border-width 0.35s ease;
        }

        .servicio-card:hover {
          background: #eedcc8;
        }

        .servicio-card:hover::before {
          border-width: 0 46px 46px 0;
          border-color: transparent var(--terracota) transparent transparent;
        }

        .servicio-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--terracota);
          letter-spacing: 0.1em;
        }

        .servicio-card h3 {
          margin-top: 26px;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .servicio-card p {
          margin-top: 14px;
          font-size: 15px;
          line-height: 1.65;
          color: var(--carbon);
        }

        .servicio-list {
          margin-top: 22px;
          list-style: none;
          font-size: 13.5px;
          color: var(--carbon);
        }

        .servicio-list li {
          padding-left: 18px;
          position: relative;
          margin-top: 8px;
          line-height: 1.5;
        }

        .servicio-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 6px;
          height: 6px;
          background: var(--terracota);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }

        .proceso {
          background: var(--verde);
        }

        .proceso-list {
          margin-top: 70px;
        }

        .proceso-item {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 36px;
          padding: 38px 0;
          border-top: 1px solid rgba(250, 250, 248, 0.1);
          align-items: start;
        }

        .proceso-item:last-child {
          border-bottom: 1px solid rgba(250, 250, 248, 0.1);
        }

        .proceso-index {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: var(--terracota);
          padding-top: 4px;
        }

        .proceso-item h3 {
          font-size: 23px;
          font-weight: 600;
        }

        .proceso-item p {
          margin-top: 10px;
          color: var(--verde-texto-suave);
          font-size: 15.5px;
          line-height: 1.65;
          max-width: 560px;
        }

        .proceso-tag {
          margin-top: 14px;
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--terracota);
          border: 1px solid rgba(232, 84, 62, 0.4);
          padding: 5px 10px;
        }

        .casos-grid {
          margin-top: 70px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .caso-card {
          background: var(--verde);
          color: var(--hueso);
          position: relative;
          padding: 0 0 38px 0;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.3, 1);
        }

        .caso-card:hover {
          transform: translateY(-8px);
        }

        .caso-visual {
          height: 260px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #223028 0%, #1a2620 60%);
          clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
        }

        .caso-visual .glow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232, 84, 62, 0.35), transparent 70%);
          top: -60px;
          right: -60px;
          transition: transform 0.5s ease;
        }

        .caso-card:hover .caso-visual .glow {
          transform: scale(1.25);
        }

        .caso-visual .ui-lines {
          position: absolute;
          left: 32px;
          bottom: 32px;
          right: 32px;
        }

        .ui-row {
          height: 9px;
          background: rgba(250, 250, 248, 0.12);
          margin-top: 9px;
          border-radius: 1px;
        }

        .ui-row.w1 {
          width: 70%;
        }

        .ui-row.w2 {
          width: 100%;
        }

        .ui-row.w3 {
          width: 45%;
          background: rgba(232, 84, 62, 0.5);
        }

        .caso-body {
          padding: 32px 34px 0;
        }

        .caso-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--terracota);
        }

        .caso-card h3 {
          margin-top: 14px;
          font-size: 25px;
          font-weight: 700;
        }

        .caso-card p {
          margin-top: 12px;
          color: var(--verde-texto-suave);
          font-size: 15px;
          line-height: 1.6;
        }

        .caso-feats {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .caso-feats span {
          font-size: 12.5px;
          padding: 6px 12px;
          border: 1px solid rgba(250, 250, 248, 0.18);
          color: var(--hueso);
          border-radius: 2px;
        }

        .manifiesto {
          background: var(--crema);
          color: var(--verde);
          text-align: center;
          padding: 170px 0;
        }

        .manifiesto p {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.35;
          max-width: 880px;
          margin: 0 auto;
        }

        .manifiesto .accent {
          color: var(--terracota);
        }

        .manifiesto-sign {
          margin-top: 36px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--carbon);
        }

        .cta-final {
          background: var(--verde);
          padding: 170px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-final .arc {
          left: 50%;
          top: 50%;
        }

        .cta-final h2 {
          font-size: clamp(38px, 5.5vw, 68px);
          font-weight: 700;
          letter-spacing: -0.02em;
          max-width: 760px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .cta-final h2 em {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--terracota);
        }

        .cta-final .hero-sub {
          margin: 26px auto 0;
          text-align: center;
          position: relative;
          z-index: 2;
          opacity: 1;
          animation: none;
        }

        .cta-final-btns {
          position: relative;
          z-index: 2;
          margin-top: 44px;
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        footer {
          background: var(--verde);
          border-top: 1px solid rgba(250, 250, 248, 0.1);
          padding: 50px 0;
        }

        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-links {
          display: flex;
          gap: 28px;
          list-style: none;
        }

        .footer-links a {
          font-size: 13.5px;
          color: var(--verde-texto-suave);
        }

        .footer-links a:hover {
          color: var(--hueso);
        }

        .footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--verde-texto-suave);
        }

        @media (max-width: 860px) {
          .wrap {
            padding: 0 24px;
          }

          header {
            padding: 20px 24px;
          }

          nav ul {
            display: none;
          }

          .servicios-grid {
            grid-template-columns: 1fr;
          }

          .casos-grid {
            grid-template-columns: 1fr;
          }

          .proceso-item {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .section {
            padding: 100px 0;
          }

          .manifiesto,
          .cta-final {
            padding: 110px 0;
          }

          .hero {
            padding-top: 100px;
          }

          .hero-scroll {
            display: none;
          }
        }
      `}</style>

      <header id="siteHeader">
        <div className="brand">
          <img
            className="mark-img"
            src="data:image/png;base64,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"
            alt="Vant"
          />
          Vant
        </div>
        <div className="nav-links">
          <nav>
            <ul>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#proceso">Proceso</a></li>
              <li><a href="#casos">Casos</a></li>
            </ul>
          </nav>
          <a href="#contacto" className="btn btn-outline">Cotiza tu proyecto</a>
        </div>
      </header>

      <section className="hero" ref={heroRef}>
        <div className="hero-arcs" id="heroArcs" ref={heroArcsRef}>
          <div className="arc a1" />
          <div className="arc a2" />
          <div className="arc a3" />
        </div>
        <div className="hero-notch" />

        <div className="wrap">
          <div className="eyebrow">EST. 2026 — MÉXICO</div>
          <h1 className="hero-headline">
            <span className="line"><span>Tecnología que</span></span>
            <span className="line"><span>se siente <em>tuya</em>.</span></span>
          </h1>
          <p className="hero-sub">
            Diseñamos y construimos apps, sitios web y sistemas a la medida para negocios y clínicas que ya no caben en una plantilla genérica.
          </p>
          <div className="hero-ctas">
            <a href="#contacto" className="btn btn-solid">Cotiza tu proyecto</a>
            <a href="#proceso" className="btn btn-outline">Cómo trabajamos</a>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL</span>
          <span className="line-anim" />
        </div>
      </section>

      <section className="section section-cream" id="servicios">
        <div className="wrap">
          <div className="section-label reveal">Qué hacemos</div>
          <h2 className="section-title reveal d1">
            Tres formas de resolver <em>un mismo problema</em>: que tu negocio funcione mejor.
          </h2>

          <div className="servicios-grid reveal d2">
            <div className="servicio-card">
              <div className="servicio-num">01 — APPS</div>
              <h3>Apps a la medida</h3>
              <p>
                Aplicaciones móviles construidas para tu operación real, no para un caso genérico.
              </p>
              <ul className="servicio-list">
                <li>Agendas y recordatorios automáticos</li>
                <li>Historiales y expedientes digitales</li>
                <li>Pagos y notificaciones integradas</li>
              </ul>
            </div>
            <div className="servicio-card">
              <div className="servicio-num">02 — WEBS</div>
              <h3>Sitios web</h3>
              <p>
                Tu mejor carta de presentación: rápida, clara, y que convierte visitas en clientes.
              </p>
              <ul className="servicio-list">
                <li>Diseño a medida, cero plantillas</li>
                <li>Optimizado para móvil desde el día 1</li>
                <li>Contacto directo por WhatsApp o formulario</li>
              </ul>
            </div>
            <div className="servicio-card">
              <div className="servicio-num">03 — SISTEMAS</div>
              <h3>Sistemas y automatización</h3>
              <p>
                Herramientas internas que le quitan trabajo manual a tu equipo todos los días.
              </p>
              <ul className="servicio-list">
                <li>Paneles de control a la medida</li>
                <li>Automatización de procesos repetitivos</li>
                <li>Integraciones entre tus herramientas actuales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section proceso" id="proceso">
        <div className="wrap">
          <div className="section-label reveal">Cómo trabajamos</div>
          <h2 className="section-title reveal d1">
            Un proceso corto, <em>sin vueltas</em>, pensado para negocios que no tienen tiempo que perder.
          </h2>

          <div className="proceso-list">
            <div className="proceso-item reveal">
              <div className="proceso-index">01</div>
              <div>
                <h3>Entendemos tu operación</h3>
                <p>
                  Una plática a fondo sobre cómo trabajas hoy, dónde pierdes tiempo, y qué necesitas realmente — no lo que "debería" tener un sistema.
                </p>
                <span className="proceso-tag">Punto de partida</span>
              </div>
            </div>
            <div className="proceso-item reveal d1">
              <div className="proceso-index">02</div>
              <div>
                <h3>Diseñamos y construimos</h3>
                <p>
                  Avances visibles cada semana, no una entrega sorpresa al final. Ajustamos sobre la marcha con tu retroalimentación real.
                </p>
                <span className="proceso-tag">Fase activa</span>
              </div>
            </div>
            <div className="proceso-item reveal d2">
              <div className="proceso-index">03</div>
              <div>
                <h3>Lanzamos y afinamos</h3>
                <p>
                  Tu app o sistema entra en uso real, y seguimos cerca las primeras semanas para resolver cualquier ajuste que solo aparece con uso real.
                </p>
                <span className="proceso-tag">Cierre y ajuste</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream" id="casos">
        <div className="wrap">
          <div className="section-label reveal">Casos en desarrollo</div>
          <h2 className="section-title reveal d1">
            Dos negocios reales, <em>dos problemas reales</em> que ya estamos resolviendo.
          </h2>

          <div className="casos-grid">
            <article className="caso-card reveal d2">
              <div className="caso-visual">
                <div className="glow" />
                <div className="ui-lines">
                  <div className="ui-row w1" />
                  <div className="ui-row w2" />
                  <div className="ui-row w3" />
                </div>
              </div>
              <div className="caso-body">
                <div className="caso-tag">Consultorio dental</div>
                <h3>Agenda sin llamadas perdidas</h3>
                <p>
                  Un sistema de citas que le quita al consultorio el trabajo de confirmar por teléfono uno por uno.
                </p>
                <div className="caso-feats">
                  <span>Agenda de citas</span>
                  <span>Recordatorios automáticos</span>
                  <span>Historial de pacientes</span>
                </div>
              </div>
            </article>

            <article className="caso-card reveal d3">
              <div className="caso-visual">
                <div className="glow" />
                <div className="ui-lines">
                  <div className="ui-row w2" />
                  <div className="ui-row w1" />
                  <div className="ui-row w3" />
                </div>
              </div>
              <div className="caso-body">
                <div className="caso-tag">Clínica de psicología</div>
                <h3>Notas de sesión, sin fricción</h3>
                <p>
                  Agenda con confidencialidad reforzada y notas de sesión organizadas, pensadas para el ritmo real de una consulta.
                </p>
                <div className="caso-feats">
                  <span>Agenda confidencial</span>
                  <span>Notas de sesión</span>
                  <span>Recordatorios al paciente</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="manifiesto">
        <div className="wrap">
          <p className="reveal">
            No creemos en <span className="accent">plantillas</span> que casi funcionan. Creemos en construir una vez, bien, lo que tu negocio necesita de verdad.
          </p>
          <div className="manifiesto-sign reveal d1">— Vant</div>
        </div>
      </section>

      <section className="cta-final" id="contacto">
        <div className="hero-arcs">
          <div className="arc a1" />
          <div className="arc a2" />
        </div>
        <div className="wrap">
          <h2 className="reveal">¿Tu negocio necesita <em>algo así</em>?</h2>
          <p className="hero-sub reveal d1">
            Cuéntanos qué haces y en qué se te va el tiempo. En una plática corta te decimos si podemos ayudarte y cómo.
          </p>
          <ContactForm />
          <div className="cta-final-btns reveal d2">
            <a href="mailto:hola@vantmx.com.mx" className="btn btn-solid">
              hola@vantmx.com.mx
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap footer-row">
          <div className="brand">
            <img
              className="mark-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAACACAYAAADEUH2bAAAjD0lEQVR4nO19aXhUVbb2u/Y5NQUykRkSBkFmUWQG0UQBJwQFSfcnLajdSqPd2vYV0b56E+zPRltbFEca26/Vz/Z2orZobESGREC8KiCzIMgQApnJnKpTdfZe90edwoAMGapCEnifpx5C1alT++y199prr/WutQltFFlZWdqMGTMIgCIiddLHnZe8saRXt6Ru/QcPGthj/4GDaT1Tuocz00WmNLuFd+7M4eERZLPZTnlv0zRRXVPNtTW1pOniiBBif/7hQzW9evXK3bnru0OFJYW773rwrgMoRW3D7zGzACCys7M5PT1dhubJQwM61w1oiIyMDJGamiquueYaU6kfZXvffffFTJs2bVinTp2uDA/vPDYmtktPQVr3yKhIzW5znHAPpdTxFzOf9rc0TYMQAkKIE973SS8qK6slK5VfUVF+sLamdkOdx712ec7yTU899VR54DohBFbL1XpeZp5asGDByQOxzaEtCJqsmcINZ+7CZxcOSx2felVUZNT1EeERoxITE8MbCkWZEqY0mRmKlSIQgcFERAQA1j+nhX8MMJiZiYiZGYIEgyB03U6aRg2uZZSWllRXVFZ+e/DQwXV79u358IF7H9jU4HMBf18qIjr96DqHOGeCZmYCIIQQMjDzHnvisaHXT7x+ckJ83NSoqOhhMV1ij1/v9XqlUsqSCxEAcTZhNr9tAMDK+ouF0Mhus2uB3jpWcQzVVVWbyiuOLctbszLnoYce/bbBc2logwJvdUEzM+Xl5WlpaWmm9Za+fPnyW5JTku+OiYmZmJSYBADwmT4oU5kMDgi1ldvaUE4EpcBErIiIhabpNl0HAJSUFKOiomJlaWnx0smTp66sqqqqBIDc3Fw9NTVVthWBt2bnUW5u7nEB33bbbdF3/eqOe/r26X9nt27d+gkhIKWEaZqmUkoQUchmbEvBzGBmRUTKptt0TdcAAAcOHigoLCp86b2s95YuWrToGNB2BN4qPcnMGhFJAJj9wOyoeXPmzUmIi78vNjYuBQAMw5BKKRCR1laFezpYQpdCaHA47BoAVFZVHi4vK3/57Y/fXrLgwQWV1nXH++BcIKS9mpGRITIzM2EZWdHrvlh3z8UX9/1NQlx8MgB4PYYpWQlxsunbLkFgqZg0kg6HQweAYxXHCg4eOvjSLbNu+Wv+9vwKIQQef/xxcS6s9FAJ+gQ1nbM8Z0a/i/s93ad3n14A4HZ7JMBCCJ38a2GbWMaCBIZkxQQolzNMA4D8wwcP5Bccmj9+bOp7ADg3N1dPS0uTaMUHD/pMysjIEEIITktLM+fPnz/0+++/X3bdpOuy+vTu08swDNNd72YhSBNCEKDQsYQMAASNNBKkaW63mw2Px+ye0rPXuDFXZm3bsW3dwmcXDk1LSzOFEJyRkdFqmiyoM7rBOqSvXLly3pAhlzweH5/g8nq9UkpJHUNFNx1KKSWEYIfDoZVXlLv37dv3x9EjRz8DwGyttVsP1o0CDV64aGHPaZOnLenbp+8kpRTcbrcUQmjnqYwB+J0FAOB2u2V0eKRr1IhRf9rz/e7J/8h+dw4R7WBmnYjMs92nRW1o6Q0yMjIEMwsiku+///6sX/7irm/69uk7yTAM0zAMFkJowWhoR4AQmub1SfZ4PGbfi/uNvX/ub/NWr145i4hMZhahVOUtUt2WgBUArFqz6pXx48bPtdvtcLvdkgRp1CY8rG0JZL0YSkrpcjo1k01s2rzx1dEjx94L+IM5oQiYNHsE5ebm6kSkrr7p6oTtO7atuibtmrkAlNvtZiHEBSGfEoyAASo0obkNDysTatSIMXP3/rB31f3335+Qnp4uc3Nzg7akBtAsaQTW40WLFva85daff9wjuedgj8djAtDbm8PjXMPy85tOp1MvLine8frS129/7LHHtgTbSGvyyAkYDgv/vHDC9Ftvy05J7h7lcXtMEhT0UdgWcHKoM9gD2bqf7na7zYT4hMGzZs/6slevXjcR0apgGmlNUt2WujZfXfrqxNm3z/o4Jbl7lNtdLzuakJlZMbNJRFIIAZvNBpvNFohdK2Y2VcOAeRAghNDd9W6ZkpzivO666z7+5JNPJlpGWlD6ttHD0/LmmB/mfDhh3KixObGxcY56d73ShNZh9k1SShZCY6fTYT0To66uDnV1dWAAnTp1Qpgr7DhZwWt4lVQSwfIPEAhSSuV0OkV1bbWxa8+uyWNHjg3KzG7UaLHWC3PpG69OvGLMFR/FdIlxuN3uDiVkZpZhYWEaADpadHR/VVXVZ7u+27Wud9/eW3NX5MLr9SLt2jTUVdQld44Iuzk2Jm5SSvfuF9mFHYbHkAxoLdXq7DfShGEYKiI8wjF4wKCPP/n0kylEtLKla/ZZBR1Q108+uWDijddP+Tgg5I7i5WJmaJpm2mw2/eChAwVlpSUPjxgx+l8APD+5+BEAwE4AKwC4Plu9fPKQQUP/IyEhYZTX8LI1u1u8iJMg4fF4VOdO4c6RI0Z+/Oabf5tMRKsCWrWl9/8JLIoMXnjhheQDB/ZXMzPX1dVJj8fDHeHldrvZ6/WazMybN298o0ePHlFWV4OZ9dzcXD3gyAg4hrKysjRLlR6Xy5q81Ys8hodNnynr6+tVsNpXV1cvmZkLCg67n3nmmcGAf5/dHFmedvRZVB+kp9+Y8Myzr6zs0b3H4IA7szk/1NbAzBBCKBDE1i1bHxw5cuTzRIQ1a9Y0NrJ0Atft088+vXPsmLFvuJwu6fOZQoiWm+cEgpJKOsOcWklZ6c5nnn55wjPPZBYDQFOJDKdrDG3cuFEfPny4b/OWTblDL708tWMImcHEEEoDAGl32rXlKz557YbrJs9tILSmhtPImuG+9V+t/9WY4WOWmj5TMjhofaWUki6XS9u8dfOWYZcNG+Hf8pEkanzo75SCDiz8//4059Xrr73x14bh9QF8apJ0uwIDBCgJ6XI5ta1bt6y77LKhVzKzDYDZEroPM9uIyPfFl+v/OXb0uHSPxyOJKJgTw+dwOGwb/mf9a+PGjJ/bVEv8JwZVQMjvZr1729VpE37t9Xols+oAQvaDFWCz6VRdXeXNyfnkISJCdnZ2MFibkpnFW39fOv9o0dFam80mlFJBC7Yzs83n9Zkjh4/69erVK2+z9tiNHkgnzOiA+srMnN9tzpzf7UhKSgp317tJaC23JNsKAmpwz57vlvTvP/DXwXQ1BmbZth1bHr1k0KV/8ng8JlHwnElKKXY4HFxVVVXz17++NGb+/Md3A6BTZLL8BA1nNFlfEtNn/OKtpKSkSI/bw1pDJnsHgK7r8Jk+bP9uZ3YIwoKKmWnL5m+yq2urfbqua2fKFmkqhBBkGAZHR0dHTpk6/U0iCiQOnFVGxx80EFP+YNkHD18y6JI0wzBMEqRxB6L6KKXYZrNpxcXFhUtfXfptZmZmIJwUFARm1qxZd+cXFRd+r+s6MXOwXaWaYRjmgP4DR6zbsO5hIpKBbfAZvwcc53nJF154IfmKcWP/oJSSSql2bmGfEgoAGLz5s88+OwZ/YkCwR7IA4D1yuOCQ9f+gzxSllKaUMgcPHPRfzz///BAr2+WMwhYAkJmZScwsUq9OXRIXk9DZMIygeHjaKgoKCkL5bAQAXbt13Qw0fb/bGFgqXERFRjtT01KXBnweZ/yO5eKU77+fNXVg/4E3eL3eDrBfPjNKiopC/hv9Lh5wOJT3F0IIwzDkkEuGjMxbl3cLEakzWeEiNTWVhw0bFjZ6zLgFuq4rKWWHnckBdImNDfkz5ufnx4X6N5RiIiLVu2fvRRMmzIgE/Mmhp7pWEJF8cuGT93ZN6nqJYRgdJlhxJvTq0TOUjEsGgB9++GEU8KMrORQQgoRhGCo5Obn7008/MscyBk8pP33ixImdBg0Y+FsAXmYGiE1/AiO01s5gtLYiEn5XZMP3ggKrI5iEGJCUlBQGwI0AWy94YAB6cnJyt8DPBvHeP4FSSpNScvce3X+/YsWKlwHUW6nFJzyT/sc//nFhcnJKdwBwOp0/tpYZHo+n1Wa4Uop1TYfNbgu5fdCta7c+L7zwl3FEtDKYrEtri8pPPPFEv9jY2EullMra64YMQgjyeb0yNiY2QbPrfyKiB6y1+oRn0nft3lVXXV292PSZUKyEzaGhZ8+LuoR3Dp+WlJjk9LjdikIsbKWYXS4X1dbV4EjRkVXl5eXfFR0t+smobCmImHw+Kftc3KdrWET4NGZelZeXF8wZRwDUhEkTboiOjtYsf3cQb39qMCCUVNzv4r6/euSR+54AcOxUs/qUyMjI6P/t1s3bmZnr6+tDFoOuq69XUkp14MCB+peXvHxzyHvFwh8W/GH69J9PH8XMFAwPGTMTM9Odd94Zd/DQgWoppQpmbLoRLx8zqw1fb5hntecEzahbb5w87IiIdv/739kTl+WsXJkU33Wg2+1RQgRfDdl0nd0eN3+25rPp9825b3mwyHBnAe/duzdn1+4d/0VEX+Xm5moLFixoaVqnTkS+L7/ZkNGje89wj8fTqttUKZXGzBQXF/sfV8246lUhRC0aY39kZWXZAeDtf76d7jN9bBiGGexRWF/vZ1Bs2frtFsAfFECIjZeAFXzP7++Jra6uqsr9PPf/tvS3rTAnPl356c88hoe9Xq/P7XafC9aMlEry6tWfpVvtOj7QTjtD09PTvcxM/3z7nzklJSVH7XabFsywGwA/wwNAUXHxvxpsQ0LqXM/Ly9OICLOnz54YHh4RMWL4iP9874P3fmOF/cjKkmiUwC1akSAi3+rPV08aM2rsG7qmK9M0NXEOMlVYMQsS3LVrypyTPzubKqacnJz6wuLCb/zEFijy145peaP8pDytqqZKHvjhwIeW4RDySgCpqamKmUV0l8hfAmCn3emdOmXqizt3bs8kIhXIXWZm3RIkNXxlZWVpAS5Zenq6JCK1YsWKx0cNH5XTKSwszOv1khCCQrd7PgMImpQmd01OuuLPz/95SMOAxxnXw7y8PAGAKyqqswFM8S/RwZlwzKx0XRclxcU/zJ07dxsRHY/+hAoZGRmCiFRGxiN94+Lir5JSwuv12nRdlwMHDs4oOFJw/ZdfrX92xrSff0hEvtPc5vi2ZcWKFeOSU7o+N3DA4JGmacLr9fK5jBEQEXw+U0V0jrRfNWb8NADb4J+V6oyNCpjoTz75ZMLd9/zqh5gusZ28Xi8Hw5HCzKbT6dTXrl+79KrxV93TGgnhAWLAl199+fvRI0f/xTAME36DFMysXC6X8PoM/LB//56qioqP9u3bv2rAgAGbtx/ebqIS6N27t23rjq2Xp6WlDY6MiJwSGRkxPrxTBHk8HgW/AXvO3cdKKeVyucT+gz9s7d2rz1BmBhGd2cK1KuoJIiqbMvXG7XGx8aOZWUGQ1tIdrqZp5PV6UVpcmgUA2chu2Q0bBwlAj4uNmQkASrIQmgARQETC7XYrTdMwoN+AfgDmXTb08nlSyuoePXsqMMPpdIphw4dFhLnCAAA+nw9th+PuH2NEJHw+H8d2iRvy1n+/NYSItjKzaMxWRgAwPYYnC8BoIciq8dZ8SSvJ7HDYtJKS4kN///vfN1iGWEjVdlZWlkZE8sUXF42Ij0+43OfzsaATBaQJTbAC3G5DEZHSdZ1sNvtxwVr1RaVhGIHgQZuqqERMABGklDIiIkK/KLnndABbN23a1KiUGgUAmzduXVVZVQlN6HpLRSJISABcVFL0VU5OTj1CQwA4AValYIwcPXZaeOcIlsqUECdunRkMEEMICCLWTSk1n9fLhmGwxzDY5/OxaZoa/HvmVo8FnBkM/tHEIQCIT4xPBYBhw4bJswqaiJQQAnPmzNlTWlqyV7fpUGhuJqHVqQLEYDpaUJgDAEF2Q54OEoCe1DVxKgBiPvvWIUCiI/KXMbQQ8oYGAUIpxdFRXS6///77uxORapTakVLqALwew/0hABA1f04rlmyz6Vp5eXnVzvydywEgNTU1pEaYpbY5+1/ZVyXEJfT2+XyKENpgw7kEEZFpmiqmS2ynsVeMHQs0ckOcnZ3NALB7z/crvT4DLWSGKiEESopLtj8056GyRjvfW4AZM2YAAHp07/5Lu80hTNNURAQ6Xn2540H5WQnonpwyAmjkqJ4xY4YCgMWLFm8sKi4qtdlsGqvmBIoJgjQGgMrKY8ssgybU/mASJOS9997buVvX5AlWfFsDAKaOVrXwBBAAJCYmXQqgcQEEa5ulEVGFYXiWA7idwYrQtJQTZoau61ptXY23sDB/mXXfkFrbARrzzdNvviExPjHO6/U22A51WCEfz4Tt1KlT3ylTpoQ3ep0KGEy793yfB6BZIWrLG0ZHjx49dOutMw9Zars1CqBSbHTsHCEEB9tf31ZBRCSlhNBE8q233XpRo6UVMJi+WPvF6uKSYo/NZmtyFkKAylPvrlsGwIsQq23L5SkzMh7u1r1H91FKKiAE9U/bIsjaT0dHRyPC2Xlkox864CV7+umn8+vq69ZaM7oJ1jKDSGiG10OFR44sA3408kKFzMxMAQATJt00NaZLTCfTNGVH5qufDKUUNKFRzz4X9Wjq6BbMTPv271sPAITGW8tKMTscdiosLCx77v+9vZ2IkJ6eHmq1LQFQROfwewDAZN95MZsDCIR+j5WWX9nUB1dExHu/2/VxTU2Nqdt00Vj1HQhYeAxj+ars7Cor5SdkM9pS2/yXxX8ZkpKScolpmizQcYrrNAYB506//n3Pnpx10hcVM4vf/ObB7ceOHdulaZporNUsSBAzo7ikOAcAhdobFlDb40ePvzk6uguZptkqRL02Bcv7V1lZNbw5I1wAkIcPH96Ak86qOu3vMbNu00VpWWl91rtZXwHgUHvD4PfR2xO7JUzzN+L8MMJOAAFSSTidzrAmP3zAgCosLPzA8BqkCV3gDHQKYgKYlBCCampq1r/yyiuHrD15yNS25fJUS5YsuTK2S9wQ05Qy1PzqtggigpIKEeGRTVPdABAgu3/yySfrysrLjtpsulBnWaiFP0yEktKSTwNtaHKrm4CAy3PEiBG3upwumKaPO6in86xQSqFzp87NG+XMLN58803P0aNHv/F34OmjWQoMzSa0yqoKrNuw7nMAyERmSK1tIYScMWOGKzEp8QaLPdKhs0PPBiJq3rplccmoqroqG/7jbk5pPjMxmJXSdI1qa2s3z//9/M3MTAsodMcBWcQ9TJ429Zb4+PgUn893Xu2dT4dmCdoypHjNyjWrSktL6212m8YsTyFrPh7SLCwq+tx6M6SzKzU1lQFg0IAB6ZrQWMp2dfpvyNCsrIiGXLL/c9vPtsfFxY0mFgp0ohBJadB0QYbXwJ69ez4FQusNs3zn8tFHH41L7to1VSkVHG5yB0BL0l8EALPe4+eSncqKVqzYodu1spKyQ8+/8/z6UHPD8vLyNADmlFumXJsQlxBpGB2/ekNj0ZLRrgDgm83frKqsrICmafrJxjeRP9e5sKj4q005m0LODQvszcPCwuYCBD4/AlWNQrMFHeCS/XbOb/eUWFyyk71kfuoI09GjBSHnhgVcnn969k99uyZ1HSlNCYSe1NAuwI0hyJ0JAS5Znaf+QwAnZFowM9tsNq2svKxq987dIeeGBVye1064dnJsl1jdJ30mXTC2IYRAbV1t0x0mDREwrPbt3m1xyfTjepnZzw0rLi7a/tBDrcINkwDsYY6wuwFA8dkZrh0dzAyhCVTXVLXMLThjxgxFICxe/MrGosKiUpuua2wxOIQgixtWFXJuWIDl+drrrw1LTknuZ5qmOpmcf16CAU1o8Hg89S1KOm/IJXMbnuUg3A5/PUxN13WtprbGm38wfxmNCy03LEDOHzF0+PTOnTqT4TEkXRA04PdhiKioyI0t7ozjXLJdu/PAfi5ZgBt25OjRQzNnhp4bJoQwZ8yYoSUmJU6xjqO+IGT8WNFpz+7vWx7RCRhYX365ZnVRSZHHbrNrBH/KTX19Tci5YcysMTNuvvnmG+Ji4y/2+rwKzXTtdjQEbKIucTFrW9whP3LJFufX19WtJUEQRGQYBhUXFrYKNwwABg0e9DObzQallDpfI1UnQwgBqSQf3Lf/ULBGvsUl27seAOxOuygsOlr23HOLQ8oNC7g875o3LzwxMXHShUjVjwhUlKioqEC1p/brYAlaERHv2rH748qqSh8AUVdfv3zVqlUh5YZZLk+6eXzqrfFx8XE+f8HaC/MZfj+GpmlQUhW894/39gfn3EOLS0ZE26dPn749KjJqaMGRgmUIMTcsNTVVAeDuvVJmEhGkUmhD6crnFJbxq9XV1X3/0Ucf1QSzVwQAWVxYvLGqqpL+9vbf/gch5IYFLPkXX3yxa7ekxLFSSlBwT6Vp72AAKCoq3IrGJtk1BgGDq6au5rP9B/Z/lf1W9pEQc8M0IkL/gf1nxsbEuXw+3/nH8jwDhPCzbvMLDn+DxibZNQYBLtm2bdvW21y2GuvtUFrbipn1hPj4WcDxGR7Cn2s/sOIMovxYWd2G9Rs2AO00OdiyB9TiVxdfescv7tgY5goTPp9PXBC0H8wsnU6ntveHPev69ul/JTOHxHKhBlUAQwUBAFeOu3JqeOdw3efzqgsyDiT2A7A0aUlRSR4ANLZYTVPRnPMdmwrZo0cPZ2RExEzgx1zg8x1+MqZ//1xdXc37Cw6+D/iL1bRGJd2gIkDOf/Odv12RlNi1r8/rU6IDHVjefPjnFjMrm80mDh/J3zrr57O2BXYn7a6DrEgVXzbk8ukOh4OVZAXQmZJFzisEgkdlJaUfwi99DWhnDElr7ZeTJk3qEhcTP4WZSV1weR4HM8Nm00V1bZX38y/XfWC93f6y/wMlmO/45R03JCQkdvX5fFJoIICbkKndgcGQmqbT0YLC9Q//7uFtlh+j/Qk64PK8ZNAl04UQF8j5J4EEkWJFR48eXnLyZ+1G0AGjYt68eV0T4uOvVkrR+ZgheTpIqdhut4v9h34ofuK1J/99clns9tRRGhFhzLgxM+Pi4iNMn8+84Ar7EZomJBFxaWnZXz7P/rz25KhhexK0YmbRt9/FtwD+4/rOdYPaCpRSbNNtWsGRAvdHH7zzxqkyYtqFoAOV81966aWLunXtNsw0JeNCpOo4CFBCE7Rn7/evP/XUy+U4RUZMuxB0ZmYmAcDlwy9Pj4qItvvrkZzrVrUNKKXYZreLsvKyYuk1/3C6/LZ2IWhN0yQAPSoy6i4AYG5/jp5QQQghNU2j/EP5z1177bV1OE1+W5vvsKysLE0phTfffHNESvcevb1ek8UFaxuA//wMh8MhDhcczn9q/lNLLJ//Kfl5bb7DAuT8ocOGTuscFgalTIkLehsAIITGzCz2H9z/YPaq7CoE8hpPdW0rt61JsA7vkBMnDukUE9PlFvbvFtp0m1sL/tls17Zt3/Z16vjUfwWqGJ/u+rYdvWIIIlLv/Pc7E+Pj4nubXlNe4IX5DTCHw6Eqqyq8ebl5d1uz+Ixqrj3MDh4yaMitumZjqfx1Uug8Dz8LIaQQQt+xa+cTv/vd77YppTQ6S8pTW+4xIiI595FHohMSEyYxMzFYa+lRTO0dSinpcDj073bv+mb82PF/bhi4OBParKBzc3M1EDBx9MifxcbGxXm9XilIkP98nfNT0JbKpoqKiqqPlr0/28pQbdR5EW3WfA0cYbhr166VAwYMuMY6Me68XZ+ZGZrQTBLQ1679fOY110z8R1OOeWyTMzpQOf/ZZ59NSfiRnN8m29paICKfzW7Tv9741WuWkPXGChloozM6cFhozqc5GTdee2OmYXjNYHLQ2xuUUtLlcmmbt27eMuyyYSP8ec8kiRpvrLTVWSIBUO+L+liRKrOttjOkIBBYsnS5XFpJWenOd///R9czswTQJCEDbVDQ1sYfb731tyFJCYlDfD4fn69q25RSOcOc2pEjBZ63/v7mz599dkFRdnZ2s2q1tUV1KACYlw0fdXNkRCR5PB6TqFGn4nYo+M+BdoqyY2XG6tWf3TRv3rwdubm5elpamtmc+7WJDmRmyszMpNTUVAE/OT8qJjr6HqXArFijFp2Q2P7AipXT6RS1dTWer7/5esrs2b9cZVnYzRIy0EaNsS1bNr9x6aVD7/QYXimYtfOFS0IgSCmV0+kU1bXVxq49uyaPHTl2VcA4bcm9m732ZWVl2YOVY5WQkNDpF79IH7z+f9aP371n94pLLx16p9frlWB13ggZAKSU0hXmEhWVFZ4v1n9xU7CEDDRDdWdkZIgnnnhCfbvz24uGDrvsdWZO8Hjc9QA1+V4MJgJxXV1teE1tbUpSUhIcdgc8Hg+T/yDupt6y3UIpZbrCXPrhgsOedWtzb5o5c3bQhAw0U3UHyj1mZb09cPSYqz5OSU65iJnREsEwM3xeHytW6nyKUFm1wEyn06kXlxTveH3p67c/9thjW5ri9WoMml2YPSMjQ6Sn377rsiuuGP32a6++M3jQ4Iler9dsnheLwX4KDBGdPxV5lVKsCZ3tDpu+b/++1S++8OLMxYsXF+fm5gZtJgfQIt0YSEgHgFVrVr0yftz4uXa7HW63W5IgjRp9+5O3hR1VZZP1Yigppcvp1Ew2sWnzxldHjxx7L+CnTgWqRwQTLXJEEJHKyMgQzCwmXD3h3pycnNmlZSVlLpdLI5DZ+CN86aRXxwUrxczKdIW5tGNVx8rXfv757NEjx97LzMKvJYMvZCCIvRpYUxYuWthz2uRpS/r26TtJKQXDMC4cd2BBKSUdNpsmdB3f792z4R/Z785Z8J8LdgTT6Dodgjp9GhgQ+sqVK+cNGXLJ4/HxCS6v1yullCTO0yJgSiklhGCHw6GVV5S79+3b98fRI0c/A8AMttF1OgS14/2HcmcIIYQ5ceLEhc89t2jc3r17P9J0TXO5XAKAqeT5c9CFUorBbLpcLmF32LXtO7d/sfSNpeNGjxy9UAhhBsKxrdGWUC2IlJubqwX8sjnLc2b0u7jf03169+kFAG63R/rPRdOpkQSJdgSGZMUEKJczTAOA/MMHD+QXHJo/fmzqewDY8llLtOKDh9TyycjIEJmZmYH0zeh1X6y75+KL+/4mIS4+GQC8HsOUrETHUOkElopJI+lwOHQAOFZxrODgoYMv3TLrlr/mb8+vEELg8ccfFwsWhO4kv9O3rhXQcB2a/cDsqHlz5s1JiIu/LzY2LgUADMOQSim0R2+YVVFYCqHB4bBrAFBZVXm4vKz85bc/fnvJggcXVFrXtcpafDq0Zq+eoM5vu+226Lt+dcc9ffv0v7Nbt279hBCQUsI0TVMpJYiozRaIs4SriEjZdJuu6f5NxYGDBwoKiwpfei/rvaWLFi06BvjPykxNTZWtUJLrjGj1nmRmysvL0xrEVfXly5ffkpySfHdMTMzEpMQkAIDP9EGa0gSYmCFavzxzQ7kQlAITsSIiFpqm23S/U7GkpBgVFRUrS0uLl06ePHVlVVVVJdB2BBzAOZsyVuRLCCFk4OyHx554bOj1E6+fnBAfNzUqKnpYTJdY/7UAfF6vVEqx5Wcn+F2mIWobALCy/mIhNLLb7Fqgt45VHEN1VdWm8opjy/LWrMx56KFHv23wXBqs+uUhaVwz0RZ0I1lZgNyQiL7w2YXDUsenXhUVGXV9RETEqMSExPCGNpsyJUxpMjMUK0Ug8kfDLOmfbRBYwoQ1cpiZIUgwCELX7aQ1IDswM0pLS6orKiu/PXjo4Lo9+/Z8+MC9D2xq8LmAvy/bnIADaAuCPo6MjAyRmpoqrrnmGlM1OHv8vvvui5k2bdqwTp06XRke3nlsTGyXnoK07pFRkZrd5jjhHkqp468zHVSvaRqEED8p5O6TXlRWVktWKr+iovxgbU3thjqPe+3ynOWbnnrqqfLAdUIIrJar9bzMPHUurOimok0JuiGysrI0K2VWnSLlpPOSN5b06pbUrf/gQQN77D9wMK1nSvdwZrrIlGa38M6dOTw8gmw22ynvbZomqmuqubamljRdHBFC7M8/fKimV69euTt3fXeosKRw910P3nUApaht+D1r5ors7GwOlU86VPhf3S2FtgcRK90AAAAASUVORK5CYII="
              alt="Vant"
            />
            Vant
          </div>
          <ul className="footer-links">
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#proceso">Proceso</a></li>
            <li><a href="#casos">Casos</a></li>
            <li><a href="mailto:hola@vantmx.com.mx">Contacto</a></li>
          </ul>
          <div className="footer-copy">
            © 2026 VANT — TECNOLOGÍA HECHA A TU MEDIDA
          </div>
        </div>
      </footer>
    </>
  );
}
