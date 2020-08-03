import axios from 'axios';

const {
  REACT_APP_API_URL: API_URL = '',
  REACT_APP_API_TOKEN: TOKEN = '',
} = process.env;

export default class APIService {
  static get fetch() {
    return axios;
  }

  static get api() {
    return `${API_URL}/api`;
  }

  static get defaultHeaders() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (TOKEN) {
      headers.Authorization = `Basic ${TOKEN}`;
    }

    return headers;
  }

  static getResponseError({ response, request, message }) {
    if (response) {
      throw response.data;
    }

    if (request) {
      throw message || request;
    }

    throw message;
  }

  static isSuccessResponse(response) {
    return 200 <= response.status && response.status < 300;
  }

  static getResponseData(response) {
    if (!APIService.isSuccessResponse(response)) {
      throw response;
    }

    return response.data;
  }

  static getSearchParams(params) {
    const searchParams = Object.keys(params).reduce((acc, key) => {
      if (typeof params[key] !== 'undefined') {
        acc[key] = params[key];
      }

      return acc;
    }, {});

    return new URLSearchParams(searchParams);
  }

  static buildQuery(params, prefix = '?') {
    const searchParams = this.getSearchParams(params);
    const query = searchParams.toString();
    if (query) {
      return `${prefix}${query}`;
    }
    return '';
  }

  static getHeaders(options) {
    return Object.assign(this.defaultHeaders, options.headers);
  }

  static get(url, options = {}) {
    return this.fetch({
      ...options,
      url: `${this.api}${url}`,
      method: 'get',
      headers: this.getHeaders(options),
    });
  }

  static post(url, options = {}) {
    return this.fetch({
      ...options,
      url: `${this.api}${url}`,
      method: 'post',
      headers: this.getHeaders(options),
    });
  }

  static delete(url, options = {}) {
    return this.fetch({
      ...options,
      url: `${this.api}${url}`,
      method: 'delete',
      headers: this.getHeaders(options),
    });
  }

  static put(url, options = {}) {
    return this.fetch({
      ...options,
      url: `${this.api}${url}`,
      method: 'put',
      headers: this.getHeaders(options),
    });
  }
}
