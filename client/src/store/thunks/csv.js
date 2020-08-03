import * as actions from '../actions';
import { contact as contactSchema } from '../schemas';
import { normalize } from 'normalizr';
import { CSVService } from '../../services';

export const uploadCsv = formData => dispatch => {
  dispatch(actions.csvUploadRequest());
  return CSVService.upload(formData)
    .then(response =>
      dispatch(actions.csvUploadSuccess(normalize(response, [contactSchema]))),
    )
    .catch(error => {
      console.log(error);
      dispatch(actions.csvUploadError(error));
    });
};
