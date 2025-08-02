import Head from "next/head";
import "../style/globals.css";

import { Provider } from "react-redux";
import store from "../store/store";

import Nav from "../components/Nav";
import { Footer } from "../components/Footer";
import WebVitalsMonitor from "../components/WebVitals";
import PerformanceDashboard from "../components/PerformanceDashboard";

export default function App({ Component, pageProps }) {
   return (
      <>
         <Head>
            <title>Ecommerce Shoes - Premium Sneakers Collection</title>
            <meta
               name="description"
               content="Discover the latest collection of premium sneakers from Nike, Adidas, Puma and more. Free shipping on orders over $100."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Provider store={store}>
            <WebVitalsMonitor />
            <PerformanceDashboard />
            <Nav />
            <Component {...pageProps} />
            <Footer />
         </Provider>
      </>
   );
}
