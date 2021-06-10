import 'bootstrap/dist/css/bootstrap.min.css';
import React, {FC} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {paymentValidationSchema} from "./payment-validation-schema";
import {PaymentDataPropsInterface} from "./payment-data-props-interface";

export const PaymentData: FC<PaymentDataPropsInterface> = ({onNext, onPrevious, onChange, initialValues}) => (
  <Formik
    validationSchema={paymentValidationSchema}
    onSubmit={onNext}
    validateOnChange
    validate={onChange}
    initialValues={initialValues}
  >
    {({
        handleSubmit,
        values,
        isValid,
        errors,
        handleChange,
      }) => (
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
        <Row xs={2} md={4} lg={6}>
          <Col><Button onClick={onPrevious}>Back</Button></Col>
          <Col><Button type="submit" disabled={!isValid}>Next</Button></Col>
        </Row>
      </Form>
    )}
  </Formik>
)
