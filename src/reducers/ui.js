import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  editorMode: false,
  shareBlockVisible: false,
  filtersVisible: false,
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
    case 'TOGGLE_FILTERS':
      return {
        ...state,
        filtersVisible: action.payload
      };
    case 'GET_CAMERAS_COUNT':
      return {
        ...state,
        cameras: action.payload
      };
    case REHYDRATE:
      if (action.payload.uiReducer) {
        return {
          ...state,
          ...action.payload.uiReducer
        };
      }
      return state;
    default:
      return {
        ...state
      };
  }
}
