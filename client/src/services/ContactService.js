import APIService from './APIService';

export default class ContactService extends APIService {
  static all(params = {}) {
    return this.get(`/contacts`, { params })
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }

  static one(id) {
    return this.get(`/contacts/${id}`)
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }

  static sendMessageByContactId(contactId, body) {
    return this.post(`/contacts/${contactId}/messages`, {
      data: { body },
    }).catch(this.getResponseError);
  }

  static loadInboundMessagesByContactId(contactId) {
    return this.get(`/contacts/${contactId}/inbound`)
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }

  static loadOutboundMessagesByContactId(contactId) {
    return this.get(`/contacts/${contactId}/outbound`)
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }

  static loadNotificationMessagesByContactId(contactId) {
    return this.get(`/contacts/${contactId}/notification-messages`)
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }

  static removeContacts(ids) {
    return this.delete('/contacts', { data: { ids } })
      .then(this.getResponseData)
      .catch(this.getResponseError);
  }
}
