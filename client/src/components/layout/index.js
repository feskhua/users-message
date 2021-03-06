import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Layout from './Layout';
import styles from './styles';

export default withStyles(styles)(withRouter(Layout));
