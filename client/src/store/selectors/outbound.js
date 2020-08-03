import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import * as utils from '../../utils';
import { getEntities, getIds, getStatus } from '../reducers/outbound';
import { outbound as outboundSchema } from '../schemas';

const getOutboundState = state => state.outbound;

const getOutboundEntities = createSelector(
  getOutboundState,
  getEntities,
);

const getOutboundIds = createSelector(
  getOutboundState,
  getIds,
);

export const getOutbound = createSelector(
  [getOutboundIds, getOutboundEntities],
  (result, outbound) =>
    denormalize(result, [outboundSchema], {
      outbound,
    }),
);

const getOutboundStatus = createSelector(
  getOutboundState,
  getStatus,
);

export const isOutboundLoading = createSelector(
  getOutboundStatus,
  utils.isLoading,
);
