import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ContactNotificationsToolbar from '../contact-notifications-toolbar';
import * as utils from '../../utils';

const rows = [
  { id: 'from', label: 'From' },
  { id: 'to', label: 'To' },
  { id: 'date', label: 'Date' },
  { id: 'body', label: 'Notification body' },
  { id: 'status', label: 'Status' },
  { id: 'error', label: 'Error' },
];

class ContactNotificationsTable extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    notificationMessages: pt.array,
    isNotificationMessagesLoading: pt.bool.isRequired,
    loadContactNotificationMessages: pt.func.isRequired,
  };

  static defaultProps = {
    notificationMessages: null,
  };

  state = {
    page: 0,
    rowsPerPage: 5,
    modalOpen: false,
  };

  componentDidMount() {
    this.loadContactNotificationMessages();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  loadContactNotificationMessages = () => {
    const { match } = this.props;

    this.props.loadContactNotificationMessages(match.params.contactId);
  };

  isLoading = () => {
    const { notificationMessages, isNotificationMessagesLoading } = this.props;
    return !notificationMessages && isNotificationMessagesLoading;
  };

  renderNotificationMessageRow = ({
    From,
    To,
    createdAt,
    notification,
    SmsStatus,
    ErrorCode = '',
  }) => (
    <TableRow hover>
      <TableCell align="center">{From}</TableCell>
      <TableCell align="center">{To}</TableCell>
      <TableCell align="center" padding="dense">
        {createdAt && utils.formatDate(createdAt)}
      </TableCell>
      <TableCell padding="none">
        {notification ? notification.message : ''}
      </TableCell>
      <TableCell padding="dense" align="center">
        {SmsStatus}
      </TableCell>
      <TableCell padding="dense" align="center">
        {ErrorCode}
      </TableCell>
    </TableRow>
  );

  render() {
    if (this.isLoading()) {
      return null;
    }
    const { classes, notificationMessages } = this.props;

    const { renderNotificationMessageRow: NotificationMessageRow } = this;
    const { rowsPerPage, page } = this.state;
    const messagesLength = notificationMessages.length;
    return (
      <Paper className={classes.root}>
        <ContactNotificationsToolbar
          onRefresh={this.loadContactNotificationMessages}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {rows.map(row => (
                  <TableCell align="center" padding="dense" key={row.id}>
                    {row.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {notificationMessages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(message => (
                  <NotificationMessageRow key={message.id} {...message} />
                ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={messagesLength}
          rowsPerPage={rowsPerPage}
          page={page}
          classes={{ spacer: classes.spacer }}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default ContactNotificationsTable;
