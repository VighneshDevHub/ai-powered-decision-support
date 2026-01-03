# Style Guide & Theme Integration

## Overview
This project uses **Tailwind CSS v4** with a custom theme configuration. The design system focuses on a clean, modern aesthetic with support for both Light and Dark modes.

## Color Palette

### Primary Colors
- **Blue**: Used for primary actions, gradients, and accents.
  - Light Mode: `blue-600` (Primary), `blue-500` (Hover)
  - Dark Mode: `blue-500` (Primary), `blue-400` (Text/Accents)
- **Violet**: Used in gradients with Blue.
  - Gradient: `from-blue-600 to-violet-600`

### Neutral Colors
- **Background**:
  - Light Mode: `#fafafa` (Main), `white` (Cards/Modals)
  - Dark Mode: `#030303` (Main), `black/60` (Cards/Modals)
- **Foreground**:
  - Light Mode: `#171717` (Text), `gray-950` (Headings)
  - Dark Mode: `#ededed` (Text), `white` (Headings)

## Components

### Login Popup
The `LoginPopup` component has been integrated with the following theme mappings:

| Element | Original (Copied) | Integrated (Current Theme) |
|---------|-------------------|----------------------------|
| **Accent Color** | Lime Green (`#d4ff4a`) | Blue (`blue-500` / `blue-600`) |
| **Secondary Accent** | Dark Olive (`#4d6106`) | Dark Blue (`blue-600` / `blue-800`) |
| **Gradients** | Lime to White | Blue to Violet (`from-blue-600 via-blue-400 to-violet-600`) |
| **Shadows** | Lime glow | Blue glow (`shadow-blue-500/25`) |

### Typography
- **Font Family**: Geist Sans (`var(--font-geist-sans)`), Geist Mono (`var(--font-geist-mono)`)
- **Headings**: `font-[1000]`, `tracking-tighter`, `uppercase`
- **Labels**: `font-black`, `uppercase`, `tracking-[0.2em]`

## Integration Notes
- The `LoginPopup` is fully responsive and supports `isDarkMode` prop.
- Authentication is handled via Clerk (`@clerk/nextjs`).
- OAuth providers (GitHub, Google, Apple) are styled to match the theme.
