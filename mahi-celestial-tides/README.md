# MAHI — Celestial Tides

A cinematic, recruiter-friendly portfolio for Mahi, built with **React 18, Vite 5, TypeScript, React Three Fiber, Three.js, Framer Motion, Tailwind CSS and Lenis**. Scroll advances a continuous ocean / sun / moon / starlight narrative. All sections remain normal accessible HTML, and the WebGL background is decorative.

## Run on Mac / Windows

```bash
npm install
npm run typecheck
npm run dev
```

Open the local URL shown by Vite (normally http://localhost:5173/).

## Production

```bash
npm run build
npm run preview
```

On **Vercel**, import the GitHub repository. Set Framework to **Vite**, build command to `npm run build`, output to `dist` and install to `npm install`.

## Update details

All profile content, education, projects, live demo links, skills, achievements and social profiles live in **`src/data/content.ts`**.

**Before publishing:**
- Mahi's GitHub and LinkedIn URLs were not supplied. Set `mahi.github` and `mahi.linkedin` to the correct URLs once verified. The site hides those actions until provided.
- Individual project source repository URLs were not supplied; set each `repo` field after verification.
- The contact form opens the visitor's email client; it does not transmit to a server. To receive messages inside the website, add a Formspree/Resend endpoint and anti-spam protections.
- The email address and telephone number in this project come from Mahi's supplied resume. Confirm they are intended to be public.
- The supplied PDF is available at `/mahi-resume.pdf` and the uploaded portrait at `/mahi-portrait.webp`.
- For an absolute SEO sitemap, add your final Vercel domain after publishing.

## Accessibility/performance

- Respects `prefers-reduced-motion` and has a pause animation button.
- React-based content remains navigable even if the optional WebGL background fails.
- Caps renderer device pixel ratio, uses fewer mesh subdivisions on mobile, avoids heavy postprocessing, and lazy-loads the About photo.
- Buttons, filters, navigation and the project detail modal are keyboard accessible. The contact form relies on the user's mail app.

## Note on sources

The project and academic details are from Mahi's uploaded resume. The solar/ocean/AI styling is an original interpretation of the supplied visual references. No fictional employment or measurements are used.

## Ocean cinematography update (v2)

This edition blends the original procedurally animated 3D ocean with **two lightweight, locally hosted wave-video loops** (`public/ocean-golden.mp4` and `public/ocean-blue.mp4`) derived from the user-supplied ocean footage. The videos are silent and optimized for web delivery (together approximately 1 MB); no external video host is required at runtime. A scroll-controlled sky moves the sun smoothly from the dawn horizon to noon, then back beneath the horizon as the moon rises, while the ocean color and reflection transition from warm gold to sea blue to lunar silver. Videos stop when animation is paused or the page is hidden. The 3D procedural ocean remains visible if video playback is blocked.

Visual references: Pexels tropical beach sunset (32800729) and Pixabay ocean waves sunset (207751). Confirm license terms applicable to your intended usage before commercial redistribution of the source footage.
