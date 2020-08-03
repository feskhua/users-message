import React from 'react';
import pt from 'prop-types';
import MatToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';

function ContactMessagesToolbar({ classes, onRefresh }) {
  return (
    <MatToolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Contact messages
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Refresh">
          <IconButton aria-label="Refresh" onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>
    </MatToolbar>
  );
}

ContactMessagesToolbar.propTypes = {
  classes: pt.object.isRequired,
  onRefresh: pt.func.isRequired,
};

export default ContactMessagesToolbar;
