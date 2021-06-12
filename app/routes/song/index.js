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

router.use(authenticate);

router.post(
  '/',
  artistValidator,
  checkIfAlbumExists,
  fileUpload,
  createSong
);

router.get(
  '/',
  userValidator,
  fetchAllSongs
);

router.get(
  '/rating',
  userValidator,
  fetchAllSongsByRating
);

router.get(
  '/:id',
  userValidator,
  fetchSong
);

export default router;
