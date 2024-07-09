import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './route/authRoute.js';
// import taskRoute from './route/taskRoute.js';
import taskRoute from './route/ProjectRoute.js';
import cors from 'cors';


const app = express();
const allowedOrigins = [
    'https://backend-project-management-system-1.onrender.com',
    'http://localhost:3000',
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

dotenv.config();



mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDb is connected');
})
.catch((err) => {
    console.log(err);
})


app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/project', taskRoute);

// app.use('/api/projects', projectRoute);



const PORT = process.env.PORT||9004;
app.listen(PORT, () => {
    console.log(`The server is running at ${PORT}`);
})