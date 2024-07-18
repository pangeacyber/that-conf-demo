import { useAuth } from '@pangeacyber/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import TimeFilter from '@/components/TimeFilter';

const Map = dynamic(() => import('@/components/Map'),{ 
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

export default function Completion() {

    const {authenticated, error, logout, loading, user} = useAuth()
    const router = useRouter();
  
  
    useEffect(() => {
      console.log(user)
      if (!loading && !error && !authenticated) {
        router.push("/");
      }
    }, [error, authenticated, loading]);  
   
    return (
     <>
      {authenticated ? (
        <main>
          <h1>You're Authenticated</h1>
          <TimeFilter/>
          <Map/>
        </main>
       ):  (
        <h1>YOU"RE NOT AUTHENTICATED</h1>
       )}
       </>
    )
}