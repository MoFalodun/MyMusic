import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { numberCheck } = ValidationHelper;

const ratingCreateSchema = Joi.object({
  rating: numberCheck('rating', Joi, 1, 5),
});

export default ratingCreateSchema;
