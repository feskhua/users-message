import React, { Fragment } from 'react';
import ContactsTable from '../components/contacts-table';
import UploadFab from '../components/upload-fab';

function Contacts() {
  return (
    <Fragment>
      <ContactsTable />
      <UploadFab />
    </Fragment>
  );
}

export default Contacts;
