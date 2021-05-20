import { Router } from 'express';
import { SongController } from '../../controllers';
import { AuthMiddleware, ArtistMiddleware, UploadMiddleware } from '../../middlewares';

const { authenticate } = AuthMiddleware;
const { createSong } = SongController;
const { artistValidator } = ArtistMiddleware;
const { fileUpload } = UploadMiddleware;
const router = Router();

router.post(
  '/',
  authenticate,
  artistValidator,
  fileUpload,
  createSong
);

export default router;
