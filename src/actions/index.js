/**
 * Capture video from webcam or generate error
 * @returns {function(*)}
 */
function createStreamFunc() {
  const mediaQueries = {
    tablet: '(min-width: 768px)'
  };

  const mql = window.matchMedia(mediaQueries.tablet);

  let width;
  let height;

  if (mql.matches) {
    width = {min: 640};
    height = {min: 480};
  } else {
    width = {exact: window.innerWidth};
    height = {exact: window.innerHeight};
  }


  return () => (dispatch, getState) => {
    function handleSuccess(stream) {
      dispatch({
        type: 'ERROR',
        payload: ''
      });

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
          dispatch({
            type: 'ERROR',
            payload: 'An error occurred while accessing media device'
          });
      }
    }

    const state = getState();

    const {activeDeviceIndex} = state.uiReducer;
    const {devices} = state.streamReducer;
    const source = devices[activeDeviceIndex] ? devices[activeDeviceIndex].deviceId : undefined;

    const constraints = {
      audio: false,
      video: {
        width,
        height
      },
      deviceId: source ? {exact: source} : undefined
    };

    if (state.streamReducer.stream) {
      state.streamReducer.stream.getTracks().forEach(track => {
        track.stop();
      });
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

    dispatch({
      type: 'TOGGLE_FILTERS',
      payload: false
    });
  };
}

/**
 * Store reference to image taken with camera
 * @param {Object | Boolean} canvas - canvas DOM element
 * @param {Boolean} filtered - save filtered or original image
 * @returns {function(*)}
 */
export function setSource(canvas, filtered = false) {
  return dispatch => {
    dispatch({
      type: filtered ? 'SET_SOURCE_FILTERED' : 'SET_SOURCE',
      payload: canvas ? canvas.toDataURL('image/png') : false
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
          type: 'GET_VIDEO_DEVICES',
          payload: devices.filter(d => d.kind === 'videoinput')
        });
      });
  };
}

/**
 * Toggle filters pane
 */
export function toggleFilters() {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: 'TOGGLE_FILTERS',
      payload: !state.uiReducer.filtersVisible
    });
  };
}

/**
 * Switch between device cameras
 */
export function toggleCamera() {
  return (dispatch, getState) => {
    const state = getState();

    const {activeDeviceIndex} = state.uiReducer;

    const newIndex = activeDeviceIndex === 0 ? 1 : 0;

    dispatch({
      type: 'TOGGLE_CAMERA',
      payload: newIndex
    });
  };
}

const actions = {
  createStream: createStreamFunc(),
  toggleCamera,
  toggleEditorMode,
  toggleFilters,
  setSource,
  getCamerasCount
};

export default actions;
