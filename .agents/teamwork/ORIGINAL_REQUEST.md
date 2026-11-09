# Original User Request

## Initial Request — 2026-11-05T19:21:00Z

Executive portfolio showcase for Islam Samy, elevating the overall design, user experience, animations, and semantic structure across his executive portfolio, engineering blog, dual booking system, and admin command center.

Working directory: c:\Users\Eslam\Desktop\islamweb
Integrity mode: demo
The team must NOT: read test source code to understand expected behaviour before implementing

## Requirements

### R1. Visual Design & Semantic Structure Overhaul
Elevate the visual design, typography, spacing, micro-interactions, and layout across all routes (`/`, `/projects`, `/blog`, `/book`, `/my-bookings`, `/admin/*`) using shadcn UI and Radix UI primitives. Ensure all pages have clean, accessible, and semantic HTML5 structure.

### R2. Modern Cybernetic Header & Navigation
Enhance the header with active route tracking, a responsive mobile navigation drawer, quick actions, and status indicators.

### R3. Interactive 3D & Canvas Effects and Animations
Incorporate interactive Canvas / Three.js effects (including particle mesh, cybernetic canvas, and 3D tilt interactions) and Framer Motion choreography to make the website feel live while maintaining smooth performance.

### R4. Complete Light and Dark Mode Support
Implement a seamless theme switcher with dedicated design tokens for both a futuristic dark cybernetic mode and a clean, crisp high-contrast light mode.

## Acceptance Criteria

### Navigation & Theme
- [ ] Header includes active route tracking indicator, mobile drawer navigation, quick action buttons, and status indicator.
- [ ] Theme switcher toggles between dark cybernetic mode and high-contrast light mode without hydration errors or unstyled flash.

### Visual Effects & Interactivity
- [ ] Interactive Canvas or Three.js visual elements (particle mesh, cybernetic canvas, 3D tilt interactions) are rendered and respond to user interactions.
- [ ] Framer Motion animations run smoothly across key view transitions and interactive elements.

### Verification & Code Standards
- [ ] All routes (`/`, `/projects`, `/blog`, `/book`, `/my-bookings`, `/admin/*`) render without runtime exceptions or console errors.
- [ ] `npm run build` completes successfully with zero type or build errors.

