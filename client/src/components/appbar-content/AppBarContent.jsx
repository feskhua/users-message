import React, { memo, Fragment } from 'react';
import pt from 'prop-types';
import classNames from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

function AppBarContent({ classes, handleDrawerOpen, open }) {
  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerOpen}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap>
        Kai Messenger
      </Typography>
    </Fragment>
  );
}

AppBarContent.propTypes = {
  classes: pt.object.isRequired,
  handleDrawerOpen: pt.func.isRequired,
  open: pt.bool.isRequired,
};

export default memo(AppBarContent);
