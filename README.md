# Sample: Trustly POC without redirect

## Testing the sample

To run this sample please perform the following steps.

<details>

<summary>Instructions</summary>

### Preparation

- Create an API key in your Gr4vy dashboard and save it as `./private_key.pem`
- Change any of the config values in `pages/index.js` to define your `gr4vyId`, `environment`, and `merchantAccountId`
- Install Node `v18` or above as well as the dependencies for this project
  - Run `npm install`
- Start the server with `npm run dev`

### Running on HTTPS

Next, it's possible to run the sample on HTTPs. We recommend using a free tool like [Ngrok](https://ngrok.com).

- Expose your site over HTTPs with `ngrok`
  - Run `ngrok http 3000`
  - This exposes your site on an Ngrok domain, for example `https://40be-88-97-18-163.ngrok.io`
