const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_STREAM':
      return {
        ...state,
        stream: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
