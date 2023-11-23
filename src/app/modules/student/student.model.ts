import { Schema, model } from 'mongoose';
import {
  EmergencyContact,
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// creating a schema

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const guardianSchema = new Schema<Guardian>({
  father: {
    type: {
      fatherName: { type: String, required: true },
      fatherOccupation: { type: String, required: true },
      fatherContactName: { type: String, required: true },
    },
  },
  mother: {
    type: {
      motherName: { type: String, required: true },
      motherOccupation: { type: String, required: true },
      motherContactName: { type: String, required: true },
    },
  },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const emergencyContactSchema = new Schema<EmergencyContact>({
  relation: ['Father', 'Mother', 'Brother'],
  contactNo: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
  },
  name: {
    type: userNameSchema,
    // required: true,
  },
  gender: ['Male', 'Female'],
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: emergencyContactSchema,
    required: true,
  },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
  },
  profileImage: {
    type: String,
  },
  isActive: ['active', 'blocked'],
});

// creating a model
export const StudentModel = model<Student>('Student', studentSchema);
