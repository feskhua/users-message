import * as utils from '../utils';

export const updateEntities = (state, entities = {}) =>
  Object.keys(entities).reduce(
    (acc, id) => {
      if (acc[id]) {
        acc[id] = {
          ...acc[id],
          ...entities[id],
        };
      } else {
        acc[id] = entities[id];
      }

      return acc;
    },
    { ...state },
  );

export const removeEntities = (state, ids = []) =>
  Object.keys(state).reduce((acc, id) => {
    if (!ids.includes(id)) {
      acc[id] = state[id];
    }

    return acc;
  }, {});

export const concatIds = (state = [], ids = []) => {
  return utils.getUnique([...state, ...ids]);
};
