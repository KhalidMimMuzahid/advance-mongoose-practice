import { Request, Response } from 'express';
import { StudentService } from './student.service';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service function to send the data
    const result = await StudentService.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: 'Student could not be created',
    // });
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const results = await StudentService.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'students were retrieved successfully',
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleSTudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student was retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleSTudent,
};
