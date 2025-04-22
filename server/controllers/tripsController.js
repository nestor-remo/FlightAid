import { pool } from '../config/database.js'

const createTrip = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    
    try {
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
        const results = await pool.query (
            `INSERT INTO trips (user_id, title, description, img_url, num_days, start_date, end_date, total_cost)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [req.user.id, title, description, img_url, num_days, start_date, end_date, total_cost]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        console.error("Error creating trip:", error.message)
        res.status(409).json({ message: error.message })
    }
}

const getTripsbyUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const results = await pool.query(`SELECT * FROM trips WHERE user_id = $1`,
            [req.user.id]
        )
        res.status(200).json(results.rows)
    } catch(error) {
        res.status(409).json( { error: error.message } )
    }
}

const getTrip = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const userId = req.user.id
    const tripId = req.params.id

    try {
        const results = await pool.query(`SELECT * FROM trips WHERE id = $1 AND user_id = $2`, [tripId, userId])
        res.status(200).json(results.rows[0])
    } catch(error) {
        res.status(409).json( { error: error.message } )
        console.log('Unable to get trip')
        console.log('Error:', error.message)
    }
}

const updateTrip = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const userId = req.user.id
    const tripId = req.params.id

    try {
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
    
        const results = await pool.query(
          `UPDATE trips
          SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost= $7
          WHERE id = $8 AND user_id = $9`,
          [title, description, img_url, num_days, start_date, end_date, total_cost, tripId, userId]
        )
    
        res.status(200).json(results.rows);
      } catch(error) {
        res.status(409).json( { error: error.message } )
      }
    }

const deleteTrip = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    
    const userId = req.params.id
    const tripId = req.user.id

    try {
      const activity_deletion = await pool.query(
        `DELETE FROM trips
        WHERE id = $1 AND user_id = $2 RETURNING *`,
        [tripId, userId]
      )
      const results = await pool.query('DELETE FROM trips WHERE id = $1', [id])
      res.status(200).json(results.rows)
    } catch(error) {
      res.status(409).json( { error: error.message } )
    }      
}

const deleteAllTrips = async (req, res) => {
    try {
        const results = await pool.query('DELETE FROM trips')
        res.status(200).json(results.rows)
    } catch(error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    createTrip,
    getTripsbyUser,
    getTrip,
    updateTrip,
    deleteTrip,
    deleteAllTrips
}