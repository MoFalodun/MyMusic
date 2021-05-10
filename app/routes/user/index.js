import { Router } from 'express';
import { ValidationMiddleware, UserMiddleware } from '../../middlewares';
import { userSignUpSchema, userLoginSchema } from '../../validations';
import AuthController from '../../controllers';

const { checkIfUserExistsByEmail, checkIfUserExistsByUsername } = UserMiddleware;
const { validate } = ValidationMiddleware;
const { userSignup, userLogin } = AuthController;
const router = Router();

router.post(
  '/sign-up',
  validate(userSignUpSchema),
  checkIfUserExistsByEmail,
  checkIfUserExistsByUsername,
  userSignup
);

router.post(
  '/login',
  validate(userLoginSchema),
  userLogin
);

export default router;
