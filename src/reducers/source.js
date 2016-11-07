const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_SOURCE':
      return {
        ...state,
        png: action.payload.png
      };
    default:
      return {
        ...state
      };
  }
}
