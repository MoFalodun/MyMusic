import { Router } from 'express';
import { SongController } from '../../controllers';
import { AuthMiddleware, ArtistMiddleware, UploadMiddleware, AlbumMiddleware, UserMiddleware } from '../../middlewares';

const { authenticate } = AuthMiddleware;
const { createSong, fetchSong, fetchAllSongs, fetchAllSongsByRating } = SongController;
const { userValidator } = UserMiddleware;
const { artistValidator } = ArtistMiddleware;
const { fileUpload } = UploadMiddleware;
const { checkIfAlbumExists } = AlbumMiddleware;
const router = Router();

router.post(
  '/',
  authenticate,
  artistValidator,
  checkIfAlbumExists,
  fileUpload,
  createSong
);

router.get(
  '/',
  authenticate,
  userValidator,
  fetchAllSongs
);

router.get(
  '/rating',
  authenticate,
  userValidator,
  fetchAllSongsByRating
);

router.get(
  '/:id',
  authenticate,
  userValidator,
  fetchSong
);

export default router;
