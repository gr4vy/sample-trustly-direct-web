import Head from "next/head";
import { useEffect, useState } from "react";

const config = {
  amount: 12.99,
  country: "US",
  currency: "USD",
  baseUrl: "https://api.sandbox.spider.gr4vy.app"
};

const Home = () => {
  // Create a transaction server side
  const [transaction, setTransaction] = useState(null);
  const [session, setSession] = useState(null);

  const loadTrustlyScript = (url, callback) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      if (callback) callback();
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    const fetchSession = async (transaction) => {
      const response = await fetch(
        `${config.baseUrl}/transactions/${transaction.id}/session?token=${transaction.sessionToken}`,
        { method: "post" }
      );
      const data = await response.json();
      return data;
    };

    if (transaction) {
      fetchSession(transaction).then(setSession);
    }

  }, [transaction]);

  useEffect(() => {
    if (!transaction) {
      const fetchTransaction = async () => {
        const response = await fetch(
          `/api/transaction?${new URLSearchParams(config)}`
        );
        const data = await response.json();
        return data;
      };

      fetchTransaction().then(setTransaction);
    }
  }, [transaction]);

  useEffect(() => {
    if (session) {
      const { establishData, baseUrl } = session.session_data
      const method = establishData.paymentType == "Verification"
          ? 'establish'
          : 'selectBankWidget';
      const url = `${baseUrl}/start/scripts/trustly.js?accessId=${establishData.accessId}`

      loadTrustlyScript(url, () => {
        Trustly[method](establishData, {
          hideCloseButton: true,
          dragAndDrop: true,
          widgetContainerId: "component",
        });
      });
    }
  }, [session]);

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
