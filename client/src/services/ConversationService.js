import APIService from './APIService';

export default class ConversationService extends APIService {
  static all(params = {}) {
    return this.get(`/conversations`, { params })
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }
}
