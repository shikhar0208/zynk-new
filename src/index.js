import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import App, { history } from './App';
import store from './redux/store';
import LoadingPage from './utils/LoadingPage';
import './index.css';

import {
  setVerifierDetails,
  verifierLogout,
} from './redux/actions/VerfierActions';

import {
  setEmployerDetails,
  employerLogout,
} from './redux/actions/EmployerActions';

import { adminLogin, adminLogout } from './redux/actions/AdminActions';

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRender = false;

const findUser = () => {
  if (Cookies.get('verifier_zynk_id')) {
    const verifierId = Cookies.get('verifier_zynk_id');
    store
      .dispatch(setVerifierDetails(verifierId, history))
      .then(() => renderApp());
  } else {
    store.dispatch(verifierLogout()).then(() => renderApp());
  }

  if (Cookies.get('employer_zynk_id')) {
    const employerId = Cookies.get('employer_zynk_id');
    store
      .dispatch(setEmployerDetails(employerId, history))
      .then(() => renderApp());
  } else {
    store.dispatch(employerLogout()).then(() => renderApp());
  }

  if (Cookies.get('adminLogin')) {
    const formData = {
      email_id: 'admin@gmail.com',
      password: 'Admin123',
    };

    store.dispatch(adminLogin(formData, history)).then(() => renderApp());
  } else {
    store.dispatch(adminLogout()).then(() => renderApp());
  }
};

const renderApp = () => {
  if (!hasRender) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRender = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

findUser();
