import "../styles/globals.css";
import GoogleAnalytics from "../components/GoogleAnalytics";
import usePageView from '../hooks/usePageView'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  usePageView() 

  return (
  <>
  <GoogleAnalytics/>
  <Component {...pageProps} />;
  <Analytics />

  </>
)  
}

export default MyApp;
