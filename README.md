# Project AIgnite: Educators Hub

This is the central technical platform for **Project AIgnite**, designed to provide AI literacy resources, prompt banks, and support for Filipino educators.

## Current State

The project is now a functional **Digital Atelier**:

*   **Authentication:** Firebase Auth is live. Users can log in with Google to access the Prompt Lab.
*   **Prompt Lab:** A scholarly tool for educators to transform lesson objectives into ethical, DepEd-compliant prompts (Assistive, Administrative, Creative).
*   **Database:** Firestore integration ready for "My Library" curation (persisting saved prompts).
*   **Storage:** Firebase Storage active for media and document hosting.
*   **Curated News:** Automated daily news briefing section on the homepage.

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
