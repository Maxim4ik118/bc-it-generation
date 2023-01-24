import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function WithAuthRedirect(Component, navigateTo) {
  const ProtectedComponent = props => {
    const userData = useSelector(state => state.auth.userData);

    return userData !== null ? (
      <Component {...props} />
    ) : (
      <Navigate to={navigateTo} />
    );
  };

  return ProtectedComponent;
}

export default WithAuthRedirect;
