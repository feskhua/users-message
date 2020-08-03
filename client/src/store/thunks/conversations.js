import * as actions from '../actions/conversation';
import schema from '../schemas/conversation';
import { normalize } from 'normalizr';
import { ConversationService } from '../../services';

export const loadConversations = params => dispatch => {
  dispatch(actions.loadConversationsRequest());
  return ConversationService.all(params)
    .then(({ data, pagination }) => {
      const { result, entities } = normalize(data, [schema]);
      dispatch(
        actions.loadConversationsSuccess({
          result,
          entities,
          pagination,
        }),
      );
    })
    .catch(error => dispatch(actions.loadConversationsError(error)));
};
