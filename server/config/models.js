import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const tripsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'))
const tripsData = JSON.parse(tripsFile)

const createTripsTable = async () => {
    const createTripsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips (
            id serial PRIMARY KEY,
            title varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            img_url text NOT NULL,
            num_days integer NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_cost money NOT NULL
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

const createDestinationsTable = async () => {
    const createDestinationsTableQuery = `
        CREATE TABLE IF NOT EXISTS destinations (
            id serial PRIMARY KEY,
            destination varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            city varchar(100) NOT NULL,
            country varchar(100) NOT NULL,
            img_url text NOT NULL,
            flag_img_url text NOT NULL
        );
    `

    try {
        const res = await pool.query(createDestinationsTableQuery)
        console.log('Destinations table created successfully')
    } catch (err) {
        console.error('Error creating destinations table', err)      
    }
}

createDestinationsTable()

const createActivitiesTable = async () => {
    const createActivitiesTableQuery = `
        CREATE TABLE IF NOT EXISTS activities (
            id serial PRIMARY KEY,
            trip_id int NOT NULL,
            activity varchar(100) NOT NULL,
            num_votes integer DEFAULT 0,
            FOREIGN KEY(trip_id) REFERENCES trips(id)
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
        DROP TABLE IF EXISTS users CASCADE;

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