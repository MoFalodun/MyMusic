import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { emailCheck, passwordCheck, stringCheck,
  editStringCheck } = ValidationHelper;

export const artistSignUpSchema = Joi.object({
  artistName: stringCheck('artist name', Joi, 3),
  email: emailCheck(Joi),
  password: passwordCheck(Joi),
});

export const updateArtistSchema = Joi.object({
  artistName: editStringCheck('artist name', Joi, 3),
});
