import express, { Router } from 'express';
import { studentControllers } from './student.controller';

const router: Router = express.Router();

// will call controller function

router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleSTudent);

export const studentRoutes = router;
