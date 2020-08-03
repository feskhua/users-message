import APIService from './APIService';

export default class NotifyService extends APIService {
  static sendBulk(body) {
    return this.post(`/notifications`, { data: body })
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }

  static all() {
    return this.get(`/notifications`)
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }
}
