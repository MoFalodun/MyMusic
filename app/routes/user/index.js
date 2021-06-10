import { Router } from 'express';
import { ValidationMiddleware, UserMiddleware, AuthMiddleware, PlaylistMiddleware, SongMiddleware } from '../../middlewares';
import { userSignUpSchema, userLoginSchema, playlistCreateSchema, playlistLikeSchema } from '../../validations';
import { AuthController, PlaylistController } from '../../controllers';

const { checkIfUserExistsByEmail,
  userLoginEmailValidator, userValidator } = UserMiddleware;
const { validate } = ValidationMiddleware;
const { authenticate } = AuthMiddleware;
const { checkUniquePlaylistName, checkPlaylistOwner,
  checkIfPlaylistNameExist,
  checkUniqueDecision, checkIfPlaylistExist } = PlaylistMiddleware;
const { userSignup, login } = AuthController;
const { createPlaylist, getSongsOnPlaylist, addSongsToPlaylist, likePlaylist } = PlaylistController;
const { checkIfSongExist } = SongMiddleware;
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

router.post(
  '/playlist',
  authenticate,
  userValidator,
  validate(playlistCreateSchema),
  checkUniquePlaylistName,
  createPlaylist
);

router.post(
  '/add-song',
  authenticate,
  userValidator,
  checkIfPlaylistExist,
  checkPlaylistOwner,
  checkIfSongExist,
  addSongsToPlaylist
);

router.post(
  '/playlist/likes/:id',
  authenticate,
  userValidator,
  validate(playlistLikeSchema),
  checkIfPlaylistExist,
  checkUniqueDecision,
  likePlaylist
);

router.get(
  '/playlist/',
  authenticate,
  userValidator,
  checkIfPlaylistNameExist,
  getSongsOnPlaylist
);

export default router;
