import {Plan} from "../../interfaces/subscription-plans";
import {SubscriptionValues} from "../../interfaces";

export interface InformationPropsInterface {
  plans: Plan[],
  subscription: SubscriptionValues
}
