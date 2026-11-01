# Sri Sairam Kids Play School - Alphabet Learning Portal

An interactive alphabet handwriting learning web application for young children. Students learn to form and write all 26 lowercase (`a` – `z`) and 26 uppercase (`A` – `Z`) English letters using draggable handwriting patterns.

Developed for **Sri Sairam Kids Play School** (*"we make your child genius"*).

---

## 🌟 Key Features

- **Accurate Handwriting Reference Outlines**: All 52 letters strictly follow standard stroke order and handwriting geometries.
- **Stroke-by-Stroke Pattern Construction**: Letters are constructed from fundamental handwriting patterns:
  - **`Standing Line`** (Vertical stroke)
  - **`Sleeping Line`** (Horizontal stroke)
  - **`Crossing Line`** (Slanting/diagonal stroke)
  - **`Curve`** (Curved/arc stroke)
  - **`Dot`** (Circular point mark)
- **Dynamic Aligned Pattern Previews**: Each pattern option card dynamically aligns with the exact shape, angle, and curvature of the stroke for that letter.
- **Dual-Mode Child-Friendly Interaction**:
  - **Drag & Drop**: Smooth pointer dragging with floating preview and automatic snap-to-target.
  - **Tap-to-Place**: Perfect for younger children on touchscreens or with developing motor skills.
- **Real-Time Visual & Audio Feedback**:
  - Dotted letter tracks with numbered stroke badges (`1`, `2`, `3`, `4`) indicating starting positions.
  - Completed strokes snap and turn solid vibrant green (`#22c55e`).
  - Web Audio API sound synthesis (pickup pop, snap chime, celebratory fanfare, and speech pronunciation).
- **Desktop & Laptop Optimized**:
  - Full viewport utilization without awkward vertical overflow or cut-offs.
  - Clean rectangular buttons (`rounded-none`) with dedicated spacing.
- **Local Progress Persistence**: Tracks completed letters in `localStorage`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/Bhavithran-BK/SSRK-alphabet.git
cd SSRK-alphabet
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The production output will be generated in the `dist/` directory.

---

## 🛠️ Technology Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion**
- **SVG Paths & Geometry Engine**
- **Web Audio API & SpeechSynthesis API**

---

## 🏫 School Information

**Sri Sairam Kids Play School**  
*we make your child genius*
