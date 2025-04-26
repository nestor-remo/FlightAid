import express from 'express';
import cors from 'cors';

import tripsRoutes from './routes/trips.js';
import authRoutes from './routes/auth.js';

import passport from 'passport';
import session from 'express-session';
import { GitHub } from './config/auth.js';

import placesRoutes from './routes/places.js';

const app = express();

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}))

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true
}));

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Welcome to Flight-Aid</h1>');
});


app.use('/auth', authRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/places', placesRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
