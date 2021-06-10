import { Router } from 'express';
import { RatingController } from '../../controllers';
import { AuthMiddleware, UserMiddleware, ValidationMiddleware, SongMiddleware } from '../../middlewares';
import ratingCreateSchema from '../../validations/rating';

const { authenticate } = AuthMiddleware;
const { rate } = RatingController;
const { userValidator } = UserMiddleware;
const { validate } = ValidationMiddleware;
const { checkIfSongExist } = SongMiddleware;
const router = Router();

router.post(
  '/:id',
  authenticate,
  userValidator,
  validate(ratingCreateSchema),
  checkIfSongExist,
  rate
);

export default router;
