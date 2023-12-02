import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // -----------------------xxxxxxxxxxxxxxxxx-----------------------

  if (await Student.isUserExists(studentData?.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(studentData); //built in static method provided by mongoose
  // -----------------------xxxxxxxxxxxxxxxxx-----------------------
  // const student = new Student(studentData); // create an instance
  // if (await student.isUserExists(studentData?.id)) {
  //   throw new Error('User already exists!');
  // }
  // const result = await student.save(); // built in instant method provided by mongoose
  // -----------------------xxxxxxxxxxxxxxxxx-----------------------

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
