const axios = require('axios');
const { timeOut } = require('../config/config');

// eslint-disable-next-line import/prefer-default-export
const getRequest = async (url, params, headers, cancelToken) => {
  let queryParams = '';
  if (params && Object.keys(params).length) {
    queryParams = Object.keys(params)
      .map((key) => {
        if (Array.isArray(params[key])) {
          return params[key].map((p) => `${key}=${p}`).join('&');
        }
        return `${key}=${params[key]}`;
      })
      .join('&');
    queryParams = `?${queryParams}`;
  }
  const finalUrl = `${url}${queryParams}`;
  const data = await axios
    .get(finalUrl, { headers, timeout: timeOut, cancelToken })
    .then((resp) => resp.data)
    .catch((err) => getErrorResponse(err));
  return data;
};

const getRequestWithConfig = async ({ url, params, headers, cancelToken, method, defaultAxios, config }) => {
  let queryParams = '';
  if (params && Object.keys(params).length) {
    queryParams = Object.keys(params)
      .map((key) => {
        if (Array.isArray(params[key])) {
          return params[key].map((p) => `${key}=${p}`).join('&');
        }
        return `${key}=${params[key]}`;
      })
      .join('&');
    queryParams = `?${queryParams}`;
  }
  const finalUrl = `${url}${queryParams}`;
  const option = {
    method,
    url: finalUrl,
    headers,
    timeout: timeOut,
    cancelToken,
    ...config,
  };
  if (defaultAxios) {
    Object.keys(defaultAxios).forEach((key) => {
      axios.defaults[key] = defaultAxios[key];
    });
  }
  axios.defaults.withCredentials = true;
  const data = await axios(option)
    .then((resp) => resp.data)
    .catch((err) => getErrorResponse(err));
  return data;
};

const postRequest = async (url, params, headers, cancelToken, config, csrfToken) => {
  if (csrfToken) {
    axios.defaults.headers.post['xsrf-token'] = csrfToken;
  }
  const data = await axios({
    method: 'post',
    url,
    data: params,
    headers,
    cancelToken,
    timeout: timeOut,
    ...config,
  })
    .then((resp) => resp.data)
    .catch((err) => getErrorResponse(err));
  return data;
};

const uplodFile = async (url, formData, config) => {
  const data = await axios
    .post(url, formData, config)
    .then((resp) => resp.data)
    .catch((err) => getErrorResponse(err));
  return data;
};

const deleteRequest = async (url, params, headers) => {
  const data = await axios
    .delete(url, {
      headers,
      timeout: timeOut,
    })
    .then((resp) => resp.data)
    .catch((err) => getErrorResponse(err));
  return data;
};

/**
 * NOTE - DONT USE PUT REQUEST FROM NOW ONWARDS - Soc2
 */
const putRequest = async (url, params, headers, cancelToken) => {
  const data = await axios({
    method: 'put',
    url,
    data: params,
    headers,
    cancelToken,
    timeout: timeOut,
  })
    .then((resp) => resp.data)
    .catch((err) => getErrorResponse(err));
  return data;
};

const getErrorResponse = (err) => {
  let errorMsg = 'We cannot reach the server at the moment. Please try again later';
  if (err.response) {
    if (err.response.status === 401 || err.response.status === 511 || err.response.status === 440) {
      errorMsg = 'Unauthorized';
    } else if (err.response.status === 403 && err.response.statusText === 'Forbidden') {
      errorMsg = err.response.data.msg || 'Missing authentication token. Please contact support team';
    } else if (err.response.status === 500) {
      errorMsg = err.response.data.msg || 'Internal server error, try again later';
    } else if (err.response.status > 500) {
      errorMsg = 'We cannot reach the server at the moment. Please try again later';
    } else if (err.response.data.msg) {
      errorMsg = err.response.data.msg || errorMsg;
    } else if (err.response.data.error) {
      errorMsg = err.response.data.error.message;
    }
  }
  return {
    error: true,
    message: errorMsg,
  };
};

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestWithConfig,
  uplodFile,
};
// const authInterceptor = (request) => {
//   const userInfo = getLoggedInUser();
//   const headers = headerGenerator(userInfo?.token, userInfo?.session_id);
//   request.headers.common = { ...request.headers.common, ...headers };
//   return request;
// };

// axios.interceptors.request.use(authInterceptor);
