import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TEmergencyContact,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  TUserName,
  StudentModel,
} from './student.interface';
import config from '../../config';
import { NextFunction } from 'express';

// creating a schema

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    maxLength: [20, 'first name can not be more than 20 characters'],
    trim: true,
    // we are using Joi/Zod; that's why we no need custoom validation here
    // validate: {
    //   validator: function (value: string) {
    //     const isFirstNameStrCapitalized =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return value === isFirstNameStrCapitalized;
    //   },
    //   message: '{VALUE} must be capitalized',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} must be alpha character',
    // },
  },
});
const guardianSchema = new Schema<TGuardian>({
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
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const emergencyContactSchema = new Schema<TEmergencyContact>({
  relation: {
    type: String,
    enum: ['Father', 'Mother', 'Brother'],
    required: [true, 'relation is required'],
  },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
});

// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// for creating instance method, schema will take 3 parameters like this,
//  const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>

// -----------------------xxxxxxxxxxxxxxxxx-----------------------

// for creating static method, schema will take 2 parameters like this,
//  const studentSchema = new Schema<TStudent, StudentModel>

// -----------------------xxxxxxxxxxxxxxxxx-----------------------
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: [20, "Password can't be more than 20 characters"],
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
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} must be a valid email address',
    // },
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
    required: [true, 'local guardian is required'],
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

// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// // creating a custom instance method
// studentSchema.methods.isUserExists = async(id:string)=>{
//   const existingUser= Student.findOne({ id})
//   return existingUser
// }
// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// creating a custom static method
// studentSchema.static('isUserExists', async function isUserExists (id:string) {
//   const existingUser= Student.findOne({ id})
//   return existingUser
// });
// // Or,
studentSchema.statics.isUserExists = async (id: string) => {
  const existingUser = Student.findOne({ id });
  return existingUser;
};
// -----------------------xxxxxxxxxxxxxxxxx-----------------------// middlewares

// pre save middleware/hook : will work on create() or save()
studentSchema.pre('save', async function (next) {
  console.log(this, 'pre hook: we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

// post save middleware / hook
studentSchema.post('save', function () {
  console.log(this, 'post hook: we have saved the data');
});
// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// creating a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
