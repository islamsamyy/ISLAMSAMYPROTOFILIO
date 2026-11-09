'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Maximum tilt rotation angle in degrees. Default: 12 */
  maxTilt?: number;
  /** Enable specular sheen/glare overlay. Default: true */
  glare?: boolean;
  /** Depth translation (translateZ in px) for 3D layered content. Default: 20 */
  depth?: number;
  /** 3D perspective distance in px. Default: 1000 */
  perspective?: number;
  /** Scale factor applied on hover. Default: 1.02 */
  scale?: number;
  /** Maximum opacity of specular sheen glare (0 to 1). Default: 0.25 */
  glareMaxOpacity?: number;
  /** Return transition speed in milliseconds on mouse leave. Default: 400 */
  speed?: number;
  /** Explicitly disable 3D tilt. Default: false */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      children,
      maxTilt = 12,
      glare = true,
      depth = 20,
      perspective = 1000,
      scale = 1.02,
      glareMaxOpacity = 0.25,
      speed = 400,
      disabled = false,
      className,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);
    const [tiltX, setTiltX] = React.useState(0);
    const [tiltY, setTiltY] = React.useState(0);
    const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = React.useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);

    // Merge internal ref with forwarded ref
    React.useImperativeHandle(forwardedRef, () => cardRef.current as HTMLDivElement);

    // Detect prefers-reduced-motion and touch device on client mount
    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaMotion.matches);

      const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      if (mediaMotion.addEventListener) {
        mediaMotion.addEventListener('change', onMotionChange);
      } else {
        mediaMotion.addListener(onMotionChange);
      }

      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);

      return () => {
        if (mediaMotion.removeEventListener) {
          mediaMotion.removeEventListener('change', onMotionChange);
        } else {
          mediaMotion.removeListener(onMotionChange);
        }
      };
    }, []);

    const isInteractionActive = !disabled && !prefersReducedMotion && !isTouchDevice;

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isInteractionActive || !cardRef.current) {
          onMouseMove?.(e);
          return;
        }

        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        // Normalized to [-0.5, 0.5]
        const normX = clientX / rect.width - 0.5;
        const normY = clientY / rect.height - 0.5;

        // Tilt rotation: cursor at top tilts card top towards viewer (+X), cursor at right tilts right (+Y)
        const calcTiltX = -normY * maxTilt * 2;
        const calcTiltY = normX * maxTilt * 2;

        setTiltX(calcTiltX);
        setTiltY(calcTiltY);

        if (glare) {
          setGlarePos({
            x: Math.round((clientX / rect.width) * 100),
            y: Math.round((clientY / rect.height) * 100),
          });
        }

        onMouseMove?.(e);
      },
      [isInteractionActive, maxTilt, glare, onMouseMove]
    );

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isInteractionActive) {
          setIsHovered(true);
        }
        onMouseEnter?.(e);
      },
      [isInteractionActive, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setIsHovered(false);
        setTiltX(0);
        setTiltY(0);
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    const currentScale = isHovered && isInteractionActive ? scale : 1;
    const transformStyleString = isInteractionActive
      ? `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`
      : 'none';

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative will-change-transform transform-gpu select-none',
          className
        )}
        style={{
          transform: transformStyleString,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 100ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
            : `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
          ...style,
        }}
        {...props}
      >
        {/* Inner Content with 3D Depth Layering */}
        <div
          className="w-full h-full"
          style={{
            transform: depth > 0 && isInteractionActive ? `translateZ(${depth}px)` : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>

        {/* Specular Sheen Glare Overlay */}
        {glare && isInteractionActive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: isHovered ? glareMaxOpacity : 0,
              background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(208, 188, 255, 0.35) 0%, rgba(123, 208, 255, 0.18) 35%, transparent 75%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';
