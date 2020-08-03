import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import {
  getEntities,
  getIds,
  getActiveId,
  getStatus,
  getOrder,
  getPagination,
} from '../reducers/conversations';
import { conversation as conversationSchema } from '../schemas';
import * as utils from '../../utils';

const getConversationsState = state => state.conversations;

const getConversationsEntities = createSelector(
  getConversationsState,
  getEntities,
);

const getConversationsIds = createSelector(
  getConversationsState,
  getIds,
);

const getConversationActiveId = createSelector(
  getConversationsState,
  getActiveId,
);

export const getConversationsOrder = createSelector(
  getConversationsState,
  getOrder,
);

export const getConversationsPagination = createSelector(
  getConversationsState,
  getPagination,
);

export const getConversations = createSelector(
  [getConversationsIds, getConversationsEntities],
  (result, conversations) =>
    denormalize(result, [conversationSchema], { conversations }),
);

export const getActiveConversation = createSelector(
  [getConversationActiveId, getConversationsEntities],
  (result, conversations) =>
    denormalize(result, conversationSchema, { conversations }),
);

const getConversationsStatus = createSelector(
  getConversationsState,
  getStatus,
);

export const isConversationsLoading = createSelector(
  getConversationsStatus,
  utils.isLoading,
);
