export const LOAD_CONTACTS = 'LOAD_CONTACTS';
export const LOAD_CONTACT_INFO = 'LOAD_CONTACT_INFO';
export const LOAD_CONTACT_INBOUND = 'LOAD_CONTACT_INBOUND';
export const LOAD_CONTACT_OUTBOUND = 'LOAD_CONTACT_OUTBOUND';
export const LOAD_CONTACT_NOTIFICATION_MESSAGES =
  'LOAD_CONTACT_NOTIFICATION_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const REMOVE_CONTACTS = 'REMOVE_CONTACTS';

// LOAD_CONTACTS
export const loadContactsRequest = params => {
  return {
    type: `${LOAD_CONTACTS}_REQUEST`,
    payload: params,
  };
};

export const loadContactsSuccess = data => {
  return {
    type: `${LOAD_CONTACTS}_SUCCESS`,
    payload: data,
  };
};

export const loadContactsError = error => {
  return {
    type: `${LOAD_CONTACTS}_FAILED`,
    payload: error,
  };
};

// LOAD_CONTACT_INFO
export const loadContactInfoRequest = params => {
  return {
    type: `${LOAD_CONTACT_INFO}_REQUEST`,
    payload: params,
  };
};

export const loadContactInfoSuccess = data => {
  return {
    type: `${LOAD_CONTACT_INFO}_SUCCESS`,
    payload: data,
  };
};

export const loadContactInfoError = error => {
  return {
    type: `${LOAD_CONTACT_INFO}_FAILED`,
    payload: error,
  };
};

// LOAD_CONTACT_INBOUND
export const loadContactInboundRequest = params => {
  return {
    type: `${LOAD_CONTACT_INBOUND}_REQUEST`,
    payload: params,
  };
};

export const loadContactInboundSuccess = data => {
  return {
    type: `${LOAD_CONTACT_INBOUND}_SUCCESS`,
    payload: data,
  };
};

export const loadContactInboundError = error => {
  return {
    type: `${LOAD_CONTACT_INBOUND}_FAILED`,
    payload: error,
  };
};

// LOAD_CONTACT_OUTBOUND
export const loadContactOutboundRequest = params => {
  return {
    type: `${LOAD_CONTACT_OUTBOUND}_REQUEST`,
    payload: params,
  };
};

export const loadContactOutboundSuccess = data => {
  return {
    type: `${LOAD_CONTACT_OUTBOUND}_SUCCESS`,
    payload: data,
  };
};

export const loadContactOutboundError = error => {
  return {
    type: `${LOAD_CONTACT_OUTBOUND}_FAILED`,
    payload: error,
  };
};

// LOAD_CONTACT_NOTIFICATION_MESSAGES
export const loadContactNotificationMessagesRequest = params => {
  return {
    type: `${LOAD_CONTACT_NOTIFICATION_MESSAGES}_REQUEST`,
    payload: params,
  };
};

export const loadContactNotificationMessagesSuccess = data => {
  return {
    type: `${LOAD_CONTACT_NOTIFICATION_MESSAGES}_SUCCESS`,
    payload: data,
  };
};

export const loadContactNotificationMessagesError = error => {
  return {
    type: `${LOAD_CONTACT_NOTIFICATION_MESSAGES}_FAILED`,
    payload: error,
  };
};

// SEND_MESSAGE
export const sendMessageRequest = params => {
  return {
    type: `${SEND_MESSAGE}_REQUEST`,
    payload: params,
  };
};

export const sendMessageSuccess = data => {
  return {
    type: `${SEND_MESSAGE}_SUCCESS`,
    payload: data,
  };
};

export const sendMessageError = error => {
  return {
    type: `${SEND_MESSAGE}_FAILED`,
    payload: error,
  };
};

// REMOVE_CONTACTS
export const removeContactsRequest = ids => {
  return {
    type: `${REMOVE_CONTACTS}_REQUEST`,
    payload: ids,
  };
};

export const removeContactsSuccess = ids => {
  return {
    type: `${REMOVE_CONTACTS}_SUCCESS`,
    payload: ids,
  };
};

export const removeContactsError = error => {
  return {
    type: `${REMOVE_CONTACTS}_FAILED`,
    payload: error,
  };
};
