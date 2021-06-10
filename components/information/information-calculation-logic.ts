import {SubscriptionValues} from "../../interfaces";
import {Plan} from "../../interfaces/subscription-plans";

export function calculateDiscount(subscription: SubscriptionValues) {
  return !subscription.upfrontPayment ? 1 : 0.9;
}

export function calculatePrice(plan: Plan, subscription: SubscriptionValues) {
  return plan.price_usd_per_gb * subscription.gigabytes * calculateDiscount(subscription);
}
