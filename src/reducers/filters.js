require('../../node_modules/webgl-image-filter/webgl-image-filter');

const initialState = {
  filter: new WebGLImageFilter() // eslint-disable-line no-undef
};

export default function (state = initialState) {
  return {...state};
}
