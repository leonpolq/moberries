import 'bootstrap/dist/css/bootstrap.min.css';
import React, {FC} from "react";
import {NextComponentProps} from "../interfaces/next-component-props";
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {SubscriptionValues} from "../interfaces";

const schema = yup.object().shape({
  duration: yup.number().required().oneOf([3, 6, 12]),
  gigabytes: yup.number().required().oneOf([5, 10, 50]),
  upfrontPayment: yup.bool().required(),
});

type Props = NextComponentProps & {
  onChange: (values: SubscriptionValues) => void
  initialValues: SubscriptionValues
};

export const Subscription: FC<Props> = ({onNext, onChange, initialValues}) => {
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
          setFieldValue,
        }) => {
        console.log('errors', errors);
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Duration in months</Form.Label>
              <Form.Control
                as="select"
                name="duration"
                value={values.duration}
                onChange={e => setFieldValue('duration', Number(e.target.value))}
                isValid={touched.duration && !errors.duration}
                isInvalid={!!errors.duration}
              >
                <option>3</option>
                <option>6</option>
                <option>12</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.duration}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Amount of gigabytes in a cloud</Form.Label>
              <Form.Control
                as="select"
                name="gigabytes"
                value={values.gigabytes}
                onChange={e => setFieldValue('gigabytes', Number(e.target.value))}
                isValid={touched.gigabytes && !errors.gigabytes}
                isInvalid={!!errors.gigabytes}
              >
                <option>5</option>
                <option>10</option>
                <option>50</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.gigabytes}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Upfront payment </Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Yes"
                  name="upfrontPayment"
                  type="radio"
                  checked={values.upfrontPayment}
                  onChange={e => setFieldValue('upfrontPayment', e.target.checked)}
                  isInvalid={!!errors.upfrontPayment}
                />
                <Form.Check
                  inline
                  label="No"
                  name="upfrontPayment"
                  type="radio"
                  checked={!values.upfrontPayment}
                  onChange={e => setFieldValue('upfrontPayment', !e.target.checked)}
                  isInvalid={!!errors.upfrontPayment}/>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.upfrontPayment}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={!isValid}>Next</Button>
          </Form>
        )
      }}
    </Formik>
  );
}
