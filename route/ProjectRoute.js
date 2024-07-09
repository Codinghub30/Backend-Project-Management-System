// routes/projectRoute.js
import express from 'express';
import { getProjects, createProject, deleteProject, updateProjectStatus } from '../controller/projectController.js';

const router = express.Router();

router.get('/getProjects', getProjects);
router.post('/CreateProjects', createProject);
router.delete('/DeleteProject/:id', deleteProject);
router.patch('/projects/:projectId/status', updateProjectStatus);

export default router;
