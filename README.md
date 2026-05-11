# Project AIgnite: Educators Hub (v1.5.0)

This is the central technical platform for **Project AIgnite**, a "Digital Atelier" designed to empower Filipino educators with AI-driven pedagogical tools and literacy resources.

## Current State (v1.5.0 - 2026-05-11)

The platform is now production-ready, featuring a high-end editorial layout and a robust event-driven architecture:

### 📡 Pulse Messaging System
*   **Background Heartbeat:** The chat widget maintains active Firestore listeners even when minimized, providing a seamless multi-tasking experience for teachers.
*   **Real-time Notifications:** Pulse-driven visual alerts for new AI/Admin responses.
*   **Batch-Processed Dead-Drop:** Secure airlock for teacher inquiries with automated priority ranking.

### 🛡️ Secure Admin Dashboard
*   **Unified Inbox:** Threaded conversation history with AI-suggested drafts.
*   **Inbox Management:** Complete Archive and Delete functionality for optimal workspace organization.
*   **Dynamic Briefings:** Manage the scholarly news stream and auto-generate RSS feeds.
*   **Resource Hub:** Full CRUD for educational assets with Firebase Storage integration for protected downloads.

### 🚀 SEO & Discovery
*   **Institutional Presence:** Comprehensive Metadata, OpenGraph cards, and Twitter summary tags for social virality.
*   **Crawler Compliance:** Dynamic `sitemap.xml` and `robots.ts` with AI-bot opt-outs.
*   **Rich Snippets:** JSON-LD structured data for WebSite and Product discovery.

### 🎨 Design System: "The Scholarly Mentor"
*   **Aesthetics:** Vibrant teals, golden amber accents, and tonal layering (No-Line Rule).
*   **Typography:** A dialogue between `Noto Serif` (Authority) and `Manrope` (Approachable Body).
*   **Performance:** LCP-optimized hero sections with priority asset loading.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured for deployment on **Google App Hosting / Firebase**. Ensure all `NEXT_PUBLIC_` environment variables are configured in your CI/CD pipeline to be available during the build phase.

---
*Built with ❤️ for Filipino Educators by Project AIgnite.*
