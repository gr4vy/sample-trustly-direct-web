import { Gr4vy, withToken } from "@gr4vy/sdk";
import fs from "fs";


export default async (request, response) => {
    const { amount, server, id, country, currency } = JSON.parse(fs.readFileSync('config.json', 'utf8'));

    const gr4vy = new Gr4vy({
        server,
        id,
        bearerAuth: withToken({
          privateKey: fs.readFileSync("private_key.pem", "utf8"),
        }),
    });

    const result = await gr4vy.transactions.create({
        "amount": amount,
        "paymentMethod": {
          "method": "trustly",
          "redirectUrl": "https://example.com/return-url",
          "country": country,
          "currency": currency
        },
        "integrationClient": "web",
        "country": country,
        "currency": currency,
        "intent": "capture"
    });    

    response.status(200).json(result)

}
