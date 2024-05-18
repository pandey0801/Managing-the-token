import { Fragment } from 'react';
// import { Link, Router } from 'react-router-dom';

// import classes from './MainNavigation.module.css';


import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
