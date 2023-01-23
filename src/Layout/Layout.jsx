import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import css from '../App.module.scss';
import { useSelector } from 'react-redux';

const styles = {
  color: '#010101',
};

function Layout({ children }) {
  const userData = useSelector(state => state.auth.userData);

  return (
    <div style={styles}>
      <header className={css.header}>
        <nav>
          {/* <NavLink
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
          </NavLink> */}
          {userData !== null ? (
            <NavLink
              className={({ isActive }) =>
                cn(css.NavLink, { [css.active]: isActive })
              }
              to="/contacts"
            >
              Contacts
            </NavLink>
          ) : null}
          {userData !== null ? null : (
            <>
              <NavLink
                className={({ isActive }) =>
                  cn(css.NavLink, { [css.active]: isActive })
                }
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  cn(css.NavLink, { [css.active]: isActive })
                }
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
}

export default Layout;
