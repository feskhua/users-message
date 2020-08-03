import { combineReducers } from 'redux';
import * as actions from '../actions';
import * as utils from '../../utils';
import * as reducersUtils from '../utils';

const ids = (state = [], action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INBOUND}_REQUEST`:
    case `${actions.LOAD_CONTACT_INBOUND}_FAILED`: {
      return [];
    }

    case `${actions.LOAD_CONTACT_INBOUND}_SUCCESS`: {
      return reducersUtils.concatIds(state, action.payload.result);
    }

    default: {
      return state;
    }
  }
};

const entities = (state = {}, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INBOUND}_REQUEST`:
    case `${actions.LOAD_CONTACT_INBOUND}_FAILED`: {
      return {};
    }

    case `${actions.LOAD_CONTACT_INBOUND}_SUCCESS`: {
      return reducersUtils.updateEntities(
        state,
        action.payload.entities.inbound,
      );
    }

    default: {
      return state;
    }
  }
};

const status = (state = null, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INBOUND}_REQUEST`: {
      return utils.STATUS_REQUEST;
    }
    case `${actions.LOAD_CONTACT_INBOUND}_SUCCESS`: {
      return utils.STATUS_SUCCESS;
    }
    case `${actions.LOAD_CONTACT_INBOUND}_FAILED`: {
      return utils.STATUS_FAILED;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INBOUND}_REQUEST`:
    case `${actions.LOAD_CONTACT_INBOUND}_SUCCESS`: {
      return null;
    }
    case `${actions.LOAD_CONTACT_INBOUND}_FAILED`: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const getIds = state => state.ids;
export const getEntities = state => state.entities;
export const getError = state => state.error;
export const getStatus = state => state.status;

export default combineReducers({ status, ids, entities, error });
