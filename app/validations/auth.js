import joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { emailCheck, passwordCheck } = ValidationHelper;

export const loginSchema = joi.object({
  email: emailCheck(joi),
  password: passwordCheck(joi)
});

export const forgotPasswordSchema = joi.object({
  email: emailCheck(joi)
});

export const resetPasswordSchema = joi.object({
  password: passwordCheck(joi)
});
