// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { ClientReviewsSection } from '@/components/home/ClientReviewsSection';
import { ExperienceTimelineSection } from '@/components/home/ExperienceTimelineSection';
import { CertificationsSection } from '@/components/home/CertificationsSection';
import { Hero3DOrbit } from '@/components/canvas/Hero3DOrbit';
import { ThreeBackgroundCanvas } from '@/components/canvas/ThreeBackgroundCanvas';
import { ParticleMeshCanvas } from '@/components/canvas/ParticleMeshCanvas';
import { CyberneticGridCanvas } from '@/components/canvas/CyberneticGridCanvas';
import { TiltCard } from '@/components/ui/TiltCard';
import { ScrollRevealSection } from '@/components/animation/ScrollRevealSection';
import { submitContactInquiry } from '@/lib/data-store';
import { useProjects, usePricing } from '@/lib/hooks';

export default function PortfolioHomePage() {
  const { projects } = useProjects();
  const { packages } = usePricing();
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqCompany, setInqCompany] = useState('');
  const [inqFocus, setInqFocus] = useState('power-bi');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSending, setInqSending] = useState(false);
  const [inqSent, setInqSent] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName.trim() || !inqEmail.trim() || !inqMessage.trim()) return;
    setInqSending(true);
    try {
      await submitContactInquiry({
        name: inqName,
        email: inqEmail,
        company: inqCompany,
        focus: inqFocus,
        message: inqMessage
      });
      setInqSent(true);
      setInqName('');
      setInqEmail('');
      setInqCompany('');
      setInqMessage('');
    } catch (err) {
      console.error('Contact inquiry error:', err);
    } finally {
      setInqSending(false);
    }
  };

  useEffect(() => {
    let isWindowScrolling = false;
    let scrollDebounceTimer: ReturnType<typeof setTimeout> | null = null;
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'scroll',
        () => {
          isWindowScrolling = true;
          if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
          scrollDebounceTimer = setTimeout(() => {
            isWindowScrolling = false;
          }, 90);
        },
        { passive: true }
      );
    }
    try {
(() => { const tabMilestone = document.getElementById('pricing-tab-milestone'); const tabRetainer = document.getElementById('pricing-tab-retainer'); if (!tabMilestone || !tabRetainer) return; tabMilestone.addEventListener('click', () => { tabMilestone.className = 'px-5 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-[0_0_16px_rgba(160,120,255,0.4)] transition-all duration-300 font-semibold'; tabRetainer.className = 'px-5 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all duration-300 font-medium'; document.querySelectorAll('.price-display').forEach(el => { const val = el.getAttribute('data-milestone'); if (val) el.textContent = val; }); const labels = document.querySelectorAll('.frequency-label'); if (labels[0]) labels[0].textContent = '/ project milestone'; if (labels[1]) labels[1].textContent = '/ system deployment'; if (labels[2]) labels[2].textContent = '/ month retainer'; }); tabRetainer.addEventListener('click', () => { tabRetainer.className = 'px-5 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-[0_0_16px_rgba(160,120,255,0.4)] transition-all duration-300 font-semibold'; tabMilestone.className = 'px-5 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all duration-300 font-medium'; document.querySelectorAll('.price-display').forEach(el => { const val = el.getAttribute('data-retainer'); if (val) el.textContent = val; }); const labels = document.querySelectorAll('.frequency-label'); if (labels[0]) labels[0].textContent = '/ month (4 sprints)'; if (labels[1]) labels[1].textContent = '/ month SLA dedicated'; if (labels[2]) labels[2].textContent = '/ month retainer'; }); })();
} catch(err) { console.warn('Script error:', err); }

try {
document.getElementById('project-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    if (status) {
      status.classList.remove('hidden');
      this.reset();
    }
  });
} catch(err) { console.warn('Script error:', err); }

try {
(() => {
  function attachViewportLoop(canvas: HTMLElement, renderFn: () => void) {
    let animId: number | null = null;
    let isVisible = false;
    let lastTime = 0;
    const minInterval = 1000 / 32; // 32 FPS throttle for background card canvas

    const loop = (timestamp: number) => {
      if (!isVisible) return;
      animId = requestAnimationFrame(loop);
      if (isWindowScrolling) return; // Zero CPU canvas drawing during rapid scroll
      if (timestamp - lastTime < minInterval) return;
      lastTime = timestamp;
      renderFn();
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animId) {
            animId = requestAnimationFrame(loop);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      }, { threshold: 0.05 });
      observer.observe(canvas);
    } else {
      isVisible = true;
      animId = requestAnimationFrame(loop);
    }
  }

  function initProjectCanvases() {
    // 1. Safir Hotels: Holographic Radar Cylinder
    const c1 = document.getElementById('project-3d-safir') as HTMLCanvasElement | null;
    if (c1) {
      const ctx = c1.getContext('2d');
      if (ctx) {
        let w = c1.width = c1.clientWidth || 300;
        let h = c1.height = c1.clientHeight || 144;
        let rot = 0;
        const drawRadar = () => {
          ctx.clearRect(0, 0, w, h);
          const cx = w / 2, cy = h / 2;
          rot += 0.02;
          for (let r = 20; r <= 55; r += 16) {
            ctx.beginPath();
            ctx.ellipse(cx, cy, r, r * 0.45, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(208, 188, 255, 0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(rot) * 55, cy + Math.sin(rot) * 25);
          ctx.strokeStyle = 'rgba(123, 208, 255, 0.85)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
          // Radar blips with zero-shadowBlur dual circle
          for (let i = 0; i < 6; i++) {
            const a = rot * 0.7 + i * 1.1;
            const rad = 25 + (i * 5);
            const bx = cx + Math.cos(a) * rad;
            const by = cy + Math.sin(a) * (rad * 0.45);
            // Outer halo
            ctx.beginPath();
            ctx.arc(bx, by, 5, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? 'rgba(123, 208, 255, 0.25)' : 'rgba(208, 188, 255, 0.25)';
            ctx.fill();
            // Core
            ctx.beginPath();
            ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? '#7bd0ff' : '#d0bcff';
            ctx.fill();
          }
        };
        attachViewportLoop(c1, drawRadar);
      }
    }

    // 2. Sotex Factory: Topology Mesh
    const c2 = document.getElementById('project-3d-sotex') as HTMLCanvasElement | null;
    if (c2) {
      const ctx = c2.getContext('2d');
      if (ctx) {
        let w = c2.width = c2.clientWidth || 300;
        let h = c2.height = c2.clientHeight || 144;
        let t = 0;
        const drawMesh = () => {
          ctx.clearRect(0, 0, w, h);
          t += 0.025;
          const cols = 9, rows = 5;
          const dx = w / (cols + 1);
          const dy = h / (rows + 1);
          const pts: { x: number; y: number }[][] = [];
          for (let r = 0; r < rows; r++) {
            pts[r] = [];
            for (let c = 0; c < cols; c++) {
              const z = Math.sin(t + c * 0.6 + r * 0.8) * 12;
              pts[r][c] = { x: (c + 1) * dx, y: (r + 1) * dy + z };
            }
          }
          ctx.strokeStyle = 'rgba(123, 208, 255, 0.35)';
          ctx.lineWidth = 1;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (c < cols - 1) {
                ctx.beginPath();
                ctx.moveTo(pts[r][c].x, pts[r][c].y);
                ctx.lineTo(pts[r][c+1].x, pts[r][c+1].y);
                ctx.stroke();
              }
              if (r < rows - 1) {
                ctx.beginPath();
                ctx.moveTo(pts[r][c].x, pts[r][c].y);
                ctx.lineTo(pts[r+1][c].x, pts[r+1][c].y);
                ctx.stroke();
              }
              ctx.beginPath();
              ctx.arc(pts[r][c].x, pts[r][c].y, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = '#7bd0ff';
              ctx.fill();
            }
          }
        };
        attachViewportLoop(c2, drawMesh);
      }
    }

    // 3. Sales Prediction: Hypercube Manifold
    const c3 = document.getElementById('project-3d-sales') as HTMLCanvasElement | null;
    if (c3) {
      const ctx = c3.getContext('2d');
      if (ctx) {
        let w = c3.width = c3.clientWidth || 300;
        let h = c3.height = c3.clientHeight || 144;
        let ang = 0;
        const nodes = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        const edges = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7]
        ];
        const drawCube = () => {
          ctx.clearRect(0, 0, w, h);
          ang += 0.02;
          const cx = w / 2, cy = h / 2, size = 38;
          const cosA = Math.cos(ang), sinA = Math.sin(ang);
          const cosB = Math.cos(ang * 0.7), sinB = Math.sin(ang * 0.7);
          const proj = nodes.map(([x, y, z]) => {
            let x1 = x * cosA - z * sinA;
            let z1 = z * cosA + x * sinA;
            let y1 = y * cosB - z1 * sinB;
            let scale = 180 / (180 + (z1 * sinB + y * cosB) * 15);
            return { x: cx + x1 * size * scale, y: cy + y1 * size * scale };
          });
          ctx.strokeStyle = 'rgba(255, 182, 144, 0.45)';
          ctx.lineWidth = 1.2;
          edges.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(proj[i].x, proj[i].y);
            ctx.lineTo(proj[j].x, proj[j].y);
            ctx.stroke();
          });
          proj.forEach(p => {
            // Halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 182, 144, 0.25)';
            ctx.fill();
            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffb690';
            ctx.fill();
          });
        };
        attachViewportLoop(c3, drawCube);
      }
    }

    // 4. Cancer Diagnostic: Hyperplane Classification
    const c4 = document.getElementById('project-3d-cancer') as HTMLCanvasElement | null;
    if (c4) {
      const ctx = c4.getContext('2d');
      if (ctx) {
        let w = c4.width = c4.clientWidth || 300;
        let h = c4.height = c4.clientHeight || 144;
        let pTime = 0;
        const drawPlane = () => {
          ctx.clearRect(0, 0, w, h);
          pTime += 0.02;
          const cx = w / 2, cy = h / 2;
          // Decision boundary plane
          const tilt = Math.sin(pTime) * 12;
          ctx.beginPath();
          ctx.moveTo(cx - 90, cy + 25 + tilt);
          ctx.lineTo(cx + 90, cy - 25 - tilt);
          ctx.strokeStyle = 'rgba(208, 188, 255, 0.9)';
          ctx.lineWidth = 2;
          ctx.stroke();
          // Support vector margins
          ctx.beginPath();
          ctx.setLineDash([4, 4]);
          ctx.moveTo(cx - 90, cy + 10 + tilt);
          ctx.lineTo(cx + 90, cy - 40 - tilt);
          ctx.moveTo(cx - 90, cy + 40 + tilt);
          ctx.lineTo(cx + 90, cy - 10 - tilt);
          ctx.strokeStyle = 'rgba(208, 188, 255, 0.3)';
          ctx.stroke();
          ctx.setLineDash([]);
          // Class points (positive and negative)
          for (let i = -4; i <= 4; i++) {
            const xPos = cx + i * 18;
            const yTop = cy - 35 - tilt + Math.sin(pTime + i) * 6;
            const yBottom = cy + 35 + tilt + Math.cos(pTime + i) * 6;
            ctx.beginPath();
            ctx.arc(xPos, yTop, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#7bd0ff';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(xPos, yBottom, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#d0bcff';
            ctx.fill();
          }
        };
        attachViewportLoop(c4, drawPlane);
      }
    }
  }
  if (document.readyState === 'loading') {
    initProjectCanvases();
  } else {
    initProjectCanvases();
  }
})();
} catch(err) { console.warn('Script error:', err); }

try {
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function animateValue(el, start, end, prefix, suffix, duration = 650) {
    let startTime = null;
    const isFloat = end.toString().includes('.');
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + (isFloat ? end.toFixed(1) : end) + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  function setupHoverCards() {
    // 1. Tech cards proficiency bars & numbers
    document.querySelectorAll('.tech-card').forEach(card => {
      const percentEl = card.querySelector('.font-semibold');
      const bar = card.querySelector('.rounded-full.bg-gradient-to-r');
      if (!percentEl) return;
      const rawText = percentEl.textContent.trim();
      const numMatch = rawText.match(/(\d+)/);
      if (!numMatch) return;
      const targetNum = parseInt(numMatch[1], 10);

      let isAnimating = false;
      card.addEventListener('mouseenter', () => {
        if (isAnimating) return;
        isAnimating = true;
        animateValue(percentEl, 0, targetNum, '', '%', 600);
        if (bar) {
          const originalWidth = bar.style.width || `${targetNum}%`;
          bar.style.transition = 'none';
          bar.style.width = '0%';
          requestAnimationFrame(() => {
            bar.style.transition = 'width 650ms cubic-bezier(0.16, 1, 0.3, 1)';
            bar.style.width = originalWidth;
          });
        }
        setTimeout(() => { isAnimating = false; }, 700);
      });
    });

    // 2. Metric numbers inside hero cards, experience cards, and project cards
    const metricElements = document.querySelectorAll(
      '#experience .font-headline-sm.font-bold, #experience .font-headline-sm:not(.text-headline-sm), #projects .font-headline-sm.font-bold, #projects .font-label-sm.font-bold'
    );

    metricElements.forEach(el => {
      const raw = el.textContent.trim();
      const match = raw.match(/^([^0-9\.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
      if (!match) return;
      const prefix = match[1];
      const targetVal = parseFloat(match[2]);
      const suffix = match[3];

      const parentCard = el.closest('.group, .rounded-2xl, .rounded-lg, .rounded-xl') || el;
      let isAnimating = false;

      parentCard.addEventListener('mouseenter', () => {
        if (isAnimating) return;
        isAnimating = true;
        animateValue(el, 0, targetVal, prefix, suffix, 650);
        setTimeout(() => { isAnimating = false; }, 700);
      });
    });
  }

  setupHoverCards();
})();
} catch(err) { console.warn('Script error:', err); }

try {
(() => {
  const glow = document.getElementById('mouse-ambient-glow');
  if (glow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight * 0.25;
    let currentGlowX = mouseX;
    let currentGlowY = mouseY;
    let glowAnimId: number | null = null;

    const updateGlow = () => {
      if (typeof isWindowScrolling !== 'undefined' && isWindowScrolling) {
        glowAnimId = null;
        return;
      }
      currentGlowX += (mouseX - currentGlowX) * 0.08;
      currentGlowY += (mouseY - currentGlowY) * 0.08;
      glow.style.transform = `translate3d(${currentGlowX}px, ${currentGlowY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(mouseX - currentGlowX) > 1 || Math.abs(mouseY - currentGlowY) > 1) {
        glowAnimId = requestAnimationFrame(updateGlow);
      } else {
        glowAnimId = null;
      }
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
      if (!glowAnimId) {
        glowAnimId = requestAnimationFrame(updateGlow);
      }
    }, { passive: true });
  }
})();
} catch(err) { console.warn('Script error:', err); }

    try {
      const safirCanvas = document.getElementById('safir-telemetry-canvas') as HTMLCanvasElement | null;
      if (safirCanvas) {
        const ctx = safirCanvas.getContext('2d');
        if (ctx) {
          let width = (safirCanvas.width = safirCanvas.parentElement?.offsetWidth || 600);
          let height = (safirCanvas.height = 220);
          let step = 0;
          let animId: number | null = null;
          let isVisible = false;

          const renderSafir = () => {
            if (!isVisible) return;
            ctx.fillStyle = '#111319';
            ctx.fillRect(0, 0, width, height);
            step += 0.04;
            // Background glow wave
            ctx.beginPath();
            for (let x = 0; x < width; x += 4) {
              const y = height / 2 + Math.sin(x * 0.02 + step) * 35 + Math.cos(x * 0.01 - step * 0.5) * 20;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(123, 208, 255, 0.25)';
            ctx.lineWidth = 5;
            ctx.stroke();

            // Crisp front wave
            ctx.strokeStyle = '#7bd0ff';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            animId = requestAnimationFrame(renderSafir);
          };

          if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(([entry]) => {
              isVisible = entry.isIntersecting;
              if (isVisible) {
                if (!animId) animId = requestAnimationFrame(renderSafir);
              } else {
                if (animId) {
                  cancelAnimationFrame(animId);
                  animId = null;
                }
              }
            }, { threshold: 0.05 });
            observer.observe(safirCanvas);
          } else {
            isVisible = true;
            animId = requestAnimationFrame(renderSafir);
          }
        }
      }
    } catch(e) {}
    
  }, []);

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <SiteHeader />
      <main className="w-full pt-20 bg-transparent flex-1">
        <div className="flex flex-col w-full relative overflow-hidden bg-transparent text-on-surface">
{/*  Ambient Background Glows Layer (Hardware Accelerated Radial Gradients with 0px blur cost)  */}
<div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
  <div id="mouse-ambient-glow" className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 opacity-60 z-0 bg-[radial-gradient(circle_at_center,_rgba(160,120,255,0.18)_0%,_rgba(123,208,255,0.06)_45%,_transparent_70%)]" style={{"left":"50%","top":"20%"}}></div>
  <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[1000px] h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(160,120,255,0.15)_0%,_rgba(123,208,255,0.06)_45%,_transparent_70%)] opacity-75"></div>
  <div className="absolute top-[1800px] right-[-200px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,166,224,0.12)_0%,_transparent_70%)] opacity-60"></div>
  <div className="absolute top-[3600px] left-[-200px] w-[850px] h-[850px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(160,120,255,0.10)_0%,_transparent_70%)] opacity-50"></div>
  <div className="absolute top-[5200px] right-[10%] w-[900px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(236,106,6,0.08)_0%,_transparent_70%)] opacity-40"></div>
</div>
{/*  SECTION 1: HERO SECTION - EXECUTIVE 3D COMMAND CENTER  */}
<section className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 flex flex-col items-center text-center">
{/*  Main Headline  */}
<motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
  className="max-w-4xl mx-auto mb-2"
>
  <h1 className="font-display-xl text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
    Engineering Digital Solutions. <span className="bg-gradient-to-r from-primary via-secondary to-tertiary-fixed bg-clip-text text-transparent">Turning Data into Business Growth.</span>
  </h1>
  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto mt-1 leading-relaxed">
    Data Engineer &amp; Software Developer specializing in Business Development, Performance Marketing, Real-Time Distributed Systems, and Enterprise AI.
  </p>
</motion.div>
{/*  Hero CTAs  */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
  className="flex flex-wrap items-center justify-center gap-3 mb-5"
>
  <a className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary font-headline-sm text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(160,120,255,0.5)] hover:shadow-[0_0_35px_rgba(160,120,255,0.7)] hover:bg-primary transition-all duration-300 hover:scale-105 active:scale-95" href="#projects">
    <span className="material-symbols-outlined text-[18px]">analytics</span>
    <span>Explore Real Projects</span>
  </a>
  <a className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-high/80 text-on-surface hover:text-secondary font-headline-sm text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-surface-container-highest border border-outline-variant/40 transition-all duration-300 hover:scale-105 active:scale-95" href="#contact">
    <span className="material-symbols-outlined text-[18px]">handshake</span>
    <span>Let's Collaborate</span>
  </a>
  <a className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface border border-outline-variant/30 font-label-md text-xs transition-all duration-300 hover:scale-105 active:scale-95" href="https://www.linkedin.com/in/islam-samy-3b72061a9/" rel="noopener noreferrer" target="_blank">
    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
    <span>LinkedIn Profile</span>
  </a>
</motion.div>
{/*  Integrated Executive Portrait & Orbit Core  */}
<div className="relative w-full max-w-6xl mx-auto px-2">
  <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
    {/*  Left 3 Telemetry Metrics  */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-3 flex flex-col gap-3.5 text-left order-2 lg:order-1 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto"
    >
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container/95 border border-primary/20 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">01 • ACCURACY</span>
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#d0bcff]"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">95% Predictive Accuracy</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Supervised &amp; gradient boosting algorithms validated in production forecasting.</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container/95 border border-secondary/20 hover:border-secondary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">02 • AUTOMATION</span>
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#7bd0ff]"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">60% Cost Reduction</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Eliminated manual operational overhead through automated n8n workflows &amp; ETL.</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container/95 border border-tertiary/20 hover:border-tertiary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-semibold">03 • TELEMETRY</span>
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#ffb690]"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">Executive Dashboards</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Multi-source Power BI &amp; Tableau suites connecting MySQL, OPERA PMS &amp; APIs.</p>
        </div>
      </TiltCard>
    </motion.div>
    {/*  Central Orbit with Islam Samy's Verified Portrait  */}
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 my-2 lg:my-0"
    >
      {/*  3D Orbit & Portrait Concentric Anchor: mathematically dead-centered on portrait  */}
      <div className="relative flex items-center justify-center">
        {/* Dynamic Background Halo Glow (Hardware-accelerated radial gradient) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(160,120,255,0.22)_0%,_rgba(123,208,255,0.12)_40%,_transparent_70%)] pointer-events-none -z-10" />

        {/* 3D Interactive Gyroscopic Canvas - 100% Dead-Centered on Portrait */}
        <Hero3DOrbit
          size={500}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        />

        {/* Telemetry Vector Beams & Rings SVG - 100% Dead-Centered on Portrait */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[440px] pointer-events-none z-0">
          <svg className="w-full h-full" fill="none" viewBox="0 0 520 440">
            <circle cx="260" cy="220" r="190" stroke="#a078ff" strokeDasharray="4 6" strokeOpacity="0.22" strokeWidth="1.5" />
            <circle cx="260" cy="220" r="145" stroke="#7bd0ff" strokeOpacity="0.28" strokeWidth="1.2" />
            <path d="M 40 90 C 130 110, 170 170, 210 200" stroke="#d0bcff" strokeOpacity="0.45" strokeWidth="1.5" />
            <path d="M 30 220 C 110 220, 150 220, 200 220" stroke="#7bd0ff" strokeOpacity="0.55" strokeWidth="1.5" />
            <path d="M 40 350 C 130 330, 170 270, 210 240" stroke="#ffb690" strokeOpacity="0.45" strokeWidth="1.5" />
            <path d="M 480 90 C 390 110, 350 170, 310 200" stroke="#7bd0ff" strokeOpacity="0.45" strokeWidth="1.5" />
            <path d="M 490 220 C 410 220, 370 220, 320 220" stroke="#ffb690" strokeOpacity="0.55" strokeWidth="1.5" />
            <path d="M 480 350 C 390 330, 350 270, 310 240" stroke="#d0bcff" strokeOpacity="0.45" strokeWidth="1.5" />
            <circle className="animate-pulse" cx="150" cy="130" fill="#d0bcff" r="4.5" />
            <circle className="animate-pulse" cx="370" cy="135" fill="#7bd0ff" r="4.5" />
            <circle className="animate-pulse" cx="380" cy="305" fill="#ffb690" r="4" />
            <circle className="animate-pulse" cx="140" cy="300" fill="#a078ff" r="4" />
          </svg>
        </div>

        {/* Islam Samy Portrait Card with Glowing Violet-Cyan Border */}
        <div className="relative z-10 p-1.5 rounded-3xl bg-gradient-to-br from-primary via-secondary to-tertiary shadow-[0_0_60px_rgba(160,120,255,0.4),0_0_20px_rgba(123,208,255,0.3)] hover:shadow-[0_0_80px_rgba(160,120,255,0.6),0_0_30px_rgba(123,208,255,0.5)] transition-all duration-500">
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[22px] overflow-hidden bg-surface-container-lowest flex items-center justify-center group">
            <img alt="Islam Samy - Senior Solutions Architect &amp; Lead Engineer" className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500" src="/images/islam-samy-portrait.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-surface-container-lowest/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="font-headline-sm text-body-sm font-bold text-on-surface">Islam Samy</span>
                <span className="font-label-sm text-[10px] text-secondary uppercase font-semibold">Data Engineer &amp; Software Developer</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container-high/80 border border-secondary/30">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="text-[10px] font-label-sm text-secondary font-bold">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Status Sub-Badge */}
      <div className="mt-4 flex items-center gap-2 relative z-10">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Enterprise Data Intelligence Pipeline</span>
      </div>
    </motion.div>
    {/*  Right 3 Execution Capabilities  */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-3 flex flex-col gap-3.5 text-left order-3 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto"
    >
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container/95 border border-secondary/20 hover:border-secondary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">04 • PLATFORMS</span>
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#7bd0ff]"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">OPERA PMS &amp; ERP</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Hospitality &amp; retail integrations handling 200+ daily live transactions seamlessly.</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container/95 border border-tertiary/20 hover:border-tertiary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-semibold">05 • SPEED</span>
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#ffb690]"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">Sub-2s Query Speeds</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Schema indexing, star schemas &amp; optimized DAX calculations for instantaneous reports.</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container/95 border border-primary/20 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">06 • LEADERSHIP</span>
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#d0bcff]"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">95% Client Retention</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Led multi-functional tech teams delivering client delight across corporate milestones.</p>
        </div>
      </TiltCard>
    </motion.div>
  </div>
</div>
</section>

{/* CERTIFICATIONS & VERIFIED CREDENTIALS (Featured Immediately After Hero) */}
<CertificationsSection />

{/*  SECTION 2: CREDIBILITY STRIP  */}
<ScrollRevealSection className="w-full relative z-10 bg-surface-container-lowest/40 backdrop-blur-md py-6 border-y border-white/[0.06]">
<div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-primary/10">
<span className="material-symbols-outlined text-primary text-[28px]">school</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Academic Core</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Master's (In Progress) &amp; BIS (Tanta)</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-secondary/10">
<span className="material-symbols-outlined text-secondary text-[28px]">smart_toy</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Predictive ML</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Supervised, XGBoost, Deep Learning</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-tertiary/10">
<span className="material-symbols-outlined text-tertiary text-[28px]">query_stats</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">BI &amp; Automation</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Power BI, Tableau, n8n Automation</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-primary/10">
<span className="material-symbols-outlined text-primary text-[28px]">cases</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Proven Impact</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Nexalytix, Safir Hotels, Sotex Factory</span>
</div>
</div>
</div>
</ScrollRevealSection>
{/*  SECTION 3: TECHNICAL ARSENAL (Islam Samy's Real Verified Skills)  */}
<ScrollRevealSection className="w-full max-w-[1280px] mx-auto px-gutter py-24 relative z-10 content-auto" id="skills"><div className="text-center max-w-3xl mx-auto mb-12"><span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Technical Arsenal &amp; Capabilities</span><h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-4">The Technology Behind My Solutions</h2><p className="font-body-md text-body-md text-on-surface-variant">Interactive production stack matrix deployed across high-precision machine learning, data engineering pipelines, full-stack web platforms, and executive telemetry.</p></div>{/*  Filter Tabs Bar  */}<div className="w-full max-w-5xl mx-auto mb-10 p-5 rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden group"><div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-container-high/60"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span><span className="font-label-sm text-[11px] text-secondary uppercase font-semibold tracking-wider">LIVE ARCHITECTURE STREAM: Distributed Ingestion → Spark Lakehouse → ML Inference Engine → BI Cockpit</span></div><div className="flex items-center gap-4 text-[10px] font-label-sm"><span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-primary/20 text-primary">Pipeline: Online</span><span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-secondary/20 text-secondary">Latency: 12ms</span><span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-tertiary/20 text-tertiary">Throughput: 1.4M msg/sec</span></div></div><div className="relative w-full overflow-hidden my-3">
    <canvas id="safir-telemetry-canvas" className="w-full h-[220px] bg-transparent my-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"></canvas>
  </div><div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-surface-container-high/40 text-center font-label-sm text-[11px]"><div className="p-1.5 rounded-lg bg-surface-container/40 border border-secondary/20 text-secondary font-medium">Stage 01 // Ingestion</div><div className="p-1.5 rounded-lg bg-surface-container/40 border border-primary/20 text-primary font-medium">Stage 02 // ETL &amp; Spark</div><div className="p-1.5 rounded-lg bg-surface-container/40 border border-primary/20 text-primary font-medium">Stage 03 // Neural &amp; Ensembles</div><div className="p-1.5 rounded-lg bg-surface-container/40 border border-tertiary/20 text-tertiary font-medium">Stage 04 // BI &amp; Telemetry</div></div></div><div className="flex items-center justify-center flex-wrap gap-2 mb-10 max-w-5xl mx-auto px-2"><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-primary/40 bg-primary-container text-on-primary shadow-[0_0_16px_rgba(160,120,255,0.4)]" data-filter="all">All Technologies</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="prog-data">Programming &amp; Data</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="ml-ai">Machine Learning</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="frontend">Frontend</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="backend">Backend</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="databases">Databases</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="bi-viz">BI &amp; Visualization</button><button className="tech-filter-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 border border-outline-variant/30 bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest" data-filter="automation">Marketing &amp; Automation</button></div>{/*  Tech Stack Grid  */}<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="tech-matrix-grid">{/*  Item: Python  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/20 hover:border-primary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(160,120,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="prog-data ml-ai"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">code</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">Python</h4><span className="font-label-sm text-[11px] text-primary uppercase font-bold">Advanced • 4+ Yrs</span></div></div><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase font-semibold">Core</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Core language for ML algorithms, ETL architecture, statistical computing, and predictive models.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-primary font-semibold text-[11px]">96%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary shadow-[0_0_8px_#d0bcff]" style={{"width":"96%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Enterprise Sales Predictor</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[14px]">verified</span><span className="">DataCamp: Associate Data Scientist</span></div></div></div>{/*  Item: SQL & MySQL  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-secondary/20 hover:border-secondary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(123,208,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="prog-data backend databases"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-center justify-center text-secondary"><span className="material-symbols-outlined text-[22px]">database</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">MySQL &amp; SQL</h4><span className="font-label-sm text-[11px] text-secondary uppercase font-bold">Advanced • Star Schemas</span></div></div><span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-[10px] uppercase font-semibold">Relational</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">High-volume query optimization, indexing, complex analytical joins, and relational schema modeling.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-secondary font-semibold text-[11px]">94%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_8px_#7bd0ff]" style={{"width":"94%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Sotex Operations Hub</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-[14px]">verified</span><span className="">DataCamp: Associate Data Analyst</span></div></div></div>{/*  Item: Power BI & DAX  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-tertiary/20 hover:border-tertiary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(255,182,144,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="bi-viz"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[22px]">query_stats</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">Power BI &amp; DAX</h4><span className="font-label-sm text-[11px] text-tertiary uppercase font-bold">Expert • Real-time Sync</span></div></div><span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] uppercase font-semibold">Executive</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Interactive executive telemetry, DAX measures, automated gateway refreshes, and enterprise reports.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-tertiary font-semibold text-[11px]">95%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-tertiary via-primary to-secondary shadow-[0_0_8px_#ffb690]" style={{"width":"95%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Safir Hotels Live Cockpit</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[14px]">verified</span><span className="">Cisco: Data Analytics Essentials</span></div></div></div>{/*  Item: XGBoost & Scikit-Learn  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/20 hover:border-primary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(160,120,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="ml-ai prog-data"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">neurology</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">XGBoost &amp; Sklearn</h4><span className="font-label-sm text-[11px] text-primary uppercase font-bold">Advanced • 95% Acc</span></div></div><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase font-semibold">Ensembles</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Gradient boosting, feature engineering, classification trees, hyperparameter tuning &amp; validation.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-primary font-semibold text-[11px]">92%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary shadow-[0_0_8px_#d0bcff]" style={{"width":"92%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Breast Cancer Diagnostic</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[14px]">verified</span><span className="">DataCamp: ML Scientist Track</span></div></div></div>{/*  Item: TensorFlow & Sequential API  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-secondary/20 hover:border-secondary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(123,208,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="ml-ai prog-data"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-center justify-center text-secondary"><span className="material-symbols-outlined text-[22px]">psychology</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">TensorFlow &amp; Keras</h4><span className="font-label-sm text-[11px] text-secondary uppercase font-bold">Intermediate • Deep Nets</span></div></div><span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-[10px] uppercase font-semibold">Deep Learning</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Neural network architectures, multi-layer perceptrons, forward/backprop tuning &amp; sequential pipelines.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-secondary font-semibold text-[11px]">88%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-secondary via-primary to-primary-container shadow-[0_0_8px_#7bd0ff]" style={{"width":"88%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Nexalytix AI Deep Classifier</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-[14px]">verified</span><span className="">MaharaTech ITI: Deep Learning</span></div></div></div>{/*  Item: Modern Frontend (Tailwind, JS/TS, React)  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/20 hover:border-primary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(160,120,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="frontend"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">web</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">Tailwind &amp; Modern UI</h4><span className="font-label-sm text-[11px] text-primary uppercase font-bold">Proficient • Sub-2s Latency</span></div></div><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase font-semibold">Frontend</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Component architecture, dark-mode design systems, responsive UX layouts, and high-speed DOM rendering.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-primary font-semibold text-[11px]">90%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-container to-secondary shadow-[0_0_8px_#d0bcff]" style={{"width":"90%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Sotex Factory Web Platform</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[14px]">verified</span><span className="">BIS Degree: Software Engineering</span></div></div></div>{/*  Item: Node.js & REST APIs  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-secondary/20 hover:border-secondary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(123,208,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="backend prog-data"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-center justify-center text-secondary"><span className="material-symbols-outlined text-[22px]">dns</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">Node.js &amp; REST APIs</h4><span className="font-label-sm text-[11px] text-secondary uppercase font-bold">Proficient • Microservices</span></div></div><span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-[10px] uppercase font-semibold">Backend</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">API microservices, webhook dispatchers, asynchronous queues, and database connector architecture.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-secondary font-semibold text-[11px]">89%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_8px_#7bd0ff]" style={{"width":"89%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Nexalytix API Integration</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-[14px]">verified</span><span className="">IBM: Data Fundamentals</span></div></div></div>{/*  Item: PySpark & Big Data  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-tertiary/20 hover:border-tertiary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(255,182,144,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="prog-data databases"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[22px]">dataset</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">PySpark &amp; Big Data</h4><span className="font-label-sm text-[11px] text-tertiary uppercase font-bold">Intermediate • Distributed</span></div></div><span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] uppercase font-semibold">Big Data</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Distributed dataframe execution, cluster-scale data transformations, and large partition optimizations.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-tertiary font-semibold text-[11px]">85%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary shadow-[0_0_8px_#ffb690]" style={{"width":"85%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Master's Research Analytics</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[14px]">verified</span><span className="">DataCamp: Big Data with PySpark</span></div></div></div>{/*  Item: n8n Workflow Automation  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/20 hover:border-primary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(160,120,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="automation backend"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">hub</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">n8n Automation</h4><span className="font-label-sm text-[11px] text-primary uppercase font-bold">Advanced • 60% Cost Cut</span></div></div><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase font-semibold">Orchestration</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Self-hosted autonomous event pipelines, webhook triggers, multi-system synchronization &amp; error recovery.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-primary font-semibold text-[11px]">91%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary shadow-[0_0_8px_#d0bcff]" style={{"width":"91%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Enterprise n8n Task Flow</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[14px]">verified</span><span className="">Nexalytix Architecture Certified</span></div></div></div>{/*  Item: Tableau & Exploratory BI  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-secondary/20 hover:border-secondary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(123,208,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="bi-viz"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-center justify-center text-secondary"><span className="material-symbols-outlined text-[22px]">bar_chart</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">Tableau Suites</h4><span className="font-label-sm text-[11px] text-secondary uppercase font-bold">Proficient • Visual BI</span></div></div><span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-[10px] uppercase font-semibold">Exploratory</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Story-driven dashboards, calculated fields, visual drill-downs, and client-facing analytical presentations.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-secondary font-semibold text-[11px]">88%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_8px_#7bd0ff]" style={{"width":"88%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Corporate Telemetry Suites</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-[14px]">verified</span><span className="">DataCamp: BI Visualizations</span></div></div></div>{/*  Item: OPERA PMS & Hospitality Systems  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-tertiary/20 hover:border-tertiary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(255,182,144,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="databases bi-viz backend"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[22px]">hotel</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">OPERA PMS &amp; ERP</h4><span className="font-label-sm text-[11px] text-tertiary uppercase font-bold">Domain Specialist</span></div></div><span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] uppercase font-semibold">Enterprise</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Real-time hospitality reservation streams, guest telemetry, 200+ daily booking tracking, and latency reduction.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-tertiary font-semibold text-[11px]">93%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary shadow-[0_0_8px_#ffb690]" style={{"width":"93%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Safir Hotels Live Operations</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[14px]">verified</span><span className="">Safir Operations Experience</span></div></div></div>{/*  Item: Performance Marketing & Google Analytics GA4  */}<div className="tech-card group p-space-md rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/20 hover:border-primary/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(160,120,255,0.35)] transition-all duration-300 flex flex-col justify-between" data-categories="automation bi-viz"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">ads_click</span></div><div><h4 className="font-headline-sm text-body-lg text-on-surface font-semibold">GA4 &amp; Marketing Ops</h4><span className="font-label-sm text-[11px] text-primary uppercase font-bold">Certified Strategy</span></div></div><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase font-semibold">Growth</span></div><p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed">Custom event tracking, conversion funnel modeling, attribution pipelines, and ad spend optimization.</p><div className="mb-4"><div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5"><span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">Proficiency</span><span className="text-primary font-semibold text-[11px]">87%</span></div><div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary-container via-secondary to-tertiary shadow-[0_0_8px_#d0bcff]" style={{"width":"87%"}}></div></div></div><div className="space-y-2 pt-3 border-t border-surface-container-high/60"><div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface"><span className="material-symbols-outlined text-secondary text-[14px]">folder</span><span className="text-on-surface-variant">Project:</span><span className="font-medium text-secondary truncate">Sotex Conversion Architecture</span></div><div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[14px]">verified</span><span className="">Google Analytics Academy &amp; egFWD</span></div></div></div></div>{/*  Empty Filter State  */}<div className="hidden text-center py-12" id="tech-matrix-empty"><span className="material-symbols-outlined text-secondary text-[40px] mb-2">search_off</span><p className="font-headline-sm text-on-surface">No technologies match this category filter.</p><button className="mt-4 px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md" onClick={() => { const btn = document.querySelector('[data-filter="all"]') as HTMLButtonElement | null; btn?.click(); }}>Reset Filter</button></div></ScrollRevealSection>
      {/* SECTION 4: PROFESSIONAL EXPERIENCE TIMELINE */}
      <ExperienceTimelineSection />
{/*  SECTION 5: FEATURED REAL PROJECTS  */}
<ScrollRevealSection className="w-full max-w-[1280px] mx-auto px-gutter py-24 relative z-10 content-auto" id="projects" suppressHydrationWarning>
<div className="text-center max-w-3xl mx-auto mb-16">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Production Systems</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-4">Featured Engineering &amp; Analytics Projects</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Real implementations delivering business value, predictive clarity, and operational savings.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8" suppressHydrationWarning>
  {projects.map((proj, idx) => {
    const canvasId =
      proj.id === 'safir-hotels-bi' || proj.id === 'proj-1' || idx === 0
        ? 'project-3d-safir'
        : proj.id === 'sotex-operations-bi' || proj.id === 'proj-2' || idx === 1
        ? 'project-3d-sotex'
        : proj.id === 'sales-prediction-ml' || proj.id === 'proj-3' || idx === 2
        ? 'project-3d-sales'
        : proj.id === 'breast-cancer-classifier' || proj.id === 'proj-4' || idx === 3
        ? 'project-3d-cancer'
        : `project-3d-custom-${idx}`;

    const borderColor =
      idx % 3 === 0 ? 'border-primary/20 hover:border-primary/40' :
      idx % 3 === 1 ? 'border-secondary/20 hover:border-secondary/40' :
      'border-tertiary/20 hover:border-tertiary/40';

    const tagColor =
      idx % 3 === 0 ? 'bg-primary-container/20 text-primary' :
      idx % 3 === 1 ? 'bg-secondary-container/20 text-secondary' :
      'bg-tertiary/15 text-tertiary';

    return (
      <TiltCard key={proj.id} maxTilt={5} depth={8} glare={true} className="rounded-2xl h-full">
        <div className={`p-space-lg rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border ${borderColor} shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all h-full`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full ${tagColor} font-label-sm text-label-sm uppercase font-semibold`}>
                {proj.category}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {proj.client} • Production
              </span>
            </div>
            <div className="w-full h-36 rounded-xl bg-surface-container-lowest/80 border border-primary/20 relative overflow-hidden mb-3 group/viewport">
              <canvas id={canvasId} className="w-full h-full block"></canvas>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface-container-high/80 backdrop-blur-sm border border-primary/30 text-[10px] font-label-sm text-primary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {proj.impactMetric || 'Production Telemetry'}
              </div>
            </div>
            <h3 suppressHydrationWarning className="font-headline-sm text-headline-sm text-on-surface mb-2">{proj.title}</h3>
            <p suppressHydrationWarning className="font-body-md text-body-md text-on-surface-variant mb-6">
              {proj.summary}
            </p>
            {proj.metrics && proj.metrics.length > 0 && (
              <div className="space-y-3 mb-6" suppressHydrationWarning>
                {proj.metrics.slice(0, 2).map((m, mIdx) => (
                  <div key={mIdx} className="p-3 rounded-xl bg-surface-container-high/60 flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">{m.label}</span>
                    <span suppressHydrationWarning className="font-label-sm text-label-sm text-secondary font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-container-high/60 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface font-label-sm text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${proj.id}`} className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold uppercase tracking-wider">
                Case Study <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </TiltCard>
    );
  })}
</div>
</ScrollRevealSection>
      {/* SECTION 6: EDUCATION & PROFESSIONAL CREDENTIALS */}
{/*  SECTION 7: INTERACTIVE CONTACT & INQUIRY FORM  */}
<ScrollRevealSection className="w-full max-w-[1280px] mx-auto px-gutter py-24 relative z-10 content-auto" id="pricing" suppressHydrationWarning>
  <div className="text-center max-w-3xl mx-auto mb-12">
    <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/90 border border-primary/30 shadow-[0_0_24px_rgba(160,120,255,0.2)] mb-space-sm backdrop-blur-md">
      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#d0bcff]"></span>
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Flexible Collaboration &amp; Pricing</span>
    </div>
    <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-4 tracking-tight">Transparent Engagement Models.</h2>
    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Flexible contract structures tailored for enterprise transformations, high-velocity startups, and end-to-end data systems engineering.</p>
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="inline-flex items-center p-1 rounded-full bg-surface-container-low/50 border border-surface-container-high/60 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
        <button type="button" id="pricing-tab-milestone" className="px-5 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-[0_0_16px_rgba(160,120,255,0.4)] transition-all duration-300 font-semibold">Project-Based / Milestones</button>
        <button type="button" id="pricing-tab-retainer" className="px-5 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all duration-300 font-medium">Dedicated Advisory / Monthly Retainer</button>
      </div>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/70 hover:bg-surface-container-highest text-secondary hover:text-secondary-fixed text-xs font-mono font-semibold border border-secondary/30 transition-all shadow-sm hover:scale-105"
      >
        <span>View Full Dedicated Pricing &amp; Consultation Rates Page</span>
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  </div>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12" suppressHydrationWarning>
    {packages.map((pkg, idx) => {
      const isPopular = pkg.isPopular;
      const borderCls = isPopular
        ? 'border-2 border-primary/50 shadow-[0_0_35px_rgba(160,120,255,0.25),0_12px_40px_rgba(0,0,0,0.6)] bg-surface-container-low/95 dark:bg-[#151821]/95'
        : idx === 0
        ? 'border border-primary/20 hover:border-primary/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-surface-container-low/90 dark:bg-[#14161f]/95'
        : 'border border-tertiary/20 hover:border-tertiary/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-surface-container-low/90 dark:bg-[#14161f]/95';

      return (
        <div key={pkg.id} className={`relative p-space-lg rounded-2xl transition-all duration-300 flex flex-col justify-between group ${borderCls}`} suppressHydrationWarning>
          {isPopular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary-container font-label-sm text-[11px] font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(160,120,255,0.5)]">
              Most Requested • Enterprise
            </div>
          )}
          <div className={`flex flex-col ${isPopular ? 'pt-2' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] uppercase font-semibold border border-primary/20">
                {pkg.badge || 'Targeted Sprint'}
              </span>
              <span className="material-symbols-outlined text-primary text-[22px]">
                {isPopular ? 'all_inclusive' : idx === 0 ? 'speed' : 'military_tech'}
              </span>
            </div>
            <h3 suppressHydrationWarning className="font-headline-sm text-headline-sm text-on-surface mb-2">{pkg.name}</h3>
            <p suppressHydrationWarning className="font-body-sm text-body-sm text-on-surface-variant mb-6 min-h-[48px]">
              {pkg.headline}
            </p>
            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-surface-container-high/60" suppressHydrationWarning>
              <span
                suppressHydrationWarning
                className={`font-display-xl text-[40px] font-bold leading-none price-display ${isPopular ? 'bg-gradient-to-r from-primary via-secondary to-tertiary-fixed bg-clip-text text-transparent' : 'text-on-surface'}`}
                data-milestone={pkg.price}
                data-retainer={pkg.price}
              >
                {pkg.price}
              </span>
              <span suppressHydrationWarning className="font-label-sm text-label-sm text-on-surface-variant uppercase frequency-label">
                {pkg.frequency}
              </span>
            </div>
            <div className="space-y-3 mb-8" suppressHydrationWarning>
              <div className="font-label-sm text-[11px] uppercase text-primary font-bold tracking-wider mb-2">
                Deliverables Included:
              </div>
              {pkg.deliverables.map((deliv, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href={`/book?package=${pkg.id}`}
              className={`w-full py-3 px-4 rounded-xl text-center transition-all duration-300 font-label-md text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 ${
                isPopular
                  ? 'bg-primary-container text-on-primary shadow-[0_0_25px_rgba(160,120,255,0.45)] hover:shadow-[0_0_35px_rgba(160,120,255,0.6)] hover:bg-primary'
                  : 'bg-surface-container-high/90 hover:bg-surface-container-highest border border-primary/30 text-on-surface hover:text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
              }`}
            >
              <span>{isPopular ? 'Deploy Enterprise Architecture' : `Book ${pkg.name}`}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <a
              href="#contact"
              onClick={() => {
                const sel = document.querySelector('#project-form select') as HTMLSelectElement | null;
                if (sel) sel.value = isPopular ? 'ml-models' : idx === 0 ? 'power-bi' : 'advisory';
              }}
              className="w-full py-1.5 text-center text-[11px] font-mono text-on-surface-variant hover:text-secondary transition-colors"
            >
              Or send custom message &darr;
            </a>
          </div>
        </div>
      );
    })}
  </div>
  <div className="p-space-md sm:p-space-lg rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-surface-container-high/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-around gap-6 text-on-surface-variant font-label-sm text-label-sm">
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">verified_user</span><span className="text-on-surface font-semibold">100% Milestone-Gated Delivery</span></div>
    <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest hidden sm:block"></div>
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">tune</span><span className="text-on-surface font-semibold">Fixed-Scope or Flexible T&amp;M</span></div>
    <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest hidden sm:block"></div>
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-[20px]">lock</span><span className="text-on-surface font-semibold">Enterprise Non-Disclosure Agreement (NDA) Guaranteed</span></div>
  </div>
</ScrollRevealSection>

      {/* CLIENT REVIEWS SECTION */}
      <ClientReviewsSection />

      {/* Cybernetic Grid Horizon Transition */}
      <div className="w-full relative overflow-hidden -my-10 pointer-events-none flex justify-center">
        <CyberneticGridCanvas className="w-full max-w-[1280px] h-48 opacity-40 dark:opacity-30" />
      </div>

      <ScrollRevealSection className="w-full max-w-[1280px] mx-auto px-gutter py-24 relative z-10 content-auto" id="contact">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
{/*  Islam Samy Direct Contact Info  */}
<div className="lg:col-span-5 flex flex-col justify-between">
<div>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase mb-4 border border-primary/20">
<span className="material-symbols-outlined text-[14px]">send</span>
<span className="">Direct Communications</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-4">
  Let's Build Intelligent Systems Together.
</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">
  Available for high-impact Data Engineering, Machine Learning deployment, Power BI dashboard architecture, and automated operations consulting across Egypt, the Gulf, and international markets.
</p>
{/*  Verified Direct Contact Info Cards  */}
<div className="space-y-4">
<a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-colors" href="mailto:islamsamy410@gmail.com">
<div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[20px]">mail</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">Direct Email</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">islamsamy410@gmail.com</span>
</div>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5 hover:border-secondary/40 transition-colors" href="tel:01206123824">
<div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[20px]">phone</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">Phone / WhatsApp</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">01206123824</span>
</div>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-colors" href="https://www.linkedin.com/in/islam-samy-3b72061a9/" rel="noopener noreferrer" target="_blank">
<div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[20px]">link</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">LinkedIn</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">linkedin.com/in/islam-samy-3b72061a9/</span>
</div>
</a>
<div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5">
<div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[20px]">location_on</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">Location &amp; Languages</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">Cairo, Egypt • Arabic (Native) | English (Proficient B2)</span>
</div>
</div>
</div>
</div>
<div className="pt-8 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="">Guaranteed confidential response within 24 hours.</span>
</div>
</div>
{/*  Interactive Project Inquiry Form  */}
<div className="lg:col-span-7">
<form onSubmit={handleInquirySubmit} className="p-space-lg sm:p-space-xl rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col gap-5" id="project-form">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/*  Name Input  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">Your Name *</label>
<input value={inqName} onChange={(e) => setInqName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" placeholder="e.g. Omar Mansour" required type="text" />
</div>
{/*  Email Input  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">Work Email *</label>
<input value={inqEmail} onChange={(e) => setInqEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" placeholder="omar@company.com" required type="email" />
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/*  Company / Project Name  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">Company / Venture</label>
<input value={inqCompany} onChange={(e) => setInqCompany(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" placeholder="e.g. Nexa Hospitality Group" type="text" />
</div>
{/*  Project Type Selection  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">Engagement Focus *</label>
<select value={inqFocus} onChange={(e) => setInqFocus(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" required>
<option value="power-bi">Custom Power BI &amp; Operations Dashboard</option>
<option value="ml-models">Machine Learning &amp; Predictive Analytics</option>
<option value="data-engineering">Data Pipelines &amp; SQL / MySQL Optimization</option>
<option value="n8n-automation">n8n Workflow Automation (Cost Reduction)</option>
<option value="hospitality-bi">OPERA PMS / Hospitality Telemetry</option>
<option value="advisory">Advisory &amp; BIS Architecture Consulting</option>
</select>
</div>
</div>
{/*  Message Input  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">Project Objectives &amp; Requirements *</label>
<textarea value={inqMessage} onChange={(e) => setInqMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" placeholder="Describe your data sources, expected metrics, target timelines, or existing operational bottlenecks..." required rows={4}></textarea>
</div>
{/*  Submit Button  */}
<button disabled={inqSending} className="w-full mt-2 py-4 rounded-xl bg-primary-container text-on-primary font-headline-sm text-label-md uppercase tracking-wider shadow-[0_0_25px_rgba(160,120,255,0.45)] hover:bg-primary hover:shadow-[0_0_35px_rgba(160,120,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50" type="submit">
<span className="material-symbols-outlined text-[20px]">send</span>
<span>{inqSending ? 'Transmitting to Supabase...' : 'Send Message to Islam Samy'}</span>
</button>
{inqSent && (
  <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-label-sm text-label-sm text-center">
    Inquiry transmitted to Islam's executive pipeline! A confirmation has been logged and Islam will respond within 24 hours.
  </div>
)}
</form>
</div>
</div>
</ScrollRevealSection>
</div>
      </main>
      <SiteFooter />
    </div>
  );
}
