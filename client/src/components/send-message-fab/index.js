import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as thunks from '../../store/thunks';
import SendMessageFab from './SendMessageFab';
import styles from './styles';

const mapStateToProps = null;

const mapDispatchToProps = {
  sendMessage: thunks.sendMessage,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(SendMessageFab),
  ),
);
