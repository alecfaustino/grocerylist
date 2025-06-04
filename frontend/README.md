### User Stories

- [x] Users can create an account
- [x] Users have access to their personal list
- [ ] Users can join households to see household list
- [ ] Users can add, delete, remove, edit list items in personal OR household
- [ ] Users can switch between households / personal lists
- [x] A list item can hold an item name
- [x] A list item can hold quantity to purchase

- [x] A list item can select department
- [ ] A household admin can invite users
- [ ] A household admin can remove users

#### Stretch Goal Features

- [x] A list can holdstore information
- [ ] A list item can hold a photo of the item (Stretch - not sure how this works with free db)(Cloudinary?)
- [ ] A list item can be sorted by Store AND/OR department

#### Very Advanced Stretch Goal

-[ ] Recipe suggestions based on items in the cart

- [ ] Consume an API

### Phase 1: Setup & DB

- [x] Create ERD
- [x] Create DB and Tables
- [x] Connect DB to server (set up pool and connect)
- [x] Require pool in server file

### Phase 2: Core List Routes

- [x] Routes for List Items:

  - [x] Create (POST)
  - [x] Read (GET)
  - [x] Update (PUT/PATCH)
  - [x] Delete (DELETE)

- [x] Bare minimum UI to display list (no CSS yet)

### Phase 3: User Auth

- [ ] Auth Routes:
  - [x] Register
  - [x] Login
  - [x] Logout (optional session clear)
  - [x] Session based or token-based auth
  - [x] Middleware to protect routes
- [x] UI for Register / Login

### Updated 1 June 2025: Phase 3.5 View to show all lists

- [x] Dashboard UI:

  - [x] My Personal Lists: User owned lists
  - [x] Update the routes in app.jsx (comment in list.jsx)
  - [ ] My Household Lists: with Phase 4

- [x] Add List
- [x] Delete List
- [ ] Edit List

### Phase 4: Household Features

- [ ] Household Routes:

  - [ ] Create household
  - [ ] Read household info
  - [ ] Update household
  - [ ] Delete household
  - [ ] Add/remove users to household
  - [ ] Admin-only protection (middleware)

- [ ] Switch views feature

  - [ ] Drop down or toggle

- [ ] UI for household actions

### Phase 5: Admin Privileges

- [ ] Restrict household management to admins only
- [ ] Protect routes (middleware to check admin/user roles)

### Phase 6: Nice-to-Haves

- [ ] Sorting list items by store/department
- [ ] File/photo uploads or image URLs
- [ ] Consume an API (e.g., recipe suggestion API)

### To Research

- [ ] React Router
- [ ] Protected Routes React (Private Route)
- [ ]
