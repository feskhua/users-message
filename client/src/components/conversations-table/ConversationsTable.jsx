import React, { Fragment, PureComponent } from 'react';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import Send from '@material-ui/icons/Send';
import Reply from '@material-ui/icons/Reply';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ConversationsToolbar from '../conversations-toolbar';
import Modal from '../modal';
import MessageForm from '../message-form';
import * as utils from '../../utils';

const rows = [
  { id: 'createdAt', label: 'Date' },
  { id: 'phoneNumber', label: 'Phone number' },
  { id: 'prospectName', label: 'Prospect name' },
  { id: 'productName', label: 'Product name' },
  { id: 'body', label: 'Body' },
  { id: 'details', label: 'Details' },
  { id: 'reply', label: 'Reply' },
];

class ConversationsTable extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    conversations: pt.array,
    notifications: pt.array,
    isConversationsLoading: pt.bool.isRequired,
    sendMessage: pt.func.isRequired,
    loadConversations: pt.func.isRequired,
    loadNotifications: pt.func.isRequired,
    order: pt.string,
    pagination: pt.object,
  };

  static defaultProps = {
    conversations: null,
    notifications: null,
    order: null,
    pagination: null,
  };

  state = {
    contact: null,
    modalOpen: false,
    filter: '',
    notificationSelected: '',
  };

  componentDidMount() {
    this.loadConversations({ limit: 25 });
  }

  loadConversations = (params = {}) => {
    this.props.loadNotifications();
    this.props.loadConversations(params);
  };

  handleRefresh = () => {
    const { limit, offset } = this.props.pagination;
    this.props.loadConversations({ limit, offset });
    this.props.loadNotifications();
  };

  handleChangePage = (event, page) => {
    const { pagination, loadConversations } = this.props;
    const { limit } = pagination;
    const offset = limit * page;
    loadConversations({ limit, offset });
  };

  handleChangeRowsPerPage = ({ target }) => {
    const { loadConversations } = this.props;
    const limit = target.value;
    loadConversations({ limit, offset: 0 });
  };

  isLoading = () => {
    const { conversations, pagination } = this.props;
    return !conversations || !pagination;
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  filterByMessage = filter => ({ lastMessage }) => {
    if (!filter) {
      return true;
    }

    if (filter === 'Outbound') {
      return (
        lastMessage.type === 'NotificationMessage' ||
        lastMessage.type === 'InboundMessage'
      );
    }

    return lastMessage.type === 'Sms';
  };

  filterByNotification = filter => contact => {
    if (!filter) {
      return true;
    }

    return (
      contact.notificationMessages &&
      contact.notificationMessages.some(
        notification => notification.notificationId === filter,
      )
    );
  };

  toggleModal = contact => {
    this.setState(({ modalOpen }) => ({ contact, modalOpen: !modalOpen }));
  };

  onSend = message => {
    const { contact } = this.state;
    const { sendMessage } = this.props;

    sendMessage(contact.id, message);
    this.toggleModal(null);
  };

  renderConversationRow = contact => {
    const {
      id,
      phoneNumber,
      createdAt,
      prospectName,
      productName,
      lastMessage,
    } = contact;

    return (
      <TableRow hover>
        <TableCell align="center" padding="dense">
          {phoneNumber}
        </TableCell>
        <TableCell align="center" padding="dense">
          {createdAt && utils.formatDate(createdAt)}
        </TableCell>
        <TableCell align="center" padding="dense">
          {prospectName}
        </TableCell>
        <TableCell align="center" padding="dense">
          {productName}
        </TableCell>
        <TableCell padding="none">
          {lastMessage.data && (lastMessage.data.body || lastMessage.data.Body)}
        </TableCell>
        <TableCell align="center" padding="dense">
          <IconButton component={Link} to={`/contacts/${id}`}>
            <LinkIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center" padding="dense">
          <IconButton onClick={() => this.toggleModal(contact)}>
            {this.renderReplyIcon(lastMessage)}
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  renderReplyIcon(lastMessage) {
    if (
      !lastMessage ||
      lastMessage.type === 'NotificationMessage' ||
      lastMessage.type === 'InboundMessage'
    ) {
      return <Send />;
    }

    return <Reply />;
  }

  render() {
    if (this.isLoading()) {
      return null;
    }

    const { classes, notifications, conversations, pagination } = this.props;
    const { renderConversationRow: ConversationRow } = this;
    const { filter, notificationSelected, modalOpen, contact } = this.state;
    const { limit, offset, total } = pagination;
    const page = Math.ceil(offset / limit);
    const filteredContacts = conversations
      .filter(this.filterByMessage(filter))
      .filter(this.filterByNotification(notificationSelected));

    return (
      <Fragment>
        <Paper className={classes.root}>
          <ConversationsToolbar
            onRefresh={this.handleRefresh}
            notifications={notifications}
            notificationSelected={notificationSelected}
          />
          <div className={classes.filterToolbar}>
            <div>
              <InputLabel htmlFor="notificationFilter">
                Select Notification Filter:{' '}
              </InputLabel>
              <Select
                displayEmpty
                autoWidth
                id="notificationFilter"
                name="notificationSelected"
                value={notificationSelected}
                onChange={this.onChange}
                classes={{ root: classes.selectRoot }}
              >
                <MenuItem value="">All</MenuItem>
                {notifications.map(notification => (
                  <MenuItem
                    key={notification.id}
                    value={notification.id}
                    classes={{ root: classes.menuItem }}
                  >
                    {notification.message}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <InputLabel htmlFor="messageFilter">
                Select Message Filter:{' '}
              </InputLabel>
              <Select
                displayEmpty
                autoWidth
                id="messageFilter"
                name="filter"
                value={filter}
                onChange={this.onChange}
                classes={{ root: classes.selectRoot }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Inbound">Inbound</MenuItem>
                <MenuItem value="Outbound">Outbound</MenuItem>
              </Select>
            </div>
          </div>
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
                {filteredContacts.map(contact => (
                  <ConversationRow key={contact.id} {...contact} />
                ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={total}
            rowsPerPage={limit}
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
        <Modal
          title={`Send message to ${contact &&
            (contact.prospectName || contact.phoneNumber)}`}
          open={modalOpen}
          onClose={this.toggleModal}
        >
          <MessageForm onSubmit={this.onSend} onCancel={this.toggleModal} />
        </Modal>
      </Fragment>
    );
  }
}

export default ConversationsTable;
