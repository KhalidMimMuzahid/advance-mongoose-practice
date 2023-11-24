import { Schema, model } from 'mongoose';
import validator from 'validator';
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
    required: [true, 'firstName is required'],
    maxLength: [20, 'first name can not be more than 20 characters'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const isFirstNameStrCapitalized =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value === isFirstNameStrCapitalized;
      },
      message: '{VALUE} must be capitalized',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} must be alpha character',
    },
  },
});
const guardianSchema = new Schema<Guardian>({
  father: {
    type: {
      fatherName: { type: String, required: true, trim: true },
      fatherOccupation: { type: String, required: true, trim: true },
      fatherContactName: { type: String, required: true, trim: true },
    },
  },
  mother: {
    type: {
      motherName: { type: String, required: true, trim: true },
      motherOccupation: { type: String, required: true, trim: true },
      motherContactName: { type: String, required: true, trim: true },
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
  relation: {
    type: String,
    enum: ['Father', 'Mother', 'Brother'],
    required: [true, 'relation is required'],
  },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: "gender field can only be 'Male', 'Female' or 'Other'",
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} must be a valid email address',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'contact no is required'],
    unique: true,
  },
  emergencyContact: {
    type: emergencyContactSchema,
    required: [true, 'emergency contact is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUE} is not a valid blood group}',
    },
    required: [true, 'blood group is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    required: true,
  },
});

// creating a model
export const StudentModel = model<Student>('Student', studentSchema);
