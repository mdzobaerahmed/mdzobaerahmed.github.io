# JD // Code + Lens — Software Engineer & Photographer Portfolio

A modern, minimalist portfolio for a computer science engineer and photographer using a split-identity layout that balances clean, code-inspired typography with high-impact visual imagery.

## 🚀 Key Highlights & Architectural Features

- **Split-Identity Layout**: Seamlessly bridges low-level distributed systems engineering with high-contrast monochrome street and landscape photography.
- **Dual Focus Switcher**: Switch dynamically between `Combined`, `Code` (Engineering only), and `Lens` (Photography only) views.
- **Monochrome & Amber Palette**: Built on dark slate (`#0B0F17`) and crisp pearl (`#FAFAFA`) canvases accented by warm amber highlights.
- **Interactive Terminal HUD Card**: Displays live git commit status (`#a8f3d1b`), uptime benchmarks, lens specs, and an interactive command-line interface supporting commands (`help`, `git`, `stack`, `exif`, `stats`, `clear`).
- **Engineering Bento Grid**: Top distributed systems projects featuring problem statements, architectural solutions, performance benchmarks (<1.4ms p99 latency, zero-copy buffer allocations), and interactive **Architecture Deep Dive** modals with code snippets.
- **Photography Gallery with EXIF HUD**: Curated photo series with category filtering (Street, Landscape, Architecture, Portrait) and a full-screen Lightbox with camera metadata HUD (shutter speed, aperture, ISO, Leica/Fujifilm glass, film recipes, and GPS coordinates).
- **About & Gear Breakdown**: Side-by-side terminal & darkroom breakdown comparing Linux/Neovim/Rust dev toolchains against Leica/Fuji rangefinders and prime optics.
- **Footer with Live Local Clock**: Real-time ticking station clock formatted for Dhaka, BD (UTC+6), one-click clipboard email copy, and social links.

## 🛠️ Quick Start

```bash
# Navigate to the project directory
cd portfolio-cs-lens

# Install dependencies (already installed)
npm install

# Start local development server with Hot Module Replacement
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
portfolio-cs-lens/
├── dist/                     # Optimized static production build
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navigation, logo, mode toggle, focus switcher
│   │   ├── Hero.jsx          # Headline, metrics ribbon, viewfinder photo anchor
│   │   ├── TerminalCard.jsx  # Floating terminal with live git & interactive shell
│   │   ├── EngineeringSection.jsx # Bento grid, tech badges, deep dive trigger
│   │   ├── ProjectModal.jsx  # Architecture modal with code & benchmark specs
│   │   ├── PhotographyGallery.jsx # Edge-to-edge photo gallery with category tabs
│   │   ├── LightboxModal.jsx # Fullscreen EXIF HUD lightbox with keyboard nav
│   │   ├── AboutSection.jsx  # Dual narrative bio, timeline & tabbed gear list
│   │   ├── Footer.jsx        # CTA, email copy, live local clock, social links
│   │   └── Icons.jsx         # Custom SVG brand & platform icons
│   ├── data/
│   │   └── portfolioData.js  # Configurable profile, projects, photos, and gear
│   ├── App.jsx               # Main application container & theme state
│   ├── index.css             # Tailwind directives, film grain, and code aesthetics
│   └── main.jsx              # Application entry point
├── index.html                # HTML entry point with preconnected fonts
├── tailwind.config.js        # Theme, colors, and typography configuration
└── vite.config.js            # Vite bundler configuration
```
