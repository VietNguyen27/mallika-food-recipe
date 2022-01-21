import { FULFILLED, PENDING, REJECTED } from '@config/constants';

export const isSomeAsyncActionsPending = (matchedActionTypes) => {
  return (action) =>
    matchedActionTypes
      .map((actionType) => `${actionType.typePrefix}/${PENDING}`)
      .some((actionType) => action.type.endsWith(actionType));
};

export const isSomeAsyncActionsFulfilled = (matchedActionTypes) => {
  return (action) =>
    matchedActionTypes
      .map((actionType) => `${actionType.typePrefix}/${FULFILLED}`)
      .some((actionType) => action.type.endsWith(actionType));
};

export const isSomeAsyncActionsRejected = (matchedActionTypes) => {
  return (action) =>
    matchedActionTypes
      .map((actionType) => `${actionType.typePrefix}/${REJECTED}`)
      .some((actionType) => action.type.endsWith(actionType));
};
