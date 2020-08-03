import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class MessageForm extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    onSubmit: pt.func.isRequired,
    onCancel: pt.func.isRequired,
  };

  state = {
    message: '',
  };

  onChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.message);
  };

  render() {
    const { classes, onCancel } = this.props;
    const { onChange, onSubmit } = this;
    const { message } = this.state;
    const disabled = !message;
    return (
      <form noValidate onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Message"
              placeholder="Input message"
              name="message"
              onChange={onChange}
              value={message}
              fullWidth
              multiline
              rowsMax={25}
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.formActions}>
              <Button type="submit" color="primary" disabled={disabled}>
                Send
              </Button>
              <Button type="button" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default MessageForm;
