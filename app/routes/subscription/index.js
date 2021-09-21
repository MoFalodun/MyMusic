import { Router } from 'express';
import { SubscriptionController } from '../../controllers';

const { fetchAllSubscriptions, fetchSingleSubscription } = SubscriptionController;
const router = Router();

router.get(
  '/',
  fetchAllSubscriptions,
);

router.get(
  '/:id',
  fetchSingleSubscription,
);

export default router;
