# Project AIgnite: Educator Hub - Current State (v1.5.0)
*Last Updated: 2026-05-11*

## 1. Overview & Vision
The **Educator Hub** is the central technical platform for Project AIgnite, a "Digital Atelier" designed to empower Filipino educators with AI literacy. It balances institutional authority with the proactive warmth of a wellness coach, moving away from "Big Tech" aesthetics toward a curated, editorial experience.

## 2. Technical Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Backend:** Firebase (Firestore, Auth, Storage, Hosting)
- **Styling:** Tailwind CSS + Vanilla CSS (Design System Tokens)
- **Engine:** Node.js (Bulk Inquiry Processing)
- **SEO/Metadata:** Comprehensive metadata, OpenGraph, Twitter Cards, Sitemap, and JSON-LD Structured Data.

## 3. Design System: "The Scholarly Mentor"
The UI adheres to a strict design language defined in `AGENTS.md`:
- **Philosophy:** Tonal Layering (No-Line Rule) instead of rigid borders.
- **Palette:** Deep Teals (`primary`), Amber Accents (`tertiary`), and off-white surfaces.
- **Typography:** 
  - `notoSerif`: Authoritative Display & Headlines.
  - `manrope`: Approachable Body & Titles.
- **Components:** High-radius corners (`xl: 1.5rem`), glassmorphism on navigation, and ambient shadows.

## 4. Key Architectural Patterns
### 📡 Pulse Messaging (v1.2)
An asynchronous "Batch-Processed Dead-Drop" model, now optimized for background activity:
- **Persistent Listeners:** The `InquiryForm` remains mounted while the widget is minimized, ensuring active Firestore listeners receive AI/Admin responses in the background.
- **Background Notifications:** A visual "pulse" indicator notifies users of new messages while the widget is closed.
- **Live Pulse Timer:** A synchronized countdown timer that strictly follows the server-side `processed` status.
- **Lanes:**
  - **Fast Lane (Rank 3-5):** AI auto-responds to general/sales inquiries.
  - **Expert Lane (Rank 1-2):** High-leverage institutional pings flagged for human review (Zen).

## 5. Active Modules
- **Admin Dashboard (`/admin`):**
  - **Inquiry Inbox:** Real-time stream with threaded replies, ranking, and **Archive/Delete** controls.
  - **News Management:** CRUD operations for the hub's briefing stream + **RSS Feed** generator.
  - **Resource Management:** CRUD operations for the Resource Hub with Storage integration.
  - **User Management:** Searchable teacher database.
- **SEO & Discoverability:**
  - **Automated Sitemap:** `sitemap.ts` generates fresh URLs for all pages.
  - **Social Sharing:** High-resolution OpenGraph cards for the "AI in the Classroom" ebook.
  - **Compliance:** `robots.ts` with explicit AI training opt-outs (GPTBot, CCBot, etc.).

## 6. Project Status
- **Current Version:** v1.5.0
- **Deployment:** Production-ready on Google App Hosting / Firebase.
- **Recent Progress:** 
  - **SEO Audit Mastery:** Implemented comprehensive OpenGraph tags, Twitter cards, and structured data (WebSite/Product).
  - **Security Hardening:** Configured `next.config.js` with `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`.
  - **Background Heartbeat:** Refactored `ChatWidget.tsx` to maintain active message listeners even when minimized.
  - **Admin Inbox 2.0:** Added Archive/Delete functionality and tabbed filtering (Active/Archived) for teacher inquiries.
  - **Performance:** Resolved LCP issues by adding `priority` loading to critical hero images.
  - **Branding:** Replaced default Next.js assets with a custom-designed premium favicon system.
