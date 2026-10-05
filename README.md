# StreamFlix OTT Platform (V2)

A production-ready, Netflix-authentic Hybrid OTT Web Platform & Progressive Web App (PWA) built with Vite, React 18, and Tailwind CSS.

## Features
- **Authentic Netflix Design System**:
  - Onyx dark canvas (`#141414`), Netflix red accents (`#E50914`), and frosted glass blur.
  - 4K dynamic Billboard Hero banner with bottom vignette fade.
  - Horizontal category rows with smooth `hover:scale-105` micro-interactions.
- **Dual-Engine Experience**:
  - **Watch Online**: Ad-free multi-server streaming fleet (2Embed, AutoEmbed, VidSrc) with instant failover.
  - **Save Offline**: VegaMovies verified 10Gbps CDN download gateways (4K, 1080p, 720p, 480p, Hindi Dual Audio).
  - **Telegram Relay**: Direct 1-click sharing to `@MaltiMuvesbot`.
- **Zero-Crash Architecture**:
  - Pure React reactive state (no manual `document.getElementById` or `innerHTML` string injection).
  - High-performance, lean build suitable for dual-core and low-RAM environments.
- **24/7 Cloud Independence**:
  - Deployable to Vercel Serverless Edge with zero dependency on the local developer machine.
