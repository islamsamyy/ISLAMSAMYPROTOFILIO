'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ThreeBackgroundCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThreeBackgroundCanvas({
  className,
  style,
}: ThreeBackgroundCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect theme
    const isDark = () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark');

    const getBgColor = () => (isDark() ? 0x0c0e15 : 0xf6f7fc);

    let renderer: THREE.WebGLRenderer | null = null;
    let animId = 0;
    let isWindowScrolling = false;
    let scrollDebounceTimer: ReturnType<typeof setTimeout> | null = null;

    try {
      // 1. Scene setup
      const scene = new THREE.Scene();
      const fogColor = new THREE.Color(getBgColor());
      scene.fog = new THREE.FogExp2(fogColor, 0.0008);

      // 2. Camera setup
      const width = window.innerWidth;
      const height = window.innerHeight;
      const camera = new THREE.PerspectiveCamera(58, width / height, 1, 2500);
      camera.position.set(0, 40, 460);

      // 3. WebGL Renderer with performance optimizations
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance',
        precision: 'mediump',
        stencil: false,
        depth: true,
      });
      renderer.setSize(width, height);
      // Cap at 1.2 DPR to drastically cut fragment shader fill-rate on 4K/Retina displays
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
      renderer.setClearColor(getBgColor(), 1.0);
      container.appendChild(renderer.domElement);

      // 4. Procedural Glowing Circular Particle Texture (pre-rendered once)
      const createGlowTexture = (): THREE.CanvasTexture => {
        const canvas = document.createElement('canvas');
        canvas.width = 48;
        canvas.height = 48;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createRadialGradient(24, 24, 0, 24, 24, 24);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.25, 'rgba(220, 235, 255, 0.9)');
          gradient.addColorStop(0.55, 'rgba(123, 208, 255, 0.45)');
          gradient.addColorStop(0.85, 'rgba(160, 120, 255, 0.15)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 48, 48);
        }
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
      };

      const particleTexture = createGlowTexture();

      // Master 3D Group: all elements transform on the GPU together with ZERO per-frame buffer uploads!
      const constellationGroup = new THREE.Group();
      scene.add(constellationGroup);

      // 5. Lightweight Particle Nodes (150 particles)
      const particleCount = 150;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorViolet = new THREE.Color(0xd0bcff);
      const colorCyan = new THREE.Color(0x7bd0ff);
      const colorAmber = new THREE.Color(0xffb690);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = (Math.random() - 0.5) * 1600;
        const y = (Math.random() - 0.5) * 1800;
        const z = (Math.random() - 0.5) * 1000 - 80;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        const rnd = Math.random();
        const chosenColor = rnd < 0.55 ? colorViolet : rnd < 0.88 ? colorCyan : colorAmber;
        colors[i3] = chosenColor.r;
        colors[i3 + 1] = chosenColor.g;
        colors[i3 + 2] = chosenColor.b;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 14.0,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: isDark() ? 0.92 : 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      constellationGroup.add(particleSystem);

      // 6. Precomputed Neural Network Lines (Calculated ONCE during init, 0 per-frame CPU loops)
      const lineCoords: number[] = [];
      const lineCol: number[] = [];
      const maxConnectDist = 180;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      let lineSegmentsCount = 0;
      const maxAllowedLines = 90;

      for (let i = 0; i < particleCount && lineSegmentsCount < maxAllowedLines; i++) {
        const i3 = i * 3;
        const x1 = positions[i3];
        const y1 = positions[i3 + 1];
        const z1 = positions[i3 + 2];

        for (let j = i + 1; j < particleCount && lineSegmentsCount < maxAllowedLines; j++) {
          const j3 = j * 3;
          const dx = x1 - positions[j3];
          const dy = y1 - positions[j3 + 1];
          const dz = z1 - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxConnectDistSq) {
            lineCoords.push(x1, y1, z1, positions[j3], positions[j3 + 1], positions[j3 + 2]);
            const alpha = 1 - Math.sqrt(distSq) / maxConnectDist;
            lineCol.push(0.82 * alpha, 0.74 * alpha, 1.0 * alpha);
            lineCol.push(0.48 * alpha, 0.82 * alpha, 1.0 * alpha);
            lineSegmentsCount++;
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(lineCoords, 3)
      );
      lineGeometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(lineCol, 3)
      );

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark() ? 0.35 : 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      constellationGroup.add(lineSegments);

      // 7. Undulating 3D Topography Grid Wave (Precomputed static wave mesh)
      const gridCols = 20;
      const gridRows = 20;
      const gridSpacing = 65;
      const gridPositions: number[] = [];
      const gridIndices: number[] = [];

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const gx = (c - gridCols / 2) * gridSpacing;
          const gz = (r - gridRows / 2) * gridSpacing;
          const gy = Math.sin(gx * 0.008) * Math.cos(gz * 0.008) * 35;
          gridPositions.push(gx, gy, gz);
        }
      }

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols - 1; c++) {
          const idx = r * gridCols + c;
          gridIndices.push(idx, idx + 1);
        }
      }
      for (let c = 0; c < gridCols; c++) {
        for (let r = 0; r < gridRows - 1; r++) {
          const idx = r * gridCols + c;
          gridIndices.push(idx, idx + gridCols);
        }
      }

      const gridGeometry = new THREE.BufferGeometry();
      gridGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(gridPositions, 3)
      );
      gridGeometry.setIndex(gridIndices);

      const gridMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x7bd0ff),
        transparent: true,
        opacity: isDark() ? 0.25 : 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
      gridLines.position.set(0, -220, -100);
      scene.add(gridLines);

      // 8. Minimalist Gyroscopic Ambient Rings
      const orbitGroup = new THREE.Group();
      const ringRadii = [320, 460];
      const ringColors = [0xd0bcff, 0x7bd0ff];
      const ringMaterials: THREE.LineBasicMaterial[] = [];

      ringRadii.forEach((radius, idx) => {
        const ringGeom = new THREE.BufferGeometry();
        const pts: number[] = [];
        const ringSegments = 36;
        for (let s = 0; s <= ringSegments; s++) {
          const theta = (s / ringSegments) * Math.PI * 2;
          pts.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
        }
        ringGeom.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const rMat = new THREE.LineBasicMaterial({
          color: ringColors[idx],
          transparent: true,
          opacity: isDark() ? 0.2 : 0.1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        ringMaterials.push(rMat);
        const ringLine = new THREE.Line(ringGeom, rMat);
        ringLine.rotation.x = Math.PI * 0.3 * (idx + 1);
        ringLine.rotation.y = Math.PI * 0.15 * (idx + 1);
        orbitGroup.add(ringLine);
      });

      orbitGroup.position.set(0, 0, -120);
      scene.add(orbitGroup);

      // 9. Interaction & Viewport Tracking
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let scrollY = 0;
      let targetScrollY = 0;
      const clock = new THREE.Clock();

      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const handleScroll = () => {
        targetScrollY = window.scrollY || window.pageYOffset || 0;
        isWindowScrolling = true;
        if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
        scrollDebounceTimer = setTimeout(() => {
          isWindowScrolling = false;
        }, 90);
      };

      const handleResize = () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer?.setSize(nw, nh);
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
      };

      const handleThemeChange = () => {
        const dark = isDark();
        const color = getBgColor();
        scene.fog = new THREE.FogExp2(new THREE.Color(color), 0.0008);
        renderer?.setClearColor(color, 1.0);
        particleMaterial.opacity = dark ? 0.92 : 0.65;
        lineMaterial.opacity = dark ? 0.35 : 0.2;
        gridMaterial.opacity = dark ? 0.25 : 0.14;
        ringMaterials.forEach((m) => {
          m.opacity = dark ? 0.2 : 0.1;
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('islam_theme_change', handleThemeChange);

      const themeObserver = new MutationObserver(() => {
        handleThemeChange();
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      let isTabVisible = !document.hidden;

      const handleVisibilityChange = () => {
        isTabVisible = !document.hidden;
        if (isTabVisible && !animId) {
          clock.start();
          animate();
        } else if (!isTabVisible && animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // 10. Frame-Budgeted Animation Loop (GPU-Accelerated Matrix Operations only, zero CPU buffer updates)
      let lastFrameTimestamp = 0;
      let frameSkipCounter = 0;
      const targetInterval = 1000 / 45; // 45 FPS ceiling for background = ultra-efficient

      const animate = (timestamp = 0) => {
        if (!isTabVisible) {
          animId = 0;
          return;
        }
        animId = requestAnimationFrame(animate);

        // DURING RAPID SCROLLING: Skip every second frame to dedicate 100% compositor thread to butter-smooth scrolling
        if (isWindowScrolling) {
          frameSkipCounter++;
          if (frameSkipCounter % 2 !== 0) return;
        }

        const delta = timestamp - lastFrameTimestamp;
        if (delta < targetInterval) return;
        lastFrameTimestamp = timestamp - (delta % targetInterval);

        const elapsedTime = clock.getElapsedTime();

        // Mouse & scroll smoothing
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
        scrollY += (targetScrollY - scrollY) * 0.12;

        // Camera positioning with perspective tilt
        camera.position.x = currentMouseX * 40;
        camera.position.y = 40 - currentMouseY * 30 - scrollY * 0.14;
        camera.position.z = 460 - scrollY * 0.03;

        const camY = camera.position.y;
        camera.lookAt(0, camY - 20, 0);

        if (!prefersReducedMotion) {
          // GPU Group Transformations: ZERO CPU array mutations!
          constellationGroup.rotation.y = elapsedTime * 0.016;
          constellationGroup.rotation.x = Math.sin(elapsedTime * 0.01) * 0.03;
          constellationGroup.position.y = camY * 0.45;

          gridLines.position.y = camY - 220;
          gridLines.rotation.y = elapsedTime * 0.008;

          orbitGroup.position.y = camY;
          orbitGroup.rotation.y = elapsedTime * 0.04;
          orbitGroup.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;
        }

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        if (animId) cancelAnimationFrame(animId);
        if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('islam_theme_change', handleThemeChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        themeObserver.disconnect();

        particleGeometry.dispose();
        particleMaterial.dispose();
        particleTexture.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        gridGeometry.dispose();
        gridMaterial.dispose();
        ringMaterials.forEach((m) => m.dispose());
        renderer?.dispose();

        if (renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to 2D Canvas:', err);

      const canvas = document.createElement('canvas');
      canvas.className = 'w-full h-full';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);
      const nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string }> = [];
      const colors = ['rgba(208, 188, 255, ', 'rgba(123, 208, 255, ', 'rgba(255, 182, 144, '];
      for (let i = 0; i < 35; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      let anim2dId = 0;
      const render2d = () => {
        if (!isWindowScrolling) {
          ctx.clearRect(0, 0, w, h);
          nodes.forEach((n) => {
            n.x = (n.x + n.vx + w) % w;
            n.y = (n.y + n.vy + h) % h;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = n.color + '0.75)';
            ctx.fill();
          });
        }
        anim2dId = requestAnimationFrame(render2d);
      };

      if (!prefersReducedMotion) {
        render2d();
      }

      return () => {
        if (anim2dId) cancelAnimationFrame(anim2dId);
        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default ThreeBackgroundCanvas;
