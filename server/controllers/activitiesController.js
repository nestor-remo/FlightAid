import { pool } from '../config/database.js'

const getActivities = async (req, res) => {
    const { trip_id } = req.query;
  console.log("trip_id received:", trip_id);

  try {
    const result = await pool.query(
      'SELECT * FROM activities WHERE trip_id = $1 ORDER BY id DESC',
      [trip_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching activities:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
const createActivity = async (req, res) => {
    const { trip_id, name, type, location, notes, image_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO activities (trip_id, name, type, location, notes, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [trip_id, name, type, location, notes || '', image_url || '']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
};

const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM activities WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
}

export const addActivitiesBulk = async (req, res) => {
    const { activities } = req.body;
  
    try {
      const insertPromises = activities.map((a) => {
        return pool.query(
          `INSERT INTO activities (trip_id, name, type, location, notes, image_url)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [a.trip_id, a.name, a.type, a.location, a.notes || '', a.image_url || '']
        );
      });
  
      await Promise.all(insertPromises);
      res.status(201).json({ message: 'Activities added' });
    } catch (err) {
      console.error('Bulk insert error:', err.message);
      res.status(500).json({ message: 'Bulk insert failed' });
    }
  };
  

export default {
    getActivities,
    createActivity,
    deleteActivity,
    addActivitiesBulk
}