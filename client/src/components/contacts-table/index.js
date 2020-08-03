import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as thunks from '../../store/thunks';
import * as selectors from '../../store/selectors';
import ContactsTable from './ContactsTable';
import styles from './styles';

const mapStateToProps = state => ({
  contacts: selectors.getContacts(state),
  order: selectors.getContactsOrder(state),
  pagination: selectors.getContactsPagination(state),
  csvStatus: selectors.getCsvStatus(state),
});

const mapDispatchToProps = {
  loadContacts: thunks.loadContacts,
  removeContacts: thunks.removeContacts,
  notifyContacts: thunks.notifyContacts,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ContactsTable),
  ),
);
