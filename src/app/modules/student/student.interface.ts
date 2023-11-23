export type Guardian = {
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

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type EmergencyContact = {
  relation: 'Mother' | 'Father' | 'Brother';
  contactNo: string;
};
export interface Student {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContact: EmergencyContact;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
}
