import Joi from 'joi';
// creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .pattern(
      /^[A-Z][a-z]*$/,
      'starts with an uppercase letter followed by lowercase letters',
    ),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z]+$/, 'only alphabets are allowed'),
});

const guardianValidationSchema = Joi.object({
  father: Joi.object({
    fatherName: Joi.string().required().trim(),
    fatherOccupation: Joi.string().required().trim(),
    fatherContactName: Joi.string().required().trim(),
  }),
  mother: Joi.object({
    motherName: Joi.string().required().trim(),
    motherOccupation: Joi.string().required().trim(),
    motherContactName: Joi.string().required().trim(),
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
});

const emergencyContactValidationSchema = Joi.object({
  relation: Joi.string().valid('Father', 'Mother', 'Brother').required(),
  contactNo: Joi.string().required(),
});

const studentValidationSchemaByJoi = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContact: emergencyContactValidationSchema.required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema,
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').required(),
});

export default studentValidationSchemaByJoi;
