import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "context/auth";

export const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const Router = useRouter();
    const context = useContext(AuthContext);
    const { isAuthenticated, loading } = context;

    useEffect(() => {
      if (!isAuthenticated) {
        Router.replace("/login");
      }
    }, []);

    // If authentication is loading
    if (loading) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Loading...</p>
        </div>
      );
    }

    // If is authenticated renders the protected page
    return <WrappedComponent {...props} />;
  };
};
