import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import VerifierRegistrationForm from './Components/VerifierRegistrationForm';
import LoginForm from './Components/LoginForm';
import EmployerLoginForm from './Components/EmployerLoginForm';
import Home from './Components/Home';
import VerifierDashboard from './Components/VerifierDashboard';
import VerifierProfile from './Components/VerifierProfile';
import EmployerDashboard from './Components/EmployerDashboard';
import EmployerProfile from './Components/EmployerProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={LoginForm} />
        <Route
          path='/verifier-signup'
          exact
          component={VerifierRegistrationForm}
        />
        <Route path='/employer-login' exact component={EmployerLoginForm} />
        <Route path='/verifier-dashboard' exact component={VerifierDashboard} />
        <Route path='/verifier-profile' exact component={VerifierProfile} />
        <Route path='/employer-dashboard' exact component={EmployerDashboard} />
        <Route path='/employer-profile' exact component={EmployerProfile} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
