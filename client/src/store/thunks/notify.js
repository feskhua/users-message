import { normalize } from 'normalizr';
import * as actions from '../actions';
import schema from '../schemas/notification';
import { NotifyService } from '../../services';

export const notifyContacts = body => dispatch => {
  dispatch(actions.notifyContactsRequest());
  return NotifyService.sendBulk(body)
    .then(() => dispatch(actions.notifyContactsSuccess()))
    .catch(error => dispatch(actions.notifyContactsError(error)));
};

export const loadNotifications = () => dispatch => {
  dispatch(actions.loadNotificationsRequest());
  return NotifyService.all()
    .then(response =>
      dispatch(actions.loadNotificationsSuccess(normalize(response, [schema]))),
    )
    .catch(error => dispatch(actions.loadNotificationsError(error)));
};
