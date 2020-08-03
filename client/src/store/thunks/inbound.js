import * as actions from '../actions/contact';
import schema from '../schemas/inbound';
import { normalize } from 'normalizr';
import { ContactService } from '../../services';

let requestedId = null;
export const loadContactInbound = contactId => dispatch => {
  if (requestedId === contactId) {
    return;
  }
  requestedId = contactId;

  dispatch(actions.loadContactInboundRequest());
  return ContactService.loadInboundMessagesByContactId(contactId)
    .then(response =>
      dispatch(
        actions.loadContactInboundSuccess(normalize(response, [schema])),
      ),
    )
    .catch(error => dispatch(actions.loadContactInboundError(error)))
    .finally(() => (requestedId = null));
};
