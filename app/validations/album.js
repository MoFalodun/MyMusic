import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { stringCheck } = ValidationHelper;

const albumCreateSchema = Joi.object({
  artistName: stringCheck('First name', Joi, 3),
  description: stringCheck('First name', Joi, 3),
  genre: stringCheck('First name', Joi, 3),
  picture: stringCheck('First name', Joi, 3)
});

export default albumCreateSchema;
