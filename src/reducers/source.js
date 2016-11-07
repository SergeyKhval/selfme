const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_SOURCE':
      return {
        ...state,
        source: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
