export default {
  fetchSubscriptionPlans: 'SELECT id, plan, monthly_payment, yearly_payment FROM subscription;',
  fetchSubscriptionPlanById: 'SELECT id, plan, monthly_payment, yearly_payment FROM subscription WHERE id = $1;',
};
