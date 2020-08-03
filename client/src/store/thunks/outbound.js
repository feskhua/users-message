import * as actions from '../actions/contact';
import schema from '../schemas/outbound';
import { normalize } from 'normalizr';
import { ContactService } from '../../services';

let requestedId = null;
export const loadContactOutbound = contactId => dispatch => {
  if (requestedId === contactId) {
    return;
  }
  requestedId = contactId;

  dispatch(actions.loadContactOutboundRequest());
  return ContactService.loadOutboundMessagesByContactId(contactId)
    .then(response =>
      dispatch(
        actions.loadContactOutboundSuccess(normalize(response, [schema])),
      ),
    )
    .catch(error => dispatch(actions.loadContactOutboundError(error)))
    .finally(() => (requestedId = null));
};
