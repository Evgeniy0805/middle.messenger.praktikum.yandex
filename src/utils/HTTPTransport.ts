interface HTTPTransport {
    METHODS: Record<string, string>
};

interface options {
    data?: string, 
    timeout?: number,
    headers?: string,
    method?: string
};

class HTTPTransport {

    constructor() {
        this.METHODS = {
            GET: 'GET',
            PUT: 'PUT',
            POST: 'POST',
            DELETE: 'DELETE'
        };
    }
    get = (url: string, options: options = {}) => {
      if (options.data) {
          options.data = this.queryStringify(options.data);
      }
      return this.request(url + options.data, {...options, method: this.METHODS.GET}, options.timeout);
    };
    post = (url: string, options: options = {}) => {
          return this.request(url, {...options, method: this.METHODS.POST}, options.timeout);
    };
    put = (url: string, options: options = {}) => {
          return this.request(url, {...options, method: this.METHODS.PUT}, options.timeout);
    };
    delete = (url: string, options: options = {}) => {
          return this.request(url, {...options, method: this.METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: options, timeout = 5000) => {
  const { data, headers, method } = options;
  const promise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  if (method) xhr.open(method, url);
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
queryStringify(data) {
    let newData = '?';
    for (const [key, value] of Object.entries(data)) {
      newData += `${key}=${value}&`;
    };
    newData = newData.slice(0, -1);
    return newData;
    }
};