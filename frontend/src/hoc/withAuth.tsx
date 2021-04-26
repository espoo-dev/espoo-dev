import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/auth';

export const withAuth = (WrappedComponent: React.FC) => (props: unknown) => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const { isAuthenticated, loading, checkToken } = context;
  const [isMounted, setIsMounted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const shouldRender = async () => {
      const result = await checkToken();
      setChecking(result);
    };

    shouldRender();
  }, [checking]);

  useEffect(() => {
    if (!checking && !loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, checking]);

  if (!isMounted) {
    return null;
  }

  // If authentication is loading
  if (loading || checking) {
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
