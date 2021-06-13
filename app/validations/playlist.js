import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { stringCheck, enumCheck } = ValidationHelper;

const playlistCreateSchema = Joi.object({
  playlistName: stringCheck('Playlist Name', Joi, 3),
});

const playlistLikeSchema = Joi.object({
  decision: enumCheck(['like', 'dislike'], 'decision', Joi)
});

export {
  playlistCreateSchema,
  playlistLikeSchema
};
