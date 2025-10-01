import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teams ORDER BY id');
    const teams = result.rows.map(row => ({
      teamName: row.team_name,
      game: row.game,
      country: row.country,
      image: row.image,
      majorWins: row.major_wins
    }));
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
})


router.get('/:teamName', async (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/team.html'))
})

export default router