import * as actions from '../actions/contact';
import schema from '../schemas/contact';
import { normalize } from 'normalizr';
import { ContactService } from '../../services';

export const loadContacts = params => dispatch => {
  dispatch(actions.loadContactsRequest());
  return ContactService.all(params)
    .then(({ data, order, pagination }) => {
      const { result, entities } = normalize(data, [schema]);

      dispatch(
        actions.loadContactsSuccess({ result, entities, order, pagination }),
      );
    })
    .catch(error => dispatch(actions.loadContactsError(error)));
};

let requestedId = null;
export const loadContactInfo = contactId => dispatch => {
  if (requestedId === contactId) {
    return;
  }
  requestedId = contactId;

  dispatch(actions.loadContactInfoRequest());
  return ContactService.one(contactId)
    .then(response =>
      dispatch(actions.loadContactInfoSuccess(normalize(response, schema))),
    )
    .catch(error => dispatch(actions.loadContactInfoError(error)))
    .finally(() => (requestedId = null));
};

export const sendMessage = (contactId, data) => dispatch => {
  dispatch(actions.sendMessageRequest());
  return ContactService.sendMessageByContactId(contactId, data)
    .then(() => dispatch(actions.sendMessageSuccess()))
    .catch(error => dispatch(actions.sendMessageError(error)));
};

export const removeContacts = ids => dispatch => {
  dispatch(actions.removeContactsRequest(ids));
  return ContactService.removeContacts(ids)
    .then(() => dispatch(actions.removeContactsSuccess(ids)))
    .catch(error => dispatch(actions.removeContactsError(error)));
};
