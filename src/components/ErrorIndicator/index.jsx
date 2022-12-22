import React from 'react';

function ErrorIndicator({ error = '' }) {
  return <p>Oops, something went wrong... <b>{error}</b></p>;
}

export default ErrorIndicator;
