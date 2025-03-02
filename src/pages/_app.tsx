// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/app.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { HeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TvLoader from '../components/ui/Loader/TvLoader';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <main>
      <Provider store={store} >
        <HeroUIProvider>
        {loading && <TvLoader />}
          <Component {...pageProps} />
        </HeroUIProvider>
      </Provider>
    </main>
  );
}

export default MyApp;
