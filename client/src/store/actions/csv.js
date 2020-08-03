export const CSV_UPLOAD = 'CSV_UPLOAD';

export const csvUploadRequest = params => {
  return {
    type: `${CSV_UPLOAD}_REQUEST`,
    payload: params,
  };
};

export const csvUploadSuccess = data => {
  return {
    type: `${CSV_UPLOAD}_SUCCESS`,
    payload: data,
  };
};

export const csvUploadError = error => {
  return {
    type: `${CSV_UPLOAD}_FAILED`,
    payload: error,
  };
};
