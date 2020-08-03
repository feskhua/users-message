import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DrawerContent from './DrawerContent';
import styles from './styles';

export default withStyles(styles)(withRouter(DrawerContent));
