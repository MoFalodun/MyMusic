import Joi from 'joi';
import myCustomJoi from 'joi-phone-number';
import { ValidationHelper } from '../utils/helpers';

const myCustomPhoneValidator = Joi.extend(myCustomJoi);

const { emailCheck, passwordCheck, stringCheck,
  editStringCheck, editPhoneCheck, editEmailCheck } = ValidationHelper;

export const userSignUpSchema = Joi.object({
  firstName: stringCheck('First name', Joi, 3),
  lastName: stringCheck('Last name', Joi, 3),
  email: emailCheck(Joi),
  username: stringCheck('Username', Joi, 2),
  password: passwordCheck(Joi),
  phoneNumber: editPhoneCheck(Joi)
});

export const signupSchema = Joi.object({
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  phoneNumber: myCustomPhoneValidator.string().phoneNumber().required(),
  password: Joi.string().min(7).required(),
});

export const userLoginSchema = Joi.object({
  email: editEmailCheck(Joi),
  username: editStringCheck('UserName', Joi, 2),
  password: passwordCheck(Joi)
}).xor('email', 'username');

export const updateUserSchema = Joi.object({
  first_name: editStringCheck('First name', Joi, 3),
  last_name: editStringCheck('Last name', Joi, 3),
  userName: editStringCheck('UserName', Joi, 2),
  phone_number: editPhoneCheck(Joi)
});
