import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { logOutRequest } from 'redux/userSlice';

import css from '../App.module.scss';

const styles = {
  color: '#010101',
};

function Layout({ children }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);


  const handleLogOut = () => {
    dispatch(logOutRequest());
  }

  const isUserAuhenticated = userData !== null;
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
          {isUserAuhenticated ? (
            <>
              {' '}
              <NavLink
                className={({ isActive }) =>
                  cn(css.NavLink, { [css.active]: isActive })
                }
                to="/contacts"
              >
                Contacts
              </NavLink>
              <button onClick={handleLogOut} type='button'>Log Out</button>
            </>
          ) : (
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
