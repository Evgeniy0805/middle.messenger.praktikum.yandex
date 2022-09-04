import queryStringify from './qureyStringify';

interface HTTPTransport {
  METHODS: Record<string, string>
};

interface Options {
  data?: any, 
  timeout?: number,
  headers?: object,
  method?: string
};

enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  };

  get = (url: string, options: Options = {}) => {
    if (options.data) {
        options.data = queryStringify(options.data);
    }
    return this.request(`${this.endpoint}${url}`, {...options, method: Methods.GET});
  };
  post = (url: string, options: Options = {}) => {
        return this.request(`${this.endpoint}${url}`, {...options, method: Methods.POST});
  };
  put = (url: string, options: Options = {}) => {
        return this.request(`${this.endpoint}${url}`, {...options, method: Methods.PUT});
  };
  delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: Methods.DELETE});
  };

  request = (url: string, options: Options, timeout = 5000) => {
    const { data, headers, method } = options;
    const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (method) {
      xhr.open(method, url);
    };
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value);
      }
    }
    xhr.withCredentials = true;
    if (!data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
    xhr.onload = function() {
      resolve(this)
    };
    xhr.timeout = timeout;
    xhr.onabort = () => reject({ reason: "abort" });
    xhr.onerror = () => reject({ reason: "network error" });
    xhr.ontimeout = () => reject({ reason: "timeout" });
    });
    return promise;
  };
};

export default HTTPTransport;