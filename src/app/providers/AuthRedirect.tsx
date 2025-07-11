'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import api from '@/lib/api';

export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {name} = useSelector((state: { auth: any }) => state.auth);

  useEffect(() => {

    if(name == undefined || name == ''){
        router.push('/auth/login')
     }

    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        const status = error?.response?.status;

        if (status === 401) {
          router.push('/auth/login');
        } else if (status === 403) {
          router.push('/forbidden');
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor); // cleanup
    };
  }, [router]);

  

  return <>{children}</>;
}
