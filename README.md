# Project AIgnite: Educators Hub

This is the central technical platform for **Project AIgnite**, designed to provide AI literacy resources, prompt banks, and support for Filipino educators.

## Current State (v1.2 - 2026-04-30)

The project is now a functional **Digital Atelier** and **Administrative Hub**:

*   **Authentication & Roles:** Firebase Auth is live with **Custom Claims** for Admin roles.
*   **Educators Hub:** Located at `projects/project_aignite/educator-hub`.
*   **Curated Intelligence:** News briefings migrated from static JSON to the `aignite` Firestore database instance.
*   **Admin Dashboard:** Secure `/admin` route live for Zen, featuring:
    *   **Inquiry Inbox:** Real-time stream of teacher inquiries with Firestore-backed persistence.
    *   **News Management:** CRUD operations for the news stream.
    *   **User Management:** Real-time searchable list of all registered teachers.
*   **Backend Infrastructure:** Firebase Admin SDK integrated with secure `service-account.json` (git-ignored) for elevated operations.
*   **Prompt Lab:** A scholarly tool for educators to transform lesson objectives into ethical, DepEd-compliant prompts (Assistive, Administrative, Creative).
*   **Mastery System:** Persistent level and rank system for users.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
