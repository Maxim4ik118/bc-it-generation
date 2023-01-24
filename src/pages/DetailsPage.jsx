import Details from 'components/Details/Details';
import WithAuthRedirect from 'hoc/WithAuthRedirect';

import React from 'react';

function DetailsPage() {
  return (
    <div>
      <h1>DetailsPage</h1>
      <Details />
    </div>
  );
}



export default WithAuthRedirect(DetailsPage, "/login");
