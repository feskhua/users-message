import React from 'react';
import pt from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(({ children, classes, onClose }) => {
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

function Modal({ children, title, onClose, open, modalActions }) {
  return (
    <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title" onClose={onClose}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {modalActions && <DialogActions>{modalActions}</DialogActions>}
    </Dialog>
  );
}

Modal.propTypes = {
  children: pt.node.isRequired,
  title: pt.string,
  open: pt.bool.isRequired,
  onClose: pt.func,
  modalActions: pt.node,
};

Modal.defaultProps = {
  modalActions: null,
  title: '',
};

export default Modal;
