import React, { memo } from 'react';
import pt from 'prop-types';
import classNames from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '../appbar';
import AppBarContent from '../appbar-content';
import Drawer from '../drawer';
import { useToggleDrawer } from '../../utils/hooks';

function Layout({ children, classes }) {
  const { open, openDrawer, closeDrawer } = useToggleDrawer();

  return (
    <div className={classes.root}>
      <AppBar open={open}>
        <Toolbar disableGutters={!open}>
          <AppBarContent open={open} handleDrawerOpen={openDrawer} />
        </Toolbar>
      </AppBar>
      <Drawer open={open} handleDrawerClose={closeDrawer} />
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: pt.node.isRequired,
  classes: pt.object.isRequired,
};

export default memo(Layout);
