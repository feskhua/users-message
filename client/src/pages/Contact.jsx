import React, { Fragment } from 'react';
import ContactInfo from '../components/contact-info';
import ContactNotificationsTable from '../components/contact-notifications-table';
import ContactMessagesTable from '../components/contact-messages-table';
import SendMessageFab from '../components/send-message-fab';

function Contacts() {
  return (
    <Fragment>
      <ContactInfo />
      <ContactNotificationsTable />
      <ContactMessagesTable />
      <SendMessageFab />
    </Fragment>
  );
}

export default Contacts;
