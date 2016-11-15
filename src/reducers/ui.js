const initialState = {
  editorMode: false,
  shareBlockVisible: false,
  filtersVisible: false,
  activeDeviceIndex: 0
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
    case 'TOGGLE_FILTERS':
      return {
        ...state,
        filtersVisible: action.payload
      };
    case 'TOGGLE_CAMERA':
      return {
        ...state,
        activeDeviceIndex: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
