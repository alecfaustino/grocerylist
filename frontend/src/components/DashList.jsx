import React from "react";

const DashList = ({ listId, householdId, name }) => {
  /* CREATE TABLE lists (
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
); */
  return (
    <div>
      <p>{name}</p>
      <p>id: {listId}</p>
    </div>
  );
};

export default DashList;
