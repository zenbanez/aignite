# Project AIgnite: Educator Hub - Current State (v1.2)
*Last Updated: 2026-05-09*

## 1. Overview & Vision
The **Educator Hub** is the central technical platform for Project AIgnite, a "Digital Atelier" designed to empower Filipino educators with AI literacy. It balances institutional authority with the proactive warmth of a wellness coach, moving away from "Big Tech" aesthetics toward a curated, editorial experience.

## 2. Technical Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Backend:** Firebase (Firestore, Auth, Hosting)
- **Styling:** Tailwind CSS + Vanilla CSS (Design System Tokens)
- **Engine:** Node.js (Bulk Inquiry Processing)
- **Auth:** Firebase Auth with Custom Claims for Admin/User roles.

## 3. Design System: "The Scholarly Mentor"
The UI adheres to a strict design language defined in `AGENTS.md`:
- **Philosophy:** Tonal Layering (No-Line Rule) instead of rigid borders.
- **Palette:** Deep Teals (`primary`), Amber Accents (`tertiary`), and off-white surfaces.
- **Typography:** 
  - `notoSerif`: Authoritative Display & Headlines.
  - `manrope`: Approachable Body & Titles.
- **Components:** High-radius corners (`xl: 1.5rem`), glassmorphism on navigation, and ambient shadows.

## 4. Key Architectural Patterns
### 📡 Pulse Messaging (v1.1)
An asynchronous "Batch-Processed Dead-Drop" model:
- **Dead-Drop:** Inquiries are buffered in a Firestore "Airlock."
- **Heartbeat:** A `process-inquiries.js` script runs on a 5-minute cron/trigger.
- **Lanes:**
  - **Fast Lane (Rank 3-5):** AI auto-responds to general/sales inquiries.
  - **Expert Lane (Rank 1-2):** High-leverage institutional pings flagged for human review (Zen).
- **Outcome:** Zero token waste and protection of the administrator's attention.

## 5. Active Modules
- **Admin Dashboard (`/admin`):**
  - **Inquiry Inbox:** Real-time stream with threaded replies (User/AI/Admin) and ranking.
  - **News Management:** CRUD operations for the hub's briefing stream.
  - **Resource Management:** CRUD operations for the Resource Hub.
  - **User Management:** Searchable teacher database.
- **Prompt Lab:** Tooling for generating DepEd-compliant prompts.
- **Mastery System:** Persistent level/rank gamification for teachers.
- **Curated Intelligence:** Dynamic news feed. Recently refactored to remove silent build-time failures and add robust empty-state handling.
- **Resource Hub:** Now dynamic and manageable via the Admin Panel. Supports **Protected Downloads** (files visible to all, but downloadable only by logged-in users).

## 6. Project Status
- **Current Version:** v1.4.0
- **Deployment:** Live on Google App Hosting / Firebase.
- **Recent Progress:** 
  - Refactored `CuratedNews.tsx`, `NewsPage.tsx`, and `AdminPanel.tsx` to remove aggressive `BUILD-TIME` key checks that were causing silent failures in production.
  - Added "No briefings found" empty states to improve UX when data is missing.
  - Implemented a fully responsive **Navbar** with a mobile hamburger menu and glassmorphism overlay.
  - **Resource Hub Migration:** Migrated hardcoded resources to Firestore and implemented a full CRUD management interface in the Admin Panel.
  - **Protected Downloads:** Integrated Firebase Storage for educational materials. Restricted file access to authenticated users while maintaining public discovery of the hub.
  - Identified potential configuration bottleneck: `NEXT_PUBLIC_` env vars must be available during the production build phase.
