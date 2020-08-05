import React, { Component, Fragment } from 'react';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
import MatTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import LinkIcon from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';
import ContactsTableHeader from '../contacts-table-header/ContactsTableHeader';
import ContactsTableToolbar from '../contacts-table-toolbar';
import Modal from '../modal';
import MessageForm from '../message-form';
import ConfirmationForm from '../confirmation-form';
import * as utils from '../../utils';

const rows = [
  {
    id: 'visitDate',
    numeric: false,
    disablePadding: true,
    label: 'Visit date',
  },
  {
    id: 'phoneNumber',
    numeric: true,
    disablePadding: false,
    label: 'Phone number',
  },
  { id: 'emailAddress', numeric: false, disablePadding: true, label: 'Email' },
  {
    id: 'prospectName',
    numeric: false,
    disablePadding: true,
    label: 'Prospect name',
  },
  {
    id: 'productName',
    numeric: false,
    disablePadding: true,
    label: 'Product name',
  },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'updatedAt', numeric: false, disablePadding: true, label: 'Updated' },
];

class ContactsTable extends Component {
  state = {
    selected: [],
    modalOpen: false,
    confirmModalOpen: false,
  };

  componentDidMount() {
    this.props.loadContacts({ limit: 25 });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { loadContacts, csvStatus, pagination } = this.props;
    if (
      csvStatus !== nextProps.csvStatus &&
      nextProps.csvStatus === utils.STATUS_SUCCESS
    ) {
      const { limit, offset } = pagination;
      loadContacts({ limit, offset });
    }
  }

  handleRequestSort = (event, property) => {
    const { pagination, loadContacts } = this.props;
    const order = utils.setOrderForServer(this.props.order, property);
    loadContacts({ ...pagination, order });
  };

  handleSelectAllClick = event => {
    if (event.target.checked && this.props.contacts) {
      const { contacts } = this.props;
      const selected = contacts.map(utils.getId);
      this.setState({ selected });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    const { pagination, loadContacts } = this.props;
    const { limit } = pagination;
    const offset = limit * page;
    loadContacts({ limit, offset });
  };

  handleChangeRowsPerPage = ({ target }) => {
    const { loadContacts } = this.props;
    const limit = target.value;
    loadContacts({ limit, offset: 0 });
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  toggleConfirmModal = () => {
    this.setState(({ confirmModalOpen }) => ({
      confirmModalOpen: !confirmModalOpen,
    }));
  };

  removeContacts = () => {
    const { removeContacts } = this.props;
    removeContacts(this.state.selected);
    this.setState({ selected: [], confirmModalOpen: false });
  };

  onSendMessage = message => {
    const contacts = this.state.selected;
    if (message && contacts) {
      this.props.notifyContacts({ contacts, message });
    }

    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  isSelected = id => this.state.selected.includes(id);

  render() {
    const { classes, contacts, pagination } = this.props;
    if (!contacts || !this.props.order) {
      return null;
    }

    const { selected, modalOpen, confirmModalOpen } = this.state;
    const selectedLength = selected.length;
    const contactsLength = contacts.length;
    const { order, orderBy } = utils.getOrderAndOrderBy(this.props.order);
    const { offset, limit, total } = pagination;
    const page = Math.ceil(offset / limit);

    return (
      <Fragment>
        <Paper className={classes.root}>
          <ContactsTableToolbar
            numSelected={selectedLength}
            openSendDialog={this.toggleModal}
            openRemoveDialog={this.toggleConfirmModal}
          />
          <div className={classes.tableWrapper}>
            <MatTable className={classes.table} aria-labelledby="tableTitle">
              <ContactsTableHeader
                numSelected={selectedLength}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={contactsLength}
                rows={rows}
              />
              <TableBody>
                {contacts.map(contact => {
                  const isSelected = this.isSelected(contact.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, contact.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={contact.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell align="left" padding="none">
                        {utils.formatDate(contact.visitDate)}
                      </TableCell>
                      <TableCell align="right">{contact.phoneNumber}</TableCell>
                      <TableCell align="left" padding="none">
                        {contact.emailAddress}
                      </TableCell>
                      <TableCell align="left" padding="none">
                        {contact.prospectName}
                      </TableCell>
                      <TableCell align="left" padding="none">
                        {contact.productName}
                      </TableCell>
                      <TableCell align="right">{contact.status}</TableCell>
                      <TableCell align="right">{contact.updatedAt}</TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          component={Link}
                          to={`/contacts/${contact.id}`}
                        >
                          <LinkIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </MatTable>
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
          title={`${selectedLength} contacts selected`}
          open={modalOpen}
          onClose={this.toggleModal}
        >
          <MessageForm
            onSubmit={this.onSendMessage}
            onCancel={this.toggleModal}
          />
        </Modal>
        <Modal
          title={`Remove ${selectedLength} selected contacts?`}
          open={confirmModalOpen}
        >
          <ConfirmationForm
            onConfirm={this.removeContacts}
            onCancel={this.toggleConfirmModal}
          />
        </Modal>
      </Fragment>
    );
  }
}

ContactsTable.propTypes = {
  classes: pt.object.isRequired,
  loadContacts: pt.func.isRequired,
  removeContacts: pt.func.isRequired,
  notifyContacts: pt.func.isRequired,
  contacts: pt.array,
  order: pt.string,
  pagination: pt.object,
  csvStatus: pt.string,
};

ContactsTable.defaultProps = {
  contacts: null,
  order: null,
  pagination: null,
};

export default ContactsTable;
