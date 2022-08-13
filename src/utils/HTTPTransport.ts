import queryStringify from './qureyStringify.js';

interface HTTPTransport {
  METHODS: Record<string, string>
};

interface Options {
  data?: string, 
  timeout?: number,
  headers?: string,
  method?: string
};

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

class HTTPTransport {

  get = (url: string, options: Options = {}) => {
    if (options.data) {
        options.data = queryStringify(options.data);
    }
    return this.request(url + options.data, {...options, method: METHODS.GET}, options.timeout);
  };
  post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
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

    if (!data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
    xhr.onload = function() {
      resolve(xhr);
    };
    xhr.timeout = timeout;
    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;
    });
    return promise;
  };
};