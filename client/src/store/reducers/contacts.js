import { combineReducers } from 'redux';
import * as actions from '../actions';
import * as utils from '../../utils';
import * as reducersUtils from '../utils';

const activeId = (state = null, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INFO}_FAILED`:
    case `${actions.LOAD_CONTACT_INFO}_REQUEST`: {
      return null;
    }

    case `${actions.LOAD_CONTACT_INFO}_SUCCESS`: {
      return action.payload.result;
    }

    default: {
      return state;
    }
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case `${actions.LOAD_CONVERSATIONS}_SUCCESS`: {
      return reducersUtils.concatIds(state, action.payload.result);
    }

    case `${actions.REMOVE_CONTACTS}_SUCCESS`: {
      return state.filter(id => !action.payload.includes(id));
    }

    case `${actions.LOAD_CONTACTS}_SUCCESS`: {
      return action.payload.result;
    }

    default: {
      return state;
    }
  }
};

const entities = (state = {}, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACTS}_SUCCESS`:
    case `${actions.LOAD_CONVERSATIONS}_SUCCESS`:
    case `${actions.LOAD_CONTACT_INFO}_SUCCESS`: {
      return reducersUtils.updateEntities(
        state,
        action.payload.entities.contacts,
      );
    }

    case `${actions.REMOVE_CONTACTS}_SUCCESS`: {
      return reducersUtils.removeEntities(state, action.payload);
    }

    default: {
      return state;
    }
  }
};

const order = (state = null, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACTS}_SUCCESS`: {
      return action.payload.order;
    }

    default: {
      return state;
    }
  }
};

const pagination = (state = utils.defaultPagination, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACTS}_SUCCESS`: {
      return action.payload.pagination;
    }

    case `${actions.REMOVE_CONTACTS}_SUCCESS`: {
      return {
        ...state,
        total: state.total - action.payload.length,
      };
    }

    default: {
      return state;
    }
  }
};

const status = (state = null, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INFO}_REQUEST`:
    case `${actions.LOAD_CONTACTS}_REQUEST`: {
      return utils.STATUS_REQUEST;
    }
    case `${actions.LOAD_CONTACT_INFO}_SUCCESS`:
    case `${actions.LOAD_CONTACTS}_SUCCESS`: {
      return utils.STATUS_SUCCESS;
    }
    case `${actions.LOAD_CONTACT_INFO}_FAILED`:
    case `${actions.LOAD_CONTACTS}_FAILED`: {
      return utils.STATUS_FAILED;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case `${actions.LOAD_CONTACT_INFO}_REQUEST`:
    case `${actions.LOAD_CONTACTS}_REQUEST`:
    case `${actions.LOAD_CONTACT_INFO}_SUCCESS`:
    case `${actions.LOAD_CONTACTS}_SUCCESS`: {
      return null;
    }
    case `${actions.LOAD_CONTACT_INFO}_FAILED`:
    case `${actions.LOAD_CONTACTS}_FAILED`: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const getIds = state => state.ids;
export const getActiveId = state => state.activeId;
export const getEntities = state => state.entities;
export const getError = state => state.error;
export const getStatus = state => state.status;
export const getOrder = state => state.order;
export const getPagination = state => state.pagination;

export default combineReducers({
  status,
  ids,
  entities,
  error,
  activeId,
  order,
  pagination,
});
