import { Router } from 'express';
import { ValidationMiddleware, ArtistMiddleware } from '../../middlewares';
import { artistSignUpSchema, userLoginSchema } from '../../validations';
import AuthController from '../../controllers';

const { checkIfArtistExistsByEmail } = ArtistMiddleware;
const { validate } = ValidationMiddleware;
const { artistSignup, artistLogin } = AuthController;
const router = Router();

router.post(
  '/sign-up',
  validate(artistSignUpSchema),
  checkIfArtistExistsByEmail,
  artistSignup
);

router.post(
  '/login',
  validate(userLoginSchema),
  artistLogin
);

export default router;
