import 'bootstrap/dist/css/bootstrap.min.css';

import {Accordion, Card,} from "react-bootstrap";
import {TabsEnum} from "../../constants";
import {Subscription} from "../../components/subscription";
import React, {FC, useState} from "react";
import {PaymentData} from "../../components/payment-data";
import {Confirmation} from "../../components/confirmation";
import {StepsPropsInterface} from "./steps-props-interface";

export const Steps: FC<StepsPropsInterface> = ({
   onSubmit,
   subscription,
   setSubscription,
   paymentData,
   setPaymentData,
   confirmation,
   setConfirmation
 }) => {
  const [tab, setTab] = useState<TabsEnum>(TabsEnum.subscription)

  return (
    <Accordion defaultActiveKey={TabsEnum.subscription} activeKey={tab}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={TabsEnum.subscription}>
          Select subscription parameters
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={TabsEnum.subscription}>
          <Card.Body>
            <Subscription
              initialValues={subscription}
              onChange={setSubscription}
              onNext={() => {
                setTab(TabsEnum.paymentData)
              }}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={TabsEnum.paymentData}>
          Payment data
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={TabsEnum.paymentData}>
          <Card.Body>
            <PaymentData
              initialValues={paymentData}
              onChange={setPaymentData}
              onNext={() => {
                setTab(TabsEnum.confirmation)
              }}
              onPrevious={() => {
                setTab(TabsEnum.subscription)
              }}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={TabsEnum.confirmation}>
          Confirmation
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={TabsEnum.confirmation}>
          <Card.Body>
            <Confirmation
              initialValues={confirmation}
              onChange={setConfirmation}
              onNext={() => {
                onSubmit()
              }}
              onPrevious={() => {
                setTab(TabsEnum.paymentData)
              }}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}
