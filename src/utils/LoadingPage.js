import React from 'react';
import loaderPage from '../images/loaderPage.gif';

const LoadingPage = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <img
        src={loaderPage}
        alt='loader'
        style={{ height: '5rem', width: '5rem' }}
      />
    </div>
  );
};

export default LoadingPage;
