export interface Plan {
  duration_months: number
  price_usd_per_gb: number
}

export interface SubscriptionPlans {
  subscription_plans: Array<Plan>
}
