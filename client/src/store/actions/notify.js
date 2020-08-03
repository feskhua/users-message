export const NOTIFY_CONTACTS = 'NOTIFY_CONTACTS';
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';

export const notifyContactsRequest = params => {
  return {
    type: `${NOTIFY_CONTACTS}_REQUEST`,
    payload: params,
  };
};

export const notifyContactsSuccess = data => {
  return {
    type: `${NOTIFY_CONTACTS}_SUCCESS`,
    payload: data,
  };
};

export const notifyContactsError = error => {
  return {
    type: `${NOTIFY_CONTACTS}_FAILED`,
    payload: error,
  };
};

export const loadNotificationsRequest = params => {
  return {
    type: `${LOAD_NOTIFICATIONS}_REQUEST`,
    payload: params,
  };
};

export const loadNotificationsSuccess = data => {
  return {
    type: `${LOAD_NOTIFICATIONS}_SUCCESS`,
    payload: data,
  };
};

export const loadNotificationsError = error => {
  return {
    type: `${LOAD_NOTIFICATIONS}_FAILED`,
    payload: error,
  };
};
