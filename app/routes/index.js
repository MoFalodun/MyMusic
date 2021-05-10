import { Router } from 'express';
import userRoutes from './user';
import artistRoutes from './artist';

const router = Router();

router.use('/user', userRoutes);
router.use('/artist', artistRoutes);

export default router;
