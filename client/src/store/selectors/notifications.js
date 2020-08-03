import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import * as utils from '../../utils';
import {
  getEntities,
  getIds,
  getStatus,
} from '../reducers/notifications';
import { notification as notificationSchema } from '../schemas';

const getNotificationsState = state => state.notifications;

const getNotificationsEntities = createSelector(
  getNotificationsState,
  getEntities,
);

const getNotificationsIds = createSelector(
  getNotificationsState,
  getIds,
);

export const getNotifications = createSelector(
  [getNotificationsIds, getNotificationsEntities],
  (result, notifications) =>
    denormalize(result, [notificationSchema], {
      notifications,
    }),
);

const getNotificationsStatus = createSelector(
  getNotificationsState,
  getStatus,
);

export const isNotificationsLoading = createSelector(
  getNotificationsStatus,
  utils.isLoading,
);
