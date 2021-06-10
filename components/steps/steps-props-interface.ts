import 'bootstrap/dist/css/bootstrap.min.css';
import {ConfirmationValues, PaymentDataValues, SubscriptionValues} from "../../interfaces";

export interface StepsPropsInterface {
  onSubmit: () => void
  subscription: SubscriptionValues
  paymentData: PaymentDataValues
  confirmation: ConfirmationValues
  setSubscription: (value: SubscriptionValues) => void
  setPaymentData: (value: PaymentDataValues) => void
  setConfirmation: (value: ConfirmationValues) => void
}
