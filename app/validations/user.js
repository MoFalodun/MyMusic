import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { emailCheck, passwordCheck, stringCheck,
  editStringCheck, editPhoneCheck } = ValidationHelper;

export const userSignUpSchema = Joi.object({
  firstName: stringCheck('First name', Joi, 3),
  lastName: stringCheck('Last name', Joi, 3),
  email: emailCheck(Joi),
  userName: stringCheck('Username', Joi, 2),
  password: passwordCheck(Joi),
  phoneNumber: editPhoneCheck(Joi)
});

export const userLoginSchema = Joi.object({
  email: emailCheck(Joi),
  password: passwordCheck(Joi)
});

export const updateUserSchema = Joi.object({
  first_name: editStringCheck('First name', Joi, 3),
  last_name: editStringCheck('Last name', Joi, 3),
  userName: editStringCheck('UserName', Joi, 2),
  phone_number: editPhoneCheck(Joi)
});
