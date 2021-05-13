import { Router } from 'express';
import { AlbumController } from '../../controllers';
import { AuthMiddleware, ArtistMiddleware } from '../../middlewares';

const { authenticate } = AuthMiddleware;
const { createAlbum } = AlbumController;
const { artistValidator } = ArtistMiddleware;
const router = Router();

router.post(
  '/',
  authenticate,
  artistValidator,
  createAlbum
);

export default router;
