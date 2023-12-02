import { Request, Response } from 'express';
import { StudentService } from './student.service';


// import { z } from "zod";
import studentValidationSchemaByZod from './student.validationByZod';
// import studentValidationSchemaByJoi from './student.validationByJoi';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // -----------------------xxxxxxxxxxxxxxxxx-----------------------
    // // creating a schema validation using joi  starts here
    // const  { error, value } = studentValidationSchemaByJoi.validate(studentData);
    // // console.log({ error }, { value });

    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    // // will call service function to send the data after joi validation
    // const result = await StudentService.createStudentIntoDB(value);
    // // creating a schema validation using joi  ends here

    // -----------------------xxxxxxxxxxxxxxxxx-----------------------

    // // creating a schema validation using Zod

    const ZodParseData = studentValidationSchemaByZod.parse(studentData);

    const result = await StudentService.createStudentIntoDB(ZodParseData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
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
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
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
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const deleteSingleSTudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student has deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleSTudent,
  deleteSingleSTudent,
};
