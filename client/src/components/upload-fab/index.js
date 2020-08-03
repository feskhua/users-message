import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as thunks from '../../store/thunks';
import UploadFab from './UploadFab';
import styles from './styles';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  uploadCsv: thunks.uploadCsv,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UploadFab),
);
