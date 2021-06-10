import * as yup from "yup";

export const confirmationValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  terms: yup.bool().required().oneOf([true], 'Need to agree with terms'),
});
