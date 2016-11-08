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
        case 'ConstraintNotSatisfiedError':
          dispatch({
            type: 'ERROR',
            payload: 'Could not satisfy provided constraints'
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

    dispatch({
      type: 'TOGGLE_SHARE_BLOCK',
      payload: false
    });
  };
}

/**
 * Store reference to image taken with camera
 * @param source
 * @returns {function(*)}
 */
export function setSource(canvas) {
  return dispatch => {
    dispatch({
      type: 'SET_SOURCE',
      payload: {
        png: canvas.toDataURL('image/png')
      }
    });
  };
}

/**
 * get number of deivce cameras
 */
export function getCamerasCount() {
  return dispatch => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        dispatch({
          type: 'GET_CAMERAS_COUNT',
          payload: devices.filter(d => d.kind === 'videoinput').length
        });
      });
  };
}

/**
 * Toggle block with share buttons
 */
export function toggleShareBlock() {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: 'TOGGLE_SHARE_BLOCK',
      payload: !state.uiReducer.shareBlockVisible
    });
  };
}
