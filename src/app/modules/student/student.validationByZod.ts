import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    }),
});

const guardianValidationSchema = z.object({
  father: z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactName: z.string().min(1),
  }),
  mother: z.object({
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactName: z.string().min(1),
  }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const emergencyContactValidationSchema = z.object({
  relation: z.enum(['Father', 'Mother', 'Brother']),
  contactNo: z.string().min(1),
});

const studentValidationSchemaByZod = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['Male', 'Female', 'Other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyContact: emergencyContactValidationSchema,
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchemaByZod;
