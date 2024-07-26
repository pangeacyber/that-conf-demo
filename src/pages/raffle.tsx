import RaffleComponent from '@/components/raffle-component';
import { useAuth } from '@pangeacyber/react-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NavBar } from '@/components/ui/navbar';


export default function Raffle() {

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
        <NavBar/>
        <RaffleComponent user={user} />
      </>
    )
}

