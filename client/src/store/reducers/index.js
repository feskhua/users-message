import { combineReducers } from 'redux';
import csv from './csv';
import contacts from './contacts';
import inbound from './inbound';
import outbound from './outbound';
import notificationMessages from './notificationMessages';
import conversations from './conversations';
import notifications from './notifications';

export default combineReducers({
  csv,
  contacts,
  inbound,
  outbound,
  notificationMessages,
  conversations,
  notifications,
});
