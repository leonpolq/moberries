import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Accordion, Badge, Card, Col, Container, Row,} from "react-bootstrap";
import {API_SUBSCRIPTIONS, TabsEnum} from "../constants";
import {Subscription} from "../components/subscription";
import React, {useState} from "react";
import {PaymentDataValues, SubscriptionValues} from "../interfaces";
import {InferGetStaticPropsType} from "next";
import {PaymentData} from "../components/payment-data";

const initialSubscriptionValues: SubscriptionValues = {
  gigabytes: 5,
  duration: 12,
  upfrontPayment: false,
}

const initialPaymentDataValues: PaymentDataValues = {
  cardNumber: 1,
  expirationDate: '',
  securityCode: 1,
}

export const getStaticProps = async () => {
  try {
    const res = await fetch(API_SUBSCRIPTIONS)
    const plans: SubscriptionPlans = await res.json()

    return {
      props: {
        plans,
      },
    }

  } catch (e) {
    return {
      props: {
        error: true
      }
    }
  }
}

type Plan = {
  duration_months: number,
  price_usd_per_gb: number
};

interface SubscriptionPlans {
  subscription_plans: Array<Plan>
}

function calculateDiscount(subscription: SubscriptionValues) {
  return !subscription.upfrontPayment ? 1 : 0.9;
}

function calculatePrice(plan: Plan, subscription: SubscriptionValues) {
  return plan.price_usd_per_gb * subscription.gigabytes * calculateDiscount(subscription);
}

export default function Home({plans, error}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [subscription, setSubscription] = useState<SubscriptionValues>(initialSubscriptionValues)
  const [paymentData, setPaymentData] = useState<PaymentDataValues>(initialPaymentDataValues)
  const [tab, setTab] = useState<TabsEnum>(TabsEnum.subscription)

  if (error || !plans) {
    return <Badge variant="danger">There is some error during fetching resources!</Badge>
  }

  const plan = plans.subscription_plans
    .find(plan => plan.duration_months === subscription.duration) as Plan

  return (
    <Container>
      <Head>
        <title>MoBerries</title>
        <meta name="description" content="MoBerries"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Row>
        <Col>
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
          <Accordion defaultActiveKey={TabsEnum.subscription} activeKey={tab}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={TabsEnum.subscription}>
                Select subscription parameters
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={TabsEnum.subscription}>
                <Card.Body>
                  <Subscription
                    initialValues={initialSubscriptionValues}
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
              <Accordion.Toggle as={Card.Header} eventKey={TabsEnum.confirmation}>Confirmation</Accordion.Toggle>
              <Accordion.Collapse eventKey={TabsEnum.confirmation}>
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
