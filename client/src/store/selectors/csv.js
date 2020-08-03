import { createSelector } from 'reselect';
import { getStatus, getError } from '../reducers/csv';

const getCsvState = state => state.csv;

export const getCsvStatus = createSelector(
  getCsvState,
  getStatus,
);

export const getCsvError = createSelector(
  getCsvState,
  getError,
);
