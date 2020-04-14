const ServerUrl = process.env.VUE_APP_BACKEND_ENDPOINT;

function handleError(response) {
  if (!response.ok) throw new Error(response.statusText);
  return response;
}

class API {
  headers: Headers;
  init: {
    cache: string;
    headers: Headers;
  };
  static init() {
    this.headers = new Headers();
    this.headers.append("Content-type", "application/json");

    this.init = {
      cache: "default",
      headers: this.headers
    };
  }

  static setToken(token) {
    this.init.headers.set("authorization", `Bearer ${token}`);
    window.localStorage.setItem("token", token);
  }

  static get(endPoint) {
    const init = { ...this.init, method: "GET" };

    return fetch(`${ServerUrl}${endPoint}`, init)
      .then(response => handleError(response))
      .then(response => response.json());
  }

  static post(endPoint, body = {}) {
    const init = { ...this.init, method: "POST", body: JSON.stringify(body) };

    return fetch(`${ServerUrl}${endPoint}`, init)
      .then(response => handleError(response))
      .then(response => response.json());
  }

  static put(endPoint, body = {}) {
    const init = { ...this.init, method: "PUT", body: JSON.stringify(body) };

    return fetch(`${ServerUrl}${endPoint}`, init)
      .then(response => handleError(response))
      .then(response => response.json());
  }

  static delete(endPoint) {
    const init = { ...this.init, method: "DELETE" };

    return fetch(`${ServerUrl}${endPoint}`, init)
      .then(response => handleError(response))
      .then(response => response.json());
  }
}

API.init();

export default API;
