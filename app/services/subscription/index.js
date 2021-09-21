import db from '../../db';
import queries from '../../db/queries/subscription';

const {
  fetchSubscriptionPlans,
  fetchSubscriptionPlanById
} = queries;

/**
 * Contains a collection of service methods for managing Subscription resource on the app.
 * @class SubscriptionService
 *
 */
class SubscriptionService {
  /**
   * Fetches all available subscriptions
   * @memberof SubscriptionService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Subscription resource or a DB Error.
   */
  static async getSubscriptionPlans() {
    return db.many(fetchSubscriptionPlans);
  }

  /**
   * Fetches a single subscription by its id
   * @memberof SubscriptionService
   * @param {string} id - id of the subscription
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Subscription resource or a DB Error.
   */
  static async getSubscriptionById(id) {
    return db.oneOrNone(fetchSubscriptionPlanById, [id]);
  }
}
export default SubscriptionService;
