import 'bootstrap/dist/css/bootstrap.min.css';
import React, {FC} from "react";
import {Card} from "react-bootstrap";
import {InformationPropsInterface} from "./information-props-interface";
import {calculatePrice} from "./information-calculation-logic";
import {Plan} from "../../interfaces/subscription-plans";

export const Information: FC<InformationPropsInterface> = ({subscription, plans}) => {
  const plan = plans.find(planItem => planItem.duration_months === subscription.duration) as Plan

  return (
    <Card>
      <Card.Body>
        <Card.Title>General info</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Subscription</Card.Subtitle>
        <Card.Text>Duration: {subscription.duration} months</Card.Text>
        <Card.Text>Amount of gigabytes in a cloud: {subscription.gigabytes} GB</Card.Text>
        <Card.Text>Upfront payment: {subscription.upfrontPayment ? 'Yes' : 'No'}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
        <Card.Text>
          {calculatePrice(plan, subscription)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
