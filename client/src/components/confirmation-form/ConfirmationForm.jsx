import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ConfirmationForm extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    onConfirm: pt.func.isRequired,
    onCancel: pt.func.isRequired,
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onConfirm();
  };

  render() {
    const { classes, onCancel } = this.props;
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.formActions}>
              <Button type="submit" color="primary">
                Confirm
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

export default ConfirmationForm;
