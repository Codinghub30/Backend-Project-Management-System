import express from 'express';
import { createtask,deleteTask,getTask } from '../controller/taskController1.js';


const router = express.Router();    

router.post('/createTask', createtask );
router.get('/getTask', getTask );
router.delete('/delete/:id', deleteTask );

export default router;