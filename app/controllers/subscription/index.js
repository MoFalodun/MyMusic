import { SubscriptionService } from '../../services';
import { Helper, constants, ApiError } from '../../utils';

const {
  RESOURCE_FETCH_ERROR,
  INTERNAL_SERVER_ERROR,
  RESOURCE_FETCH_SUCCESS,
  RESOURCE_NOT_EXISTS
} = constants;
const { successResponse } = Helper;
const { errorResponse } = Helper;
const { getSubscriptionPlans, getSubscriptionById } = SubscriptionService;

/**
 * @class SubscriptionController
 */

class SubscriptionController {
  /**
   * Controllers used for fetching all subscriptions plans
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the subscriptions
   * @memberof SubscriptionController
   */

  static async fetchAllSubscriptions(req, res) {
    try {
      const subscriptions = await getSubscriptionPlans();
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Subscriptions'),
        data: subscriptions
      });
    } catch (e) {
      e.status = RESOURCE_FETCH_ERROR('Subscriptions');
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }

  /**
   * Controllers used for fetching a single subscription
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the subscription
   * @memberof SubscriptionController
   */

  static async fetchSingleSubscription(req, res) {
    try {
      const singleSubscription = await getSubscriptionById(req.params.id);
      if (!singleSubscription) return errorResponse(req, res, new ApiError({ status: 404, message: RESOURCE_NOT_EXISTS('Subscription') }));
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Subscription'),
        data: singleSubscription
      });
    } catch (e) {
      e.status = RESOURCE_FETCH_ERROR('Subscription');
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }
}

export default SubscriptionController;
