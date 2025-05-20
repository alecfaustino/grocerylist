CREATE DATABASE grocerylist;

CREATE TABLE Users (
  user_id BIGINT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE Households (
  household_id BIGINT PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE lists (
  list_id BIGINT PRIMARY KEY,
  user_id BIGINT,
  household_id BIGINT,
  name VARCHAR(255),
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (household_id) REFERENCES Households(household_id)
);

CREATE TABLE household_users (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  household_id BIGINT,
  role VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (household_id) REFERENCES Households(household_id)
);

CREATE TABLE Departments (
  id BIGINT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE stores (
  id BIGINT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE items (
  item_id BIGINT PRIMARY KEY,
  list_id BIGINT,
  name VARCHAR(255),
  quantity INT,
  photo_url TEXT,
  department_id BIGINT,
  store_id BIGINT,
  created_at TIMESTAMP,
  FOREIGN KEY (list_id) REFERENCES lists(list_id),
  FOREIGN KEY (department_id) REFERENCES Departments(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);
