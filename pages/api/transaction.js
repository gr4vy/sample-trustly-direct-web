import { Client } from "@gr4vy/node"
import fs from "fs"

const key = String(fs.readFileSync("./private_key.pem"))

export default async (request, response) => {
  const { amount, currency, country, baseUrl } = request.query

  const client = new Client({
    privateKey: key,
    baseUrl: baseUrl
  });

  const res = await client.newTransaction("", {
    "amount": amount*100,
    "paymentMethod": {
        "method": "trustly",
        "redirectUrl": "https://example.com/return-url",
        "country": country,
        "currency": currency
    },
    "country": country,
    "currency": currency,
    "intent": "capture"
  })

  response.status(200).json(res.response.body)
}
