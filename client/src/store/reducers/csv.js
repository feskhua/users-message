import { combineReducers } from 'redux';
import * as actions from '../actions';
import * as utils from '../../utils';

const status = (state = null, action) => {
  switch (action.type) {
    case `${actions.CSV_UPLOAD}_REQUEST`: {
      return utils.STATUS_REQUEST;
    }

    case `${actions.CSV_UPLOAD}_SUCCESS`: {
      return utils.STATUS_SUCCESS;
    }

    case `${actions.CSV_UPLOAD}_FAILED`: {
      return utils.STATUS_FAILED;
    }

    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case `${actions.CSV_UPLOAD}_REQUEST`:
    case `${actions.CSV_UPLOAD}_SUCCESS`: {
      return null;
    }
    case `${actions.CSV_UPLOAD}_FAILED`: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const getStatus = state => state.status;
export const getError = state => state.error;

export default combineReducers({ status, error });
