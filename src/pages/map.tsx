import { useAuth } from '@pangeacyber/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/toaster';

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
        <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
          <div className="space-y-4">
           <div>
             <h1 className="text-2xl font-bold">You're Authenticated</h1>
             <p className="text-muted-foreground">Choose a start and end date and time for your event.</p>
           </div>
           <Map/>
           <Toaster />
          </div>
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

