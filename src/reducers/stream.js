const initialState = {
  devices: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_STREAM':
      return {
        ...state,
        stream: action.payload
      };
    case 'GET_VIDEO_DEVICES':
      return {
        ...state,
        devices: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
