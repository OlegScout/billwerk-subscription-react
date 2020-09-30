# Installation

## `npm install`

Install all needed dependencies 

## `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# Configuration

Is done in `constants.ts`

| Property                 | Description |
| :---                     | :--- |
| publicApiKey             | The publicApiKey used to authenticate yourself against the API, found [here](https://sandbox.billwerk.com/#/settings/self-service) |
| providerReturnUrl        | A url that will be used to redirect users back to your site when using a payment provider that requires redirects, such as PayPal. The page at this url must invoke the SubscriptionJS.finalize() method. **This parameter is required when using PSPs that rely on redirects (e.g. with checkoutpages).** |
| paymentServiceProvider   | Your PSP, available values `Adyen`, `Paymill`, `PayOne`, `WirecardElastic`, `Stripe`, `Heidelpay` or `FakePSP` |
| planVariantIdUrlParamName| ID of the planvariant you want to order |

# Restrictions

Only paymentmethod available for now is CC
Tested with npm v6.14.8 (30.09.2020)
