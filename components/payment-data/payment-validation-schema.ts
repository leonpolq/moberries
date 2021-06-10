import * as yup from "yup";
import valid from 'card-validator'; //import statement

export const paymentValidationSchema = yup.object().shape({
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
