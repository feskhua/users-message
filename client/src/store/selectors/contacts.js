import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import {
  getEntities,
  getIds,
  getActiveId,
  getOrder,
  getPagination,
} from '../reducers/contacts';
import { contact as contactSchema } from '../schemas';

const getContactsState = state => state.contacts;
const getContactsEntities = createSelector(
  getContactsState,
  getEntities,
);

const getContactsIds = createSelector(
  getContactsState,
  getIds,
);

const getContactActiveId = createSelector(
  getContactsState,
  getActiveId,
);

export const getContactsOrder = createSelector(
  getContactsState,
  getOrder,
);

export const getContactsPagination = createSelector(
  getContactsState,
  getPagination,
);

export const getContacts = createSelector(
  [getContactsIds, getContactsEntities],
  (result, contacts) => denormalize(result, [contactSchema], { contacts }),
);

export const getActiveContact = createSelector(
  [getContactActiveId, getContactsEntities],
  (result, contacts) => denormalize(result, contactSchema, { contacts }),
);
