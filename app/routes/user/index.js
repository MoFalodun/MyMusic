import { Router } from 'express';
import { ValidationMiddleware, UserMiddleware } from '../../middlewares';
import { userSignUpSchema, userLoginSchema } from '../../validations';
import { AuthController } from '../../controllers';

const { checkIfUserExistsByEmail,
  userLoginEmailValidator } = UserMiddleware;
const { validate } = ValidationMiddleware;
const { userSignup, login } = AuthController;
const router = Router();

router.post(
  '/sign-up',
  validate(userSignUpSchema),
  checkIfUserExistsByEmail,
  userSignup
);

router.post(
  '/login',
  validate(userLoginSchema),
  userLoginEmailValidator,
  login
);

export default router;
