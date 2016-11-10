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
    default:
      return {
        ...state
      };
  }
}
