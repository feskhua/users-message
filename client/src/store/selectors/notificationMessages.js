import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import * as utils from '../../utils';
import {
  getEntities,
  getIds,
  getStatus,
} from '../reducers/notificationMessages';
import { notificationMessages as notificationMessagesSchema } from '../schemas';

const getNotificationMessagesState = state => state.notificationMessages;

const getNotificationMessagesEntities = createSelector(
  getNotificationMessagesState,
  getEntities,
);

const getNotificationMessagesIds = createSelector(
  getNotificationMessagesState,
  getIds,
);

export const getNotificationMessages = createSelector(
  [getNotificationMessagesIds, getNotificationMessagesEntities],
  (result, notificationMessages) =>
    denormalize(result, [notificationMessagesSchema], {
      notificationMessages,
    }),
);

const getNotificationMessagesStatus = createSelector(
  getNotificationMessagesState,
  getStatus,
);

export const isNotificationMessagesLoading = createSelector(
  getNotificationMessagesStatus,
  utils.isLoading,
);
