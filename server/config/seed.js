import pool from './database.js';
import teamData from '../data/teams.js';

const seedDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        game VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        image TEXT,
        major_wins TEXT[]
      );
    `);

    await pool.query('TRUNCATE TABLE teams RESTART IDENTITY CASCADE');

    for (const team of teamData) {
      await pool.query(
        `INSERT INTO teams (team_name, game, country, image, major_wins)
         VALUES ($1, $2, $3, $4, $5)`,
        [team.teamName, team.game, team.country, team.image, team.majorWins]
      );
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
