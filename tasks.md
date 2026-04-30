# Task: Educator Hub News Migration & Admin Interface

## Phase 1: Firestore News Collection & Admin UI
- [ ] Define Firestore structure for `news` collection.
- [ ] Create simple Admin Panel component to manage news (CRUD).
- [ ] Implement `fetchNews` hook/utility using Firebase SDK.

## Phase 2: Refactor CuratedNews Component
- [ ] Update `CuratedNews.tsx` to fetch from Firestore instead of JSON.
- [ ] Add loading/error states for dynamic data.

## Phase 3: User Management Interface
- [ ] Create Admin Panel section to view registered users (assuming `users` collection in Firestore).
- [ ] Add basic search/filtering for user list.

## Phase 4: Integration & Testing
- [ ] Verify Firestore security rules (read for all, write for admin/Zen).
- [ ] Final UI test in Educator Hub dev server.
