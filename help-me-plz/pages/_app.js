import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';

export default function MyApp({ Component,pageProps }) {
 
  return (
      
       <Component {...pageProps} />
   );
}

 