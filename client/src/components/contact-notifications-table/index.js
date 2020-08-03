import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as thunks from '../../store/thunks';
import * as selectors from '../../store/selectors';
import ContactNotificationsTable from './ContactNotificationsTable';
import styles from './styles';

const mapStateToProps = state => ({
  notificationMessages: selectors.getNotificationMessages(state),
  isNotificationMessagesLoading: selectors.isNotificationMessagesLoading(state),
});

const mapDispatchToProps = {
  loadContactNotificationMessages: thunks.loadContactNotificationMessages,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ContactNotificationsTable),
  ),
);
