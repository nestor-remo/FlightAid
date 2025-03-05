import express from 'express';
import cors from 'cors';
import tripsRoutes from './routes/trips.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Welcome to Flight-Aid</h1>');
});

app.use('/trips', tripsRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
