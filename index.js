import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './route/authRoute.js';
import taskRoute from './route/ProjectRoute.js';
import cors from 'cors';

const app = express();

dotenv.config(); 

const allowedOrigins = [
    'https://blog-app-nine-lake.vercel.app',
    'http://localhost:5173',
    'https://blog-ikebfojuf-codinghub30s-projects.vercel.app'
  ];
  
  // Configure the CORS options
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
  };
  
  // Use the CORS middleware
  app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDb is connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Use CORS middleware again (you might consider removing this line)

app.use('/api/auth', authRoute); // Mount authRoute for authentication endpoints
app.use('/api/project', taskRoute); // Mount taskRoute for project management endpoints

const PORT = process.env.PORT || 9004;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
