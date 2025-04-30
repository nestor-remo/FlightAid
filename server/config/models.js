import { pool } from './database.js'
import './dotenv.js'

const createTripsTable = async () => {
    const createTripsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips (
            id serial PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
            title varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            img_url text NOT NULL,
            num_days integer NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_cost money NOT NULL,
            destination_name varchar(100) NOT NULL
        );
    `

    try {
        const res = await pool.query(createTripsTableQuery)
        console.log('Trips table created successfully')
    } catch (err) {
        console.error('Trips table not created', err)
    }
}

createTripsTable()

const createActivitiesTable = async () => {
    const createActivitiesTableQuery = `
        CREATE TABLE IF NOT EXISTS activities (
            id serial PRIMARY KEY,
            trip_id INTEGER REFERENCES trips(id) on DELETE CASCADE,
            name varchar(100) NOT NULL,
            type varchar(100) NOT NULL,
            location varchar(100) NOT NULL,
            notes text,
            image_url text
        );
    `
    try {
        const res = await pool.query(createActivitiesTableQuery)
        console.log('Activities table created successfully')
    } catch (err) {
        console.error('Error creating activities table', err)
    }
}

createActivitiesTable()


const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            githubid varchar(100) NOT NULL,
            username varchar(100) NOT NULL,
            avatarurl varchar(500),
            accesstoken varchar(500) NOT NULL
        );
    `
    try {
        const res = await pool.query(createUsersTableQuery)
        console.log('Users table created successfully')
    } catch (err) {
        console.error('Error creating users table', err)
    }    
}

createUsersTable()