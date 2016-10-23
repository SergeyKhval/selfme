export function createStream() {
  const constraints = {
    audio: false,
    video: true
  };

  return dispatch => {
    function handleSuccess(stream) {
      dispatch({
        type: 'SET_STREAM',
        payload: stream
      });
    }

    function handleError(e) {
      console.error(`Error with getting user media: ${e}`);
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
  };
}
