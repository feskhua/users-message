import React from 'react';
import pt from 'prop-types';
import classNames from 'clsx';
import MatToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function ContactsTableToolbar({
  numSelected,
  classes,
  openSendDialog,
  openRemoveDialog,
}) {
  return (
    <MatToolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Contacts
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Grid container spacing={16}>
            <Grid item>
              <Tooltip title="Remove messages">
                <Button
                  color="secondary"
                  variant="contained"
                  aria-label="Remove"
                  onClick={openRemoveDialog}
                >
                  Remove
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Send message">
                <Button
                  color="primary"
                  variant="contained"
                  aria-label="Send"
                  onClick={openSendDialog}
                >
                  Send
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </div>
    </MatToolbar>
  );
}

ContactsTableToolbar.propTypes = {
  classes: pt.object.isRequired,
  numSelected: pt.number.isRequired,
  openSendDialog: pt.func.isRequired,
  openRemoveDialog: pt.func.isRequired,
};

export default ContactsTableToolbar;
