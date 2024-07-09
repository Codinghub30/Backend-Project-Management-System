import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './route/authRoute.js';
import taskRoute from './route/ProjectRoute.js';
import cors from 'cors';

const app = express();

dotenv.config();

// CORS configuration
const allowedOrigins = [
    'https://backend-project-management-system-1.onrender.com',
    'http://localhost:3000',
    'https://668d5102fdccce81c76c2831--brilliant-pastelito-c99b45.netlify.app'
];

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

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDb is connected');
})
.catch((err) => {
    console.error('MongoDb connection error:', err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/project', taskRoute);

// Start server
const PORT = process.env.PORT || 9004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
