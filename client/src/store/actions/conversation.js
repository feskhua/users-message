export const LOAD_CONVERSATIONS = 'LOAD_CONVERSATIONS';

// LOAD_CONVERSATIONS
export const loadConversationsRequest = params => {
  return {
    type: `${LOAD_CONVERSATIONS}_REQUEST`,
    payload: params,
  };
};

export const loadConversationsSuccess = data => {
  return {
    type: `${LOAD_CONVERSATIONS}_SUCCESS`,
    payload: data,
  };
};

export const loadConversationsError = error => {
  return {
    type: `${LOAD_CONVERSATIONS}_FAILED`,
    payload: error,
  };
};
