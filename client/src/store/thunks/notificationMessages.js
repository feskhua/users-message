import * as actions from '../actions/contact';
import schema from '../schemas/notificationMessages';
import { normalize } from 'normalizr';
import { ContactService } from '../../services';

let requestedId = null;
export const loadContactNotificationMessages = contactId => dispatch => {
  if (requestedId === contactId) {
    return;
  }
  requestedId = contactId;

  dispatch(actions.loadContactNotificationMessagesRequest());
  return ContactService.loadNotificationMessagesByContactId(contactId)
    .then(response =>
      dispatch(
        actions.loadContactNotificationMessagesSuccess(
          normalize(response, [schema]),
        ),
      ),
    )
    .catch(error =>
      dispatch(actions.loadContactNotificationMessagesError(error)),
    )
    .finally(() => (requestedId = null));
};
