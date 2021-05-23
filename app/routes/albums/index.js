import { Router } from 'express';
import { AlbumController } from '../../controllers';
import { AuthMiddleware, ArtistMiddleware, ValidationMiddleware } from '../../middlewares';
import albumCreateSchema from '../../validations/album';

const { authenticate } = AuthMiddleware;
const { createAlbum } = AlbumController;
const { artistValidator } = ArtistMiddleware;
const { validate } = ValidationMiddleware;
const router = Router();

router.post(
  '/',
  authenticate,
  artistValidator,
  validate(albumCreateSchema),
  createAlbum
);

export default router;
