import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/auth';

export const withAuth = (WrappedComponent: React.FC) => (props: any) => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const { isAuthenticated, loading } = context;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (!isMounted) {
    return null;
  }

  // If authentication is loading
  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  // If is authenticated renders the protected page
  return <WrappedComponent {...props} />;
};
