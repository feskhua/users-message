import React, { memo } from 'react';
import pt from 'prop-types';
import classNames from 'clsx';
import MatAppBar from '@material-ui/core/AppBar';

function AppBar({ classes, open, ...props }) {
  return (
    <MatAppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      {...props}
    />
  );
}

AppBar.propTypes = {
  classes: pt.object.isRequired,
  open: pt.bool.isRequired,
};

export default memo(AppBar);
