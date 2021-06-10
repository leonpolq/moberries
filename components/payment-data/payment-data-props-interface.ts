import {NextComponentProps, PaymentDataValues, PreviousComponentProps} from "../../interfaces";

export type PaymentDataPropsInterface = NextComponentProps & PreviousComponentProps & {
  onChange: (values: PaymentDataValues) => void
  initialValues: PaymentDataValues
};
