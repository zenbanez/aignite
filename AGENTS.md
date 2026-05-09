<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Design System Document: The Scholarly Mentor
1. Overview & Creative North Star: "The Digital Atelier"
This design system moves away from the cold, clinical aesthetic of "Big Tech" AI and toward the curated, tactile feeling of a modern educator's studio. Our Creative North Star is The Digital Atelier.
We reject the "boxed-in" layout of traditional dashboards. Instead, we embrace high-end editorial layouts characterized by intentional asymmetry, layered depth, and breathable white space. This system balances the institutional authority of a premier educational body with the soothing, proactive warmth of a wellness coach. We don't just provide tools; we provide a sanctuary for professional growth.
---
2. Colors: Depth Over Definition
The palette is rooted in deep, intellectual teals and balanced by the "Golden Glow" of our tertiary amber, creating a sense of "enlightened education."
The "No-Line" Rule
Borders are prohibited for sectioning. To create separation, use background color shifts. A `surface-container-low` section should sit directly against a `surface` background. This creates a sophisticated, "magazine-style" flow that feels organic rather than rigid.
Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper.
Base: `surface` (#f9f9f8) for the main canvas.
Structural Sections: `surface-container-low` (#f4f4f3) for secondary content areas.
Interactive Cards: `surface-container-lowest` (#ffffff) to provide the highest contrast and "pop" against the background.
Active Overlays: `surface-bright` for elements that need to feel "closer" to the user.
The Glass & Gradient Rule
To evoke a premium feel, use Glassmorphism for navigation bars and floating action panels.
Formula: `surface` color at 70% opacity + `backdrop-filter: blur(20px)`.
Signature Textures: For Hero sections and primary CTAs, use a subtle linear gradient from `primary` (#00464a) to `primary_container` (#006064) at a 135-degree angle. This adds "soul" and depth that flat hex codes cannot replicate.
---
3. Typography: The Editorial Voice
Our typography creates a dialogue between tradition (`notoSerif`) and progress (`manrope`).
Display & Headlines (notoSerif): Used for large, authoritative statements. The serif typeface conveys the weight of an established institution. Use `display-lg` for hero moments to establish immediate prestige.
Body & Titles (manrope): The sans-serif geometric face provides modern clarity. It is the "approachable coach" answering the teacher's questions.
Hierarchy Note: Always pair a `headline-lg` in Noto Serif with a `body-lg` in Manrope. The contrast in "voice" mimics a respected professor giving personalized, friendly advice.
---
4. Elevation & Depth: Tonal Layering
We move away from the "shadow-heavy" Material Design of the past. Depth is achieved through Tonal Layering.
The Layering Principle: Instead of a shadow, place a `surface-container-lowest` card on top of a `surface-container` background. The subtle shift in hex value provides enough visual affordance for the eye without cluttering the UI.
Ambient Shadows: Use only for floating elements (e.g., Modals).
Shadow Specs: `0px 20px 40px rgba(26, 28, 28, 0.06)`. Note the 6% opacity—it should feel like an ambient glow, not a dark smudge.
The "Ghost Border" Fallback: If a divider is mandatory for accessibility, use `outline-variant` (#bec8c9) at 15% opacity. Anything higher is too aggressive for this system.
---
5. Components: Soft Structure
Buttons
Primary: Gradient of `primary` to `primary_container`. Corner radius: `md` (0.75rem). Text should be `label-md` uppercase with slight letter spacing for a premium feel.
Tertiary (The "Amber Accent"): Use `tertiary_fixed` (#ffdeac) with `on_tertiary_fixed` text for supportive actions (e.g., "Get Help," "Coach Notes"). This warm amber acts as the "Wellness" beacon.
Cards & Lists
Strict Rule: No dividers. Use `md` (0.75rem) or `lg` (1rem) vertical spacing to separate list items.
Layout: Cards should use the `xl` (1.5rem) corner radius to feel "soft" and approachable, contrasting with the sharp, authoritative typography within.
Input Fields
Styling: Use `surface-container-highest` as the fill color. No bottom line. Use a `sm` (0.25rem) radius. When focused, use a 2px "Ghost Border" of `primary` at 40% opacity.
Featured Component: "The Insight Module"
A bespoke component for AI-generated tips for teachers.
Style: `surface-container-lowest` background, `xl` corner radius, with a 4px left-accent bar in `tertiary`. This visually highlights the "wellness/support" aspect within the "institutional/professional" framework.
---
6. Do’s and Don’ts
Do:
Embrace Asymmetry: Place a headline on the left and a supportive image slightly offset to the right. It feels "designed," not "templated."
Use Generous Padding: When in doubt, add 16px of extra breathing room. Space is a luxury.
Tint Your Neutrals: Use `surface-variant` instead of pure greys to keep the interface feeling warm and "human."
Don’t:
Don't use 100% Black: Never use #000000. Use `on_surface` (#1a1c1c) for text to maintain a softer, high-end editorial feel.
Don't use "Standard" Corners: Avoid the 4px default. Stick to the `md` (12px) and `xl` (24px) values to ensure the "soft but structured" promise is met.
Don't Box Everything: Let imagery bleed to the edges of containers. It breaks the "grid-prison" feel of standard educational software.