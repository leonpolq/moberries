import 'bootstrap/dist/css/bootstrap.min.css';
import {NextComponentProps} from "../../interfaces/next-component-props";
import {PreviousComponentProps} from "../../interfaces";
import {ConfirmationValues} from "../../interfaces/confirmation-values";

export type ConfirmationPropsInterface = NextComponentProps & PreviousComponentProps & {
  onChange: (values: ConfirmationValues) => void
  initialValues: ConfirmationValues
};
