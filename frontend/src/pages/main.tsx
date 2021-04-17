import { AuthContext } from 'context/auth';
import { withAuth } from 'hoc/withAuth';
import React, { useContext } from 'react';

const Main = () => {
  const context = useContext(AuthContext);
  const { logout } = context;

  return (
    <div>
      Main page
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default withAuth(Main);
