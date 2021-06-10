import React, {FC} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {confirmationValidationSchema} from "./confirmation-validation-schema";
import {ConfirmationPropsInterface} from "./confirmation-props-interface";

export const Confirmation: FC<ConfirmationPropsInterface> = ({onNext, onChange, onPrevious, initialValues}) => (
  <Formik
    validationSchema={confirmationValidationSchema}
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
        setFieldValue,
        handleChange,
      }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Terms</Form.Label>
          <div>
            <Form.Check
              inline
              label="I agree"
              name="terms"
              type="checkbox"
              checked={values.terms}
              onChange={e => setFieldValue('terms', e.target.checked)}
              isInvalid={!!errors.terms}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.terms}
          </Form.Control.Feedback>
        </Form.Group>
        <Row xs={2} md={4} lg={6}>
          <Col><Button onClick={onPrevious}>Back</Button></Col>
          <Col><Button type="submit" disabled={!isValid}>Confirm</Button></Col>
        </Row>
      </Form>
    )}
  </Formik>
)
