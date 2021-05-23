import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { stringCheck, enumCheck } = ValidationHelper;

const albumCreateSchema = Joi.object({
  albumName: stringCheck('Album name', Joi, 3),
  description: stringCheck('Description', Joi, 3),
  genre: enumCheck(['Jazz', 'Hip-Hop', 'Classical', 'Gospel', 'Rock', 'Soul', 'Reggae', 'R&B', 'Country'], 'genre', Joi),
});

export default albumCreateSchema;
