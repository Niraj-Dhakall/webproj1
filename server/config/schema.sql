CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  game VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image TEXT,
  major_wins TEXT[]
);