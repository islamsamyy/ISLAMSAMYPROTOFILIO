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

    try {
      // 1. Scene setup
      const scene = new THREE.Scene();
      const fogColor = new THREE.Color(getBgColor());
      scene.fog = new THREE.FogExp2(fogColor, 0.00075);

      // 2. Camera setup
      const width = window.innerWidth;
      const height = window.innerHeight;
      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2600);
      camera.position.set(0, 40, 480);

      // 3. WebGL Renderer with solid theme background
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(getBgColor(), 1.0);
      container.appendChild(renderer.domElement);

      // 4. Procedural Glowing Circular Particle Texture
      const createGlowTexture = (): THREE.CanvasTexture => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.2, 'rgba(230, 240, 255, 0.95)');
          gradient.addColorStop(0.5, 'rgba(123, 208, 255, 0.55)');
          gradient.addColorStop(0.8, 'rgba(160, 120, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 64, 64);
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };

      const particleTexture = createGlowTexture();

      // 5. Volumetric Particle System (1,000 particles)
      const particleCount = 1000;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const originalPositions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      const colorViolet = new THREE.Color(0xd0bcff); // #d0bcff
      const colorCyan = new THREE.Color(0x7bd0ff); // #7bd0ff
      const colorAmber = new THREE.Color(0xffb690); // #ffb690
      const colorWhite = new THREE.Color(0xffffff);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Full viewport 3D box distribution
        const x = (Math.random() - 0.5) * 1800;
        const y = (Math.random() - 0.5) * 2200;
        const z = (Math.random() - 0.5) * 1200 - 100;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        originalPositions[i3] = x;
        originalPositions[i3 + 1] = y;
        originalPositions[i3 + 2] = z;

        velocities[i3] = (Math.random() - 0.5) * 0.3;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.4;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.25;

        // Color distribution: 50% Violet, 40% Cyan, 10% Amber
        const rnd = Math.random();
        const chosenColor = rnd < 0.5 ? colorViolet : rnd < 0.9 ? colorCyan : colorAmber;

        colors[i3] = chosenColor.r;
        colors[i3 + 1] = chosenColor.g;
        colors[i3 + 2] = chosenColor.b;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 13.0,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: isDark() ? 0.92 : 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleSystem);

      // 6. Neural Constellation Line Network (Dynamic links between nearby particles)
      const maxLines = 500;
      const linePositions = new Float32Array(maxLines * 6);
      const lineColors = new Float32Array(maxLines * 6);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark() ? 0.38 : 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      // 7. Undulating 3D Topography Grid Wave
      const gridCols = 52;
      const gridRows = 52;
      const gridSpacing = 52;
      const gridVertexCount = gridCols * gridRows;
      const gridGeometry = new THREE.BufferGeometry();
      const gridPositions = new Float32Array(gridVertexCount * 3);
      const gridColors = new Float32Array(gridVertexCount * 3);
      const indices: number[] = [];

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const index = r * gridCols + c;
          const i3 = index * 3;
          const gx = (c - gridCols / 2) * gridSpacing;
          const gz = (r - gridRows / 2) * gridSpacing - 220;

          gridPositions[i3] = gx;
          gridPositions[i3 + 1] = 0;
          gridPositions[i3 + 2] = gz;

          const depthRatio = r / gridRows;
          const gColor = new THREE.Color().lerpColors(colorCyan, colorViolet, depthRatio);
          gridColors[i3] = gColor.r;
          gridColors[i3 + 1] = gColor.g;
          gridColors[i3 + 2] = gColor.b;

          if (c < gridCols - 1) indices.push(index, index + 1);
          if (r < gridRows - 1) indices.push(index, index + gridCols);
        }
      }

      gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
      gridGeometry.setAttribute('color', new THREE.BufferAttribute(gridColors, 3));
      gridGeometry.setIndex(indices);

      const gridMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark() ? 0.42 : 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
      gridLines.position.set(0, -220, 0);
      scene.add(gridLines);

      // 8. Ambient Gyroscopic Orbital Rings in background
      const orbitGroup = new THREE.Group();
      const ringRadii = [360, 520, 700];
      const ringMaterials: THREE.LineBasicMaterial[] = [];

      ringRadii.forEach((r, idx) => {
        const ringGeom = new THREE.BufferGeometry();
        const segments = 96;
        const pts = new Float32Array((segments + 1) * 3);
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          pts[s * 3] = Math.cos(angle) * r;
          pts[s * 3 + 1] = 0;
          pts[s * 3 + 2] = Math.sin(angle) * r;
        }
        ringGeom.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const rMat = new THREE.LineBasicMaterial({
          color: idx % 2 === 0 ? 0xd0bcff : 0x7bd0ff,
          transparent: true,
          opacity: isDark() ? 0.28 : 0.14,
          blending: THREE.AdditiveBlending,
        });
        ringMaterials.push(rMat);
        const ringLine = new THREE.Line(ringGeom, rMat);
        ringLine.rotation.x = Math.PI * 0.28 * (idx + 1);
        ringLine.rotation.y = Math.PI * 0.16 * (idx + 1);
        orbitGroup.add(ringLine);
      });

      orbitGroup.position.set(0, 0, -140);
      scene.add(orbitGroup);

      // 9. Interaction & Animation Variables
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let scrollY = 0;
      let targetScrollY = 0;
      let clock = new THREE.Clock();

      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const handleScroll = () => {
        targetScrollY = window.scrollY || window.pageYOffset || 0;
      };

      const handleResize = () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer?.setSize(nw, nh);
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      };

      const handleThemeChange = () => {
        const dark = isDark();
        const color = getBgColor();
        scene.fog = new THREE.FogExp2(new THREE.Color(color), 0.00075);
        renderer?.setClearColor(color, 1.0);
        particleMaterial.opacity = dark ? 0.92 : 0.65;
        lineMaterial.opacity = dark ? 0.38 : 0.22;
        gridMaterial.opacity = dark ? 0.42 : 0.22;
        ringMaterials.forEach((m) => {
          m.opacity = dark ? 0.28 : 0.14;
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      window.addEventListener('islam_theme_change', handleThemeChange);

      const themeObserver = new MutationObserver(() => {
        handleThemeChange();
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      let isTabVisible = !document.hidden;
      let isElementIntersecting = true;

      const handleVisibilityChange = () => {
        isTabVisible = !document.hidden;
        if (isTabVisible && isElementIntersecting && !animId) {
          clock.start();
          animate();
        } else if (!isTabVisible && animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      let containerObserver: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== 'undefined') {
        containerObserver = new IntersectionObserver(([entry]) => {
          isElementIntersecting = entry.isIntersecting;
          if (isElementIntersecting && isTabVisible && !animId) {
            clock.start();
            animate();
          } else if (!isElementIntersecting && animId) {
            cancelAnimationFrame(animId);
            animId = 0;
          }
        }, { threshold: 0.01 });
        containerObserver.observe(container);
      }

      // 10. Main Animation Loop
      const animate = () => {
        if (!isTabVisible || !isElementIntersecting) {
          animId = 0;
          return;
        }
        animId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Mouse & scroll smoothing
        currentMouseX += (targetMouseX - currentMouseX) * 0.045;
        currentMouseY += (targetMouseY - currentMouseY) * 0.045;
        scrollY += (targetScrollY - scrollY) * 0.065;

        // Camera positioning with perspective tilt
        camera.position.x = currentMouseX * 60;
        camera.position.y = 40 - currentMouseY * 45 - scrollY * 0.18;
        camera.position.z = 480 - scrollY * 0.04;

        const camY = camera.position.y;
        camera.lookAt(0, camY - 20, 0);

        if (!prefersReducedMotion) {
          // A. Particles animation with infinite vertical wrapping around camera
          const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
          const posArr = posAttr.array as Float32Array;

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Harmonic floating and drift
            posArr[i3] += Math.sin(elapsedTime * 0.6 + i) * 0.22;
            posArr[i3 + 1] = originalPositions[i3 + 1] + Math.sin(elapsedTime * 0.75 + i * 0.18) * 16;
            posArr[i3 + 2] += Math.cos(elapsedTime * 0.5 + i) * 0.18;

            // Seamless vertical wrapping around active camera view
            while (posArr[i3 + 1] > camY + 950) posArr[i3 + 1] -= 1900;
            while (posArr[i3 + 1] < camY - 950) posArr[i3 + 1] += 1900;

            // Slow orbital revolution
            const curX = posArr[i3];
            const curZ = posArr[i3 + 2];
            const cosRot = Math.cos(0.00045);
            const sinRot = Math.sin(0.00045);
            posArr[i3] = curX * cosRot - curZ * sinRot;
            posArr[i3 + 2] = curX * sinRot + curZ * cosRot;
          }
          posAttr.needsUpdate = true;

          // B. Dynamic Neural Constellation Line Network (Connect nearby nodes)
          const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
          const lineColAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
          const lPos = linePosAttr.array as Float32Array;
          const lCol = lineColAttr.array as Float32Array;

          let lineIndex = 0;
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const checkCount = Math.min(isMobile ? 70 : 130, particleCount); // Adaptive threshold for consistent 60+ FPS
          const maxDist = 135;
          const maxDistSq = maxDist * maxDist;

          for (let i = 0; i < checkCount && lineIndex < maxLines; i++) {
            const i3 = i * 3;
            const x1 = posArr[i3];
            const y1 = posArr[i3 + 1];
            const z1 = posArr[i3 + 2];

            // Only connect if near camera vertical view
            if (Math.abs(y1 - camY) > 600) continue;

            for (let j = i + 1; j < checkCount && lineIndex < maxLines; j++) {
              const j3 = j * 3;
              const dx = x1 - posArr[j3];
              const dy = y1 - posArr[j3 + 1];
              const dz = z1 - posArr[j3 + 2];
              const distSq = dx * dx + dy * dy + dz * dz;

              if (distSq < maxDistSq) {
                const pIdx = lineIndex * 6;
                lPos[pIdx] = x1;
                lPos[pIdx + 1] = y1;
                lPos[pIdx + 2] = z1;
                lPos[pIdx + 3] = posArr[j3];
                lPos[pIdx + 4] = posArr[j3 + 1];
                lPos[pIdx + 5] = posArr[j3 + 2];

                const alphaFactor = 1 - Math.sqrt(distSq) / maxDist;
                lCol[pIdx] = 0.82 * alphaFactor;
                lCol[pIdx + 1] = 0.74 * alphaFactor;
                lCol[pIdx + 2] = 1.0 * alphaFactor;
                lCol[pIdx + 3] = 0.48 * alphaFactor;
                lCol[pIdx + 4] = 0.82 * alphaFactor;
                lCol[pIdx + 5] = 1.0 * alphaFactor;

                lineIndex++;
              }
            }
          }

          // Clear remaining unused lines
          for (let k = lineIndex * 6; k < maxLines * 6; k++) {
            lPos[k] = 0;
            lCol[k] = 0;
          }
          linePosAttr.needsUpdate = true;
          lineColAttr.needsUpdate = true;

          // C. Undulating 3D Topography Grid Wave tracking camera
          gridLines.position.y = camY - 240;

          const gridPosAttr = gridGeometry.getAttribute('position') as THREE.BufferAttribute;
          const gridPosArray = gridPosAttr.array as Float32Array;

          for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
              const index = r * gridCols + c;
              const i3 = index * 3;
              const gx = gridPositions[i3];
              const gz = gridPositions[i3 + 2];

              const elevation =
                Math.sin(gx * 0.007 + elapsedTime * 1.3 + scrollY * 0.001) *
                Math.cos(gz * 0.007 + elapsedTime * 0.95) *
                45 +
                Math.sin((gx + gz) * 0.0045 + elapsedTime * 1.6) * 22;

              gridPosArray[i3 + 1] = elevation;
            }
          }
          gridPosAttr.needsUpdate = true;

          // D. Ambient Gyroscopic Orbital Rings tracking camera
          orbitGroup.position.y = camY;
          orbitGroup.rotation.y = elapsedTime * 0.06;
          orbitGroup.rotation.x = Math.sin(elapsedTime * 0.035) * 0.12;
        }

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('islam_theme_change', handleThemeChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        themeObserver.disconnect();
        containerObserver?.disconnect();

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

      // Fallback 2D Canvas Animation Engine
      const canvas = document.createElement('canvas');
      canvas.className = 'w-full h-full';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);

      const onResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', onResize);

      const nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string }> = [];
      const colors = ['rgba(208, 188, 255, ', 'rgba(123, 208, 255, ', 'rgba(255, 182, 144, '];
      for (let i = 0; i < 90; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      const draw2D = () => {
        ctx.fillStyle = isDark() ? '#0c0e15' : '#f6f7fc';
        ctx.fillRect(0, 0, w, h);

        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = n.color + '0.85)';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#7bd0ff';
          ctx.fill();
        });

        requestAnimationFrame(draw2D);
      };
      draw2D();

      return () => {
        window.removeEventListener('resize', onResize);
        if (container.contains(canvas)) container.removeChild(canvas);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={className || 'fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden'}
      style={style}
      aria-hidden="true"
    />
  );
}

export default ThreeBackgroundCanvas;
