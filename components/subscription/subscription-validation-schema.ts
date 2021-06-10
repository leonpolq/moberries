import * as yup from "yup";

export const subscriptionValidationSchema = yup.object().shape({
  duration: yup.number().required().oneOf([3, 6, 12]),
  gigabytes: yup.number().required().oneOf([5, 10, 50]),
  upfrontPayment: yup.bool().required(),
});
