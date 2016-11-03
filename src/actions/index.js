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
