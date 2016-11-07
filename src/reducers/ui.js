const initialState = {
  editorMode: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_EDITOR_MODE':
      return {
        ...state,
        editorMode: action.payload.editorMode
      };
    default:
      return {
        ...state
      };
  }
}
