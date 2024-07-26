import { useAuth } from '@pangeacyber/react-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/toaster';
import { NavBar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

const Map = dynamic(() => import('@/components/Map'),{ 
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

export default function Demo() {

    const {authenticated, error, loading, user} = useAuth()
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
        <div>
          <NavBar/>

          <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
            <div className="space-y-4 mx-auto">
                <h1 className="text-2xl font-bold text-center">You're Authenticated</h1>
            </div>
          </div>
          <img className="space-y-4 mx-auto sm:pb-6" src='demoFlow.png'></img>
          <div className="mx-auto p-4 sm:p-6 md:p-8">
            <p className="text-muted-foreground">Choose a start and end date and time for your event.</p>
            <Map/>
          </div>
          
         
          <Toaster />
          <Footer />

        </div>
          
       ):  (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">You're NOT Authenticated</h1>
            </div>
          </div>
        </div>
       )}
       </>
    )
}

