import { Router } from 'express';
import userRoutes from './user';
import artistRoutes from './artist';
import albumRoutes from './albums';
import songRoutes from './song';
import ratingRoutes from './rating';
import subscriptionRoutes from './subscription';

const router = Router();

router.use('/user', userRoutes);
router.use('/artist', artistRoutes);
router.use('/album', albumRoutes);
router.use('/song', songRoutes);
router.use('/rating', ratingRoutes);
router.use('/subscription', subscriptionRoutes);

export default router;
