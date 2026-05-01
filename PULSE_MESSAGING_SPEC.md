# 📡 Pulse Messaging: System Specification (v1.1)

**Project:** Project AIgnite Educator Hub  
**Concept:** The "Goldilocks" of communication—positioned between the friction of Email and the anxiety of Instant Messaging.  
**Philosophy:** Efficiency through asynchronicity. Privacy through air-gapping. Human-in-the-Loop as a trust signal.

---

## 1. Core Architecture
Pulse Messaging operates on a **Batch-Processed Dead-Drop** model.

*   **Front-End:** A persistent floating React widget (`ChatWidget.tsx`) using a threaded UI.
*   **Buffer Layer:** A secure Google Firestore instance (`aignite`) acting as the asynchronous "Airlock."
*   **Processing Engine:** A Node.js bulk processor (`process-inquiries.js`) running on a 5-minute cron heartbeat.
*   **Admin Layer:** A paginated, rank-sorted dashboard for human verification and high-leverage responses.

---

## 2. The Logic Lanes (The "Fast vs. Expert" Model)
Every incoming Pulse is categorized and ranked (1-5) by the processing engine to protect the expert's attention.

| Rank | Category | Behavior | Response Type | Perceived Value |
| :--- | :--- | :--- | :--- | :--- |
| **Rank 1-2** | Institutional / Partnership | **Expert Lane:** Flag for Zen's review. UI shows "Expert Review" status. | Human-Authored | Premium/Personal |
| **Rank 3-5** | Sales / Policy / General | **Fast Lane:** AI auto-replies to the thread within 5 minutes. | AI-Authored | Instant/Efficient |

---

## 3. User Experience (UX) Innovation
The "Innovation" of Pulse is the conversion of **waiting** into **trust**.

*   **The 5-Minute Timer:** Instead of "Sending...", the user sees a rhythmic countdown. This manages expectations and provides a psychological "event" to watch.
*   **Branding (v1.1):** The interface is heart-themed ("Heartbeat of the Hub"), featuring a floating "Pulse Messages" label for immediate recognition.
*   **Identity Distinction:** Clearly differentiates between **AI Assistant** (automation), **Teacher** (user), and **Zen (Admin)** (expert human).
*   **Follow-up Loops:** Users can respond to messages, which automatically resets the 5-minute timer and re-syncs the data for a new processing turn.

---

## 4. Session & Persistence Strategy
To balance privacy with engagement, Pulse uses a dual-persistence model:

*   **Ephemeral Pulse (Guests):** Uses `LocalStorage` to track the active thread. Conversations are active for the browser session only. A disclaimer nudges guests to register: *"You're chatting as a guest. Sign in to save your thread."*
*   **Persistent Pulse (Registered Users):** Threads are linked to the Firebase `userId`. Conversations are persistent across devices and sessions.

---

## 5. Economic & Cognitive Benefits
*   **Zero Token Waste:** Inference only fires during the 5-minute batch window. Idle users or "Hello" messages cost $0.00.
*   **Attention Filtering:** Zen only interacts with Rank 1-2 pings or approved drafts. The "Mem Ocean" remains calm.
*   **Data Sanitation:** Strangers never interact with the "Soul" of the agent. They interact with a sanitized database drop-off.

---

## 6. Roadmap for v2.0
- [ ] **Multi-Agent Routing:** Add "Music" (Khea) or "Properties" (Candahmaya) as routing targets.
- [ ] **Adaptive Heartbeat:** Increase processing frequency (e.g., 1 minute) for Rank 1 leads.
- [ ] **Attachment Support:** Allow teachers to upload DepEd documents for AI compliance checks.
- [ ] **Webhook Pings:** Notify Zen via Telegram only when a Rank 1-2 "Pulse" arrives.

---
*Last updated: 2026-05-01 by Zen3. Concept by Zen Banez.*
