import APIService from './APIService';

export default class CSVService extends APIService {
  static upload(formData) {
    return this.post(`/csv`, {
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }
}
