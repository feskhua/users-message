import React, { memo } from 'react';
import pt from 'prop-types';
import MatDrawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DrawerContent from '../drawer-content';

function Drawer({ classes, open, handleDrawerClose }) {
  return (
    <MatDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <DrawerContent />
    </MatDrawer>
  );
}

Drawer.propTypes = {
  classes: pt.object.isRequired,
  open: pt.bool.isRequired,
  handleDrawerClose: pt.func.isRequired,
};

export default memo(Drawer);
