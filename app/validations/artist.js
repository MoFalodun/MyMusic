import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { emailCheck, passwordCheck, stringCheck,
  editStringCheck } = ValidationHelper;

export const artistSignUpSchema = Joi.object({
  artistName: stringCheck('First name', Joi, 3),
  email: emailCheck(Joi),
  password: passwordCheck(Joi),
});

export const updateArtistSchema = Joi.object({
  first_name: editStringCheck('First name', Joi, 3),
  last_name: editStringCheck('Last name', Joi, 3),
  address: editStringCheck('Address', Joi, 3),
  company_name: editStringCheck('Company name', Joi, 2),
  company_address: editStringCheck('Company address', Joi, 3),
});
