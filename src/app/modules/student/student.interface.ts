import { Model } from 'mongoose';

export type TGuardian = {
  father: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactName: string;
  };
  mother: {
    motherName: string;
    motherOccupation: string;
    motherContactName: string;
  };
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TEmergencyContact = {
  relation: 'Mother' | 'Father' | 'Brother';
  contactNo: string;
};
export interface TStudent {
  id: string;
  password: string;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContact: TEmergencyContact;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
}




// -----------------------xxxxxxxxxxxxxxxxx-----------------------
//for creating instance methods
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// -----------------------xxxxxxxxxxxxxxxxx-----------------------

//for creating static methods

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
// -----------------------xxxxxxxxxxxxxxxxx-----------------------
