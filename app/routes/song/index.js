import { Router } from 'express';
import { SongController } from '../../controllers';
import { AuthMiddleware, ArtistMiddleware, UploadMiddleware, AlbumMiddleware } from '../../middlewares';

const { authenticate } = AuthMiddleware;
const { createSong } = SongController;
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

export default router;
