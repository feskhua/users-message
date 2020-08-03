import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import * as thunks from '../../store/thunks';
import * as selectors from '../../store/selectors';
import ContactInfo from './ContactInfo';
import styles from './styles';

const mapStateToProps = state => ({
  activeContact: selectors.getActiveContact(state),
});

const mapDispatchToProps = {
  loadContactInfo: thunks.loadContactInfo,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ContactInfo),
  ),
);
