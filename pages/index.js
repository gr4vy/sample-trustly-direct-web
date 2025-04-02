import Head from "next/head";
import { useEffect, useState } from "react";

const config = {
  amount: 12.99,
  country: "US",
  currency: "USD",
  baseUrl: "http://localhost:8000",
  merchantAccountId: "default",
  sandbox: true,
};

const Home = () => {
  // Create a transaction server side
  const [transaction, setTransaction] = useState(null);

  const loadTrustlyScript = (url, callback) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      if (callback) callback();
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await fetch(
        `/api/transaction?${new URLSearchParams(config)}`
      );
      const data = await response.json();
      return data;
    };

    fetchTransaction().then((transaction) => setTransaction(transaction));
  }, []);

  useEffect(() => {
    if (transaction) {
      const {
        widget_method: method,
        widget_establish_data: data,
        widget_trustly_url: url,
      } = transaction.additional_identifiers;
      const options = JSON.parse(data);

      loadTrustlyScript(url, () => {
        Trustly[method](options, {
          hideCloseButton: true,
          dragAndDrop: true,
          widgetContainerId: "component",
        });
      });
    }
  }, [transaction]);

  return (
    <>
      <Head>
        <title>Sample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div id="component"></div>
      </main>
    </>
  );
};

export default Home;
