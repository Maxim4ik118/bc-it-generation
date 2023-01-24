import WithAdminHandlings from 'hoc/WithAdminHandling';
import React from 'react';

function Card({ admin = false }) {
  return <div>{admin ? 'Admin' : 'User'} Card</div>;
}

export default WithAdminHandlings(Card);
