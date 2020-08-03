import { createSelector } from 'reselect';
import * as utils from '../../utils';
import { getInbound } from './inbound';
import { getOutbound } from './outbound';

export const getCombinedInboundOutbound = createSelector(
  [getInbound, getOutbound],
  (inbound, outbound) =>
    utils.stableSort(
      [
        ...inbound.map(utils.markType('inbound')),
        ...outbound.map(utils.markType('outbound')),
      ],
      utils.getSorting('desc', 'createdAt'),
    ),
);
