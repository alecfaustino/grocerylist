-- Create ENUM type
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'member');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Table: users
CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: households
CREATE TABLE households (
  household_id BIGSERIAL PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: lists
CREATE TABLE lists (
  list_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT,
  household_id BIGINT,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE CASCADE,
  CHECK (
    (user_id IS NOT NULL AND household_id IS NULL) OR
    (user_id IS NULL AND household_id IS NOT NULL)
  )
);

-- Table: household_users
CREATE TABLE household_users (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  household_id BIGINT NOT NULL,
  role user_role NOT NULL DEFAULT 'member',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE CASCADE,
  UNIQUE (user_id, household_id)
);

-- Table: departments
CREATE TABLE departments (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Table: stores
CREATE TABLE stores (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX unique_store_name ON stores (LOWER(name));


-- Table: items
CREATE TABLE items (
  item_id BIGSERIAL PRIMARY KEY,
  list_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  photo_url TEXT,
  department_id BIGINT,
  store_id BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (list_id) REFERENCES lists(list_id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);
