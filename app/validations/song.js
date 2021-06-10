import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { stringCheck, enumCheck, } = ValidationHelper;

const songCreateSchema = Joi.object({
  name: stringCheck('name', Joi, 3),
  lyrics: stringCheck('lyrics', Joi, 3),
  genre: enumCheck(['Jazz', 'Hip-Hop', 'Classical', 'Gospel', 'Rock', 'Soul', 'Reggae', 'R&B', 'Country'], 'genre', Joi),
});

export default songCreateSchema;
