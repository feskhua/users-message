import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ContactMessagesToolbar from '../contact-messages-toolbar';
import * as utils from '../../utils';

const rows = [
  { id: 'from', label: 'From' },
  { id: 'to', label: 'To' },
  { id: 'date', label: 'Date' },
  { id: 'body', label: 'Message body' },
  { id: 'status', label: 'Status' },
  { id: 'error', label: 'Error' },
];

class ContactMessagesTable extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    inboundOutbound: pt.array,
    isInboundLoading: pt.bool.isRequired,
    isOutboundLoading: pt.bool.isRequired,
    loadContactInbound: pt.func.isRequired,
    loadContactOutbound: pt.func.isRequired,
  };

  static defaultProps = {
    inboundOutbound: null,
  };

  state = {
    page: 0,
    rowsPerPage: 10,
    modalOpen: false,
  };

  componentDidMount() {
    this.loadContactMessages();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  loadContactMessages = () => {
    const { match } = this.props;

    this.props.loadContactInbound(match.params.contactId);
    this.props.loadContactOutbound(match.params.contactId);
  };

  isLoading = () => {
    const { isInboundLoading, isOutboundLoading, inboundOutbound } = this.props;
    return !inboundOutbound && (isInboundLoading || isOutboundLoading);
  };

  renderInboundRow = ({ From, To, createdAt, Body, SmsStatus, error = '' }) => (
    <TableRow hover>
      <TableCell align="right">{From}</TableCell>
      <TableCell align="right">{To}</TableCell>
      <TableCell padding="dense">
        {createdAt && utils.formatDate(createdAt)}
      </TableCell>
      <TableCell padding="none">{Body}</TableCell>
      <TableCell padding="dense">{SmsStatus}</TableCell>
      <TableCell>{error}</TableCell>
    </TableRow>
  );

  renderOutboundRow = ({
    from,
    to,
    createdAt,
    body,
    status,
    messageStatus,
    errorMessage = '',
  }) => (
    <TableRow hover>
      <TableCell align="right">{from}</TableCell>
      <TableCell align="right">{to}</TableCell>
      <TableCell padding="dense">
        {createdAt && utils.formatDate(createdAt)}
      </TableCell>
      <TableCell padding="none">{body}</TableCell>
      <TableCell padding="dense">{messageStatus ? messageStatus.MessageStatus : status}</TableCell>
      <TableCell>{errorMessage}</TableCell>
    </TableRow>
  );

  render() {
    if (this.isLoading()) {
      return null;
    }
    const { classes, inboundOutbound } = this.props;

    const {
      renderInboundRow: InboundRow,
      renderOutboundRow: OutboundRow,
    } = this;
    const { rowsPerPage, page } = this.state;
    const messagesLength = inboundOutbound.length;
    return (
      <Paper className={classes.root}>
        <ContactMessagesToolbar onRefresh={this.loadContactMessages} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {rows.map(row => (
                  <TableCell key={row.id}>{row.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inboundOutbound
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(message =>
                  message.type === 'inbound' ? (
                    <InboundRow key={message.id} {...message} />
                  ) : (
                    <OutboundRow key={message.id} {...message} />
                  ),
                )}
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

export default ContactMessagesTable;
