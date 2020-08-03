import React, { Fragment, PureComponent } from 'react';
import pt from 'prop-types';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MessageForm from '../message-form';
import Modal from '../modal';

class SendMessageFab extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    match: pt.object.isRequired,
    sendMessage: pt.func.isRequired,
  };

  state = {
    open: false,
  };

  onSend = message => {
    const { match, sendMessage } = this.props;
    const { contactId } = match.params;

    sendMessage(contactId, message);
    this.closeModal();
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { onSend, openModal, closeModal } = this;
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Fab
          color="primary"
          aria-label="Send"
          component="span"
          className={classes.fab}
          onClick={openModal}
        >
          <SendIcon />
        </Fab>
        <Modal title="Send message" open={open} onClose={closeModal}>
          <MessageForm onSubmit={onSend} onCancel={closeModal} />
        </Modal>
      </Fragment>
    );
  }
}

export default SendMessageFab;
