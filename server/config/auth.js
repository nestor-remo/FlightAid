import { pool } from './database.js'
import './dotenv.js'
import GitHubStrategy from 'passport-github2'

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
}

const verify = async (accessToken, refreshToken, profile, callback) => {
    const { _json: { id, name, login, avatar_url } } = profile

    const userData = {
        githubId: id,
        username: login,
        avatarUrl: avatar_url,
        accessToken
    }

    try {
        const results = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [userData.username]
        )
        const user = results.rows[0]

        if (!user) {
            const results = await pool.query(
                'INSERT INTO users (githubid, username, avatarurl, accesstoken) VALUES ($1, $2, $3, $4) RETURNING *',
                [userData.githubId, userData.username, userData.avatarUrl, userData.accessToken]
            )
            const newUser = results.rows[0]
            return callback(null, newUser)
        }
        return callback(null, user)

    } catch (error) {
        return callback(error)
    }
}

export const GitHub = new GitHubStrategy(options, verify)