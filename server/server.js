import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js'

const app = express(); 
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})); 
app.use(cookieParser());

const uri = process.env.MONGO_URI; 

// API Endpoints
app.get('/', (req, res) => {
  res.send('The Resourcery API is running!');
});
app.use('/api/auth', authRouter)

// declare port and start server
const PORT = process.env.PORT || 5000;
connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});