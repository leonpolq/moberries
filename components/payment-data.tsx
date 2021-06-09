import 'bootstrap/dist/css/bootstrap.min.css';
import React, {FC} from "react";
import {NextComponentProps} from "../interfaces/next-component-props";
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {PaymentDataValues, PreviousComponentProps} from "../interfaces";
import valid from 'card-validator'; //import statement

const schema = yup.object().shape({
  cardNumber: yup.string()
    .test('test-number', // this is used internally by yup
      'Credit Card number is invalid', //validation message
      value => valid.number(value).isValid) // return true false based on validation
    .required(),
  expirationDate: yup.string()
    .typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .test(
      'test-credit-card-expiration-date',
      'Invalid Expiration Date has past',
      expirationDate => {
        if (!expirationDate) {
          return false
        }

        const today = new Date()
        const monthToday = today.getMonth() + 1
        const yearToday = today
          .getFullYear()
          .toString()
          .substr(-2)

        const [expMonth, expYear] = expirationDate.split('/')

        if (Number(expYear) < Number(yearToday)) {
          return false
        } else if (
          Number(expMonth) < monthToday &&
          Number(expYear) <= Number(yearToday)
        ) {
          return false
        }

        return true
      }
    )
    .test(
      'test-credit-card-expiration-date',
      'Invalid Expiration Month',
      expirationDate => {
        if (!expirationDate) {
          return false
        }
        const today = new Date()
          .getFullYear()
          .toString()
          .substr(-2)

        const [expMonth] = expirationDate.split('/')

        if (Number(expMonth) > 12) {
          return false
        }

        return true
      }
    )
    .required('Expiration date is required'),
  securityCode: yup.string()
    .test('test-cvv', // this is used internally by yup
      'Credit Card CVV number is invalid', //validation message
      value => valid.cvv(value).isValid) // return true false based on validation
    .required(),
});

type Props = NextComponentProps & PreviousComponentProps & {
  onChange: (values: PaymentDataValues) => void
  initialValues: PaymentDataValues
};

export const PaymentData: FC<Props> = ({onNext, onPrevious, onChange, initialValues}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onNext}
      validateOnChange
      validate={onChange}
      initialValues={initialValues}
    >
      {({
          handleSubmit,
          values,
          touched,
          isValid,
          errors,
          handleChange,
          setFieldValue,
        }) => {
        console.log(errors);
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                value={values.cardNumber}
                onChange={handleChange}
                isInvalid={!!errors.cardNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Expiration Date"
                name="expirationDate"
                value={values.expirationDate}
                onChange={handleChange}
                isInvalid={!!errors.expirationDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expirationDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Security Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Security Code"
                name="securityCode"
                value={values.securityCode}
                onChange={handleChange}
                isInvalid={!!errors.securityCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.securityCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={onPrevious}>Back</Button>
            <Button type="submit" disabled={!isValid}>Next</Button>
          </Form>
        )
      }}
    </Formik>
  );
}
