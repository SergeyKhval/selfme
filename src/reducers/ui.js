const initialState = {
  editorMode: false,
  shareBlockVisible: false,
  cameras: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_EDITOR_MODE':
      return {
        ...state,
        editorMode: action.payload
      };
    case 'TOGGLE_SHARE_BLOCK':
      return {
        ...state,
        shareBlockVisible: action.payload
      };
    case 'GET_CAMERAS_COUNT':
      return {
        ...state,
        cameras: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
