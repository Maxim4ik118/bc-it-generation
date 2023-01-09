import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import css from '../App.module.scss';

const styles = {
    color: '#010101',
  };

function Layout({children}) {
  return (
    <div style={styles}>
      <header className={css.header}>
        <nav>
          <NavLink
            // className={css.NavLink}
            className={({ isActive }) =>
              cn(css.NavLink, { [css.active]: isActive })
            }
            // className={({ isActive }) =>
            //   isActive ? `${css.NavLink} ${css.active}` : `${css.NavLink}`
            // }
            to="/"
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(css.NavLink, { [css.active]: isActive })
            }
            to="/details"
          >
            Details
          </NavLink>
        </nav>
      </header>
      {children}
    </div>
  );
}

export default Layout;
