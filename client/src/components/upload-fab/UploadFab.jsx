import React, { Fragment, PureComponent } from 'react';
import pt from 'prop-types';
import Fab from '@material-ui/core/Fab';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import * as utils from '../../utils';

class UploadFab extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    uploadCsv: pt.func.isRequired,
  };

  state = {
    key: 0,
  };

  onChange = ({ target }) => {
    const { name, files } = target;
    if (files) {
      const formData = utils.createFormData(name, files[0]);
      this.props.uploadCsv(formData);
      this.setState({ key: this.state.key + 1 });
    }
  };

  render() {
    const { onChange } = this;
    const { classes } = this.props;
    return (
      <Fragment>
        <input
          key={this.state.key}
          accept="text/csv"
          className={classes.input}
          id="fab-add-file"
          type="file"
          name="csv"
          onChange={onChange}
        />
        <label htmlFor="fab-add-file">
          <Fab
            color="primary"
            aria-label="Add"
            component="span"
            className={classes.fab}
          >
            <GroupAddIcon />
          </Fab>
        </label>
      </Fragment>
    );
  }
}

export default UploadFab;
