import "@/styles/globals.css";
import { ProvideStore } from "../utils/Store"; // Assuming your provider component is named ProvideStore
import { AppProps } from "next/app";

import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ProvideStore> {/* Wrap your entire application with the provider */}
      
        <Head>
          <title>Your Page Title</title>
          {/* Add any other meta tags, links, or scripts */}
        </Head>
        <Component {...pageProps} /> {/* Render the current page component */}

    </ProvideStore>
  );
}
