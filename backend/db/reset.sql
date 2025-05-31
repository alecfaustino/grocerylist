-- Drop tables
DROP TABLE IF EXISTS items, lists, household_users, households, users, departments, stores CASCADE;
DROP TYPE IF EXISTS user_role;

-- Include schema and seed
\i db/schema.sql
\i db/seeds.sql

