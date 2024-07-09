import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './route/authRoute.js';
// import taskRoute from './route/taskRoute.js';
import taskRoute from './route/ProjectRoute.js';
import cors from 'cors';


const app = express();

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