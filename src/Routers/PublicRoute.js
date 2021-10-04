import React, { useState, useEffect, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from '../utils/LoadingPage';

const initialState = {
  isAuth: false,
  userType: '',
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState(initialState);

  const store = useSelector((store) => store);

  useEffect(() => {
    const findDetails = () => {
      // if (store?.adminReducer?.isAuthenticated) {
      //   setDetails({ ...details, userType: 'admin', isAuth: true });
      // }
      if (store?.verifierReducer?.isAuthenticated) {
        setDetails({
          ...details,
          userType: 'verifier-dashboard',
          isAuth: true,
        });
      }
      if (store?.employerReducer?.isAuthenticated) {
        setDetails({
          ...details,
          userType: 'employer-dashboard',
          isAuth: true,
        });
      }
      if (store?.adminReducer?.isAuthenticated) {
        setDetails({
          ...details,
          userType: 'admin/dashboard',
          isAuth: true,
        });
      }
    };
    findDetails();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading, store, details]);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Route
          {...rest}
          component={(props) =>
            details.isAuth ? (
              <Redirect to={`/${details.userType}/`} />
            ) : (
              <Component {...props} />
            )
          }
        />
      )}
    </Fragment>
  );
};

export default PublicRoute;
