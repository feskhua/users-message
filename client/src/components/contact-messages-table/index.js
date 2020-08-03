import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as thunks from '../../store/thunks';
import * as selectors from '../../store/selectors';
import ContactMessagesTable from './ContactMessagesTable';
import styles from './styles';

const mapStateToProps = state => ({
  inboundOutbound: selectors.getCombinedInboundOutbound(state),
  isInboundLoading: selectors.isInboundLoading(state),
  isOutboundLoading: selectors.isOutboundLoading(state),
});

const mapDispatchToProps = {
  loadContactInbound: thunks.loadContactInbound,
  loadContactOutbound: thunks.loadContactOutbound,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ContactMessagesTable),
  ),
);
