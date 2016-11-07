export function createStream() {
  const constraints = {
    audio: false,
    video: {
      width: {
        exact: window.innerWidth
      },
      height: {
        exact: window.innerHeight
      }
    }
  };

  return dispatch => {
    function handleSuccess(stream) {
      dispatch({
        type: 'SET_STREAM',
        payload: stream
      });
    }

    function handleError(e) {
      switch (e.name) {
        case 'DevicesNotFoundError':
          dispatch({
            type: 'ERROR',
            payload: 'Could not find device camera'
          });
          break;
        default:
          return;
      }
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
  };
}

/**
 * Set the mode of the app (camera - false, editor - true)
 * @param {Boolean} mode
 * @returns {function(*)}
 */
export function toggleEditorMode(mode) {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_EDITOR_MODE',
      payload: mode
    });
  };
}

/**
 * Store reference to image taken with camera
 * @param source
 * @returns {function(*)}
 */
export function setSource(source) {
  return dispatch => {
    dispatch({
      type: 'SET_SOURCE',
      payload: source
    });
  };
}
