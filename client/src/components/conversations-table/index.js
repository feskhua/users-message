import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as thunks from '../../store/thunks';
import * as selectors from '../../store/selectors';
import ConversationsTable from './ConversationsTable';
import styles from './styles';

const mapStateToProps = state => ({
  conversations: selectors.getConversations(state),
  isConversationsLoading: selectors.isConversationsLoading(state),
  notifications: selectors.getNotifications(state),
  order: selectors.getConversationsOrder(state),
  pagination: selectors.getConversationsPagination(state),
});

const mapDispatchToProps = {
  loadNotifications: thunks.loadNotifications,
  loadConversations: thunks.loadConversations,
  sendMessage: thunks.sendMessage,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ConversationsTable),
  ),
);
