import {REHYDRATE} from 'redux-persist/constants';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_SOURCE':
      return {
        ...state,
        original: action.payload
      };
    case 'SET_SOURCE_FILTERED':
      return {
        ...state,
        filtered: action.payload
      };
    case REHYDRATE:
      if (action.payload.sourceReducer) {
        return {
          ...state,
          ...action.payload.sourceReducer
        };
      }
      return state;
    default:
      return {
        ...state
      };
  }
}
