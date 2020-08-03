import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import * as utils from '../../utils';
import { getEntities, getIds, getStatus } from '../reducers/inbound';
import { inbound as inboundSchema } from '../schemas';

const getInboundState = state => state.inbound;

const getInboundEntities = createSelector(
  getInboundState,
  getEntities,
);

const getInboundIds = createSelector(
  getInboundState,
  getIds,
);

export const getInbound = createSelector(
  [getInboundIds, getInboundEntities],
  (result, inbound) =>
    denormalize(result, [inboundSchema], {
      inbound,
    }),
);

const getInboundStatus = createSelector(
  getInboundState,
  getStatus,
);

export const isInboundLoading = createSelector(
  getInboundStatus,
  utils.isLoading,
);
