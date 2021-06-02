const emailRegexPattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const numRegexPattern = /^[0-9]+$/;

// eslint-disable-next-line import/prefer-default-export
export { emailRegexPattern, numRegexPattern };
