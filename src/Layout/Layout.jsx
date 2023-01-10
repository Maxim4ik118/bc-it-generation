import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import css from '../App.module.scss';

const styles = {
  color: '#010101',
};

function Layout({ children }) {
  return (
    <div style={styles}>
      <header className={css.header}>
        <nav>
          <NavLink
            className={({ isActive }) =>
              cn(css.NavLink, { [css.active]: isActive })
            }
            to="/"
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(css.NavLink, { [css.active]: isActive })
            }
            to="/posts"
          >
            Search Post
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
