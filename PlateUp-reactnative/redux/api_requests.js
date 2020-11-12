import axios from 'axios';
import env from '../env';

axios.defaults.baseURL = env.SERVER_URL;
axios.defaults.timeout = 1000;
axios.defaults.headers.Accept = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

const UNEXPECTED_EOS = 'unexpected end of stream';
const UNKNOWN_ERR = 'Unknown error.';
const MAX_RETRIES = 5;
let currentRetries = 0;

// Can't find a direct solution for the "unexpected end of stream" issue,
// so instead make axios retry the api call (on both success and fail).
axios.interceptors.response.use(
  (response) => {
    if (currentRetries < MAX_RETRIES) {
      if (response.data === UNEXPECTED_EOS) {
        currentRetries += 1;
        return axios.request(response.config);
      }
    }
    currentRetries = 0;
    return response;
  }, (error) => {
    if (currentRetries < MAX_RETRIES) {
      if (error.response.data === UNEXPECTED_EOS) {
        currentRetries += 1;
        return axios.request(error.config);
      }
    }
    currentRetries = 0;
    return Promise.reject(error);
  }
);

export const apiGet = async (urlSuffix, thunkAPI) => {
  try {
    const response = await axios.get(`${urlSuffix}`);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response ? err.response.data : UNKNOWN_ERR);
  }
};

export const apiPost = async (urlSuffix, data, thunkAPI) => {
  try {
    const response = await axios.post(`${urlSuffix}`, data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response ? err.response.data : UNKNOWN_ERR);
  }
};

export const apiDelete = async (urlSuffix, thunkAPI, rejectString = undefined) => {
  try {
    const response = await axios.delete(`${urlSuffix}`);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      rejectString || err.response ? err.response.data : UNKNOWN_ERR
    );
  }
};
