import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';

import {Alert, Col, Container, Row,} from "react-bootstrap";
import {API_POST_DATA, API_SUBSCRIPTIONS} from "../constants";
import React, {useState} from "react";
import {PaymentDataValues, SubscriptionValues} from "../interfaces";
import {InferGetStaticPropsType} from "next";
import {Information} from "../components/information";
import {SubscriptionPlans} from "../interfaces/subscription-plans";
import {ConfirmationValues} from "../interfaces/confirmation-values";
import {Steps} from "../components/steps";

const initialSubscriptionValues: SubscriptionValues = {
  gigabytes: 5,
  duration: 12,
  upfrontPayment: false,
}

const initialPaymentDataValues: PaymentDataValues = {
  cardNumber: '',
  expirationDate: '',
  securityCode: '',
}

const initialConfirmationValues: ConfirmationValues = {
  email: '',
  terms: false,
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

interface PostDataInterface {
  subscription: SubscriptionValues
  paymentData: PaymentDataValues
  confirmation: ConfirmationValues
}

async function postData(data: PostDataInterface) {
  return await (await fetch(API_POST_DATA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })).json()
}

export default function Home({plans, error}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [subscription, setSubscription] = useState<SubscriptionValues>(initialSubscriptionValues)
  const [paymentData, setPaymentData] = useState<PaymentDataValues>(initialPaymentDataValues)
  const [confirmation, setConfirmation] = useState<ConfirmationValues>(initialConfirmationValues)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postError, setPostError] = useState<boolean>(false)
  const [postSucceed, setPostSucceed] = useState<boolean>(false)

  async function postDataRequest(data: PostDataInterface) {
    try {
      setIsLoading(true)
      await postData(data)
      setPostSucceed(true)
    } catch (e) {
      setPostError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (error || !plans) {
    return <Alert variant="danger">There is some error during fetching resources!</Alert>
  }

  if (postError) {
    return <Alert variant="danger">Sorry, something is wrong with posting data!</Alert>
  }

  if (isLoading) {
    return <Alert variant="primary">Loading!</Alert>
  }

  return (
    <Container>
      <Head>
        <title>MoBerries</title>
        <meta name="description" content="MoBerries"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Row>
        <Col>
          <Information subscription={subscription} plans={plans.subscription_plans}/>
          {postSucceed
            ? <Alert variant="primary">Submitted successfully!</Alert>
            : (<Steps
              onSubmit={async () => {
                await postDataRequest({
                  subscription,
                  confirmation,
                  paymentData
                })
              }}
              subscription={subscription}
              paymentData={paymentData}
              confirmation={confirmation}
              setSubscription={setSubscription}
              setPaymentData={setPaymentData}
              setConfirmation={setConfirmation}
            />)
          }
        </Col>
      </Row>
    </Container>
  )
}
