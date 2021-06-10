import 'bootstrap/dist/css/bootstrap.min.css';
import {NextComponentProps} from "../../interfaces/next-component-props";
import {SubscriptionValues} from "../../interfaces";

export type SubscriptionPropsInterface = NextComponentProps & {
  onChange: (values: SubscriptionValues) => void
  initialValues: SubscriptionValues
};
