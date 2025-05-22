### User Stories

- [ ] Users can create an account
- [ ] Users have access to their personal list
- [ ] Users can join households to see household list
- [ ] Users can add, delete, remove, edit list items in personal OR household
- [ ] Users can switch between households / personal lists
- [ ] A list item can hold an item name
- [ ] A list item can hold quantity to purchase

- [ ] A list item can select department
- [ ] A household admin can invite users
- [ ] A household admin can remove users

#### Stretch Goal Features

- [ ] A list can holdstore information
- [ ] A list item can hold a photo of the item (Stretch - not sure how this works with free db)(Cloudinary?)
- [ ] A list item can be sorted by Store AND/OR department

#### Very Advanced Stretch Goal

-[ ] Recipe suggestions based on items in the cart

- [ ] Consume an API

### Phase 1: Setup & DB

- [x] Create ERD
- [x] Create DB and Tables
- [ ] Connect DB to server (set up pool and connect)
- [ ] Require pool in server file

### Phase 2: Core List Routes

- [ ] RESTful Routes for List Items:

  - [ ] Create (POST)
  - [ ] Read (GET)
  - [ ] Update (PUT/PATCH)
  - [ ] Delete (DELETE)

- [ ] Bare minimum UI to display list (no CSS yet)

### Phase 3: User Auth

- [ ] Auth Routes:
  - [ ] Register
  - [ ] Login
  - [ ] Logout (optional session clear)
  - [ ] Session based or token-based auth
  - [ ] Middleware to protect routes
- [ ] UI for Register / Login

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
