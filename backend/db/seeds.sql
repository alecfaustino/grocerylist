-- Users
INSERT INTO users (name, email, password_hash)
VALUES 
  ('Alice Smith', 'alice@example.com', 'hashed_pw_1'),
  ('Bob Johnson', 'bob@example.com', 'hashed_pw_2'),
  ('Carol Lee', 'carol@example.com', 'hashed_pw_3');

-- Households
INSERT INTO households (address)
VALUES 
  ('123 Maple Street'),
  ('456 Oak Avenue');

-- Household Users
INSERT INTO household_users (user_id, household_id, role)
VALUES 
  (1, 1, 'admin'),
  (2, 1, 'member'),
  (3, 2, 'admin');

-- Lists
INSERT INTO lists (user_id, name)
VALUES 
  (1, 'Alice’s Personal List');

INSERT INTO lists (household_id, name)
VALUES 
  (1, 'Family Grocery List'),
  (2, 'Carol’s Household List');

-- Departments
INSERT INTO departments (name)
VALUES 
  ('Produce'),
  ('Dairy'),
  ('Bakery'),
  ('Meat'),
  ('Frozen Foods');

-- Stores
INSERT INTO stores (name)
VALUES 
  ('Costco'),
  ('SuperStore'),
  ('Lucky');

-- Items
INSERT INTO items (list_id, name, quantity, department_id, store_id)
VALUES 
  (1, 'Apples', 6, 1, 1),
  (1, 'Milk', 1, 2, 2),
  (2, 'Bread', 2, 3, 1),
  (2, 'Chicken Breast', 1, 4, 1),
  (3, 'Frozen Pizza', 3, 5, 3);
