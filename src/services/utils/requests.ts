import axios from "axios";
import { NXT_API } from "../constants";
import { getLocalStorage } from "./browser-storage";

export const getHeaders = (accessToken) => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
});

export const _getUrl = (paths) => {
  return [NXT_API, ...paths].join('/');
};

export const _GET_ = (url: string, params?: any) => {
  const headers = getHeaders(getLocalStorage('access_token'));
  return axios.get(url, {
    headers,
    params
  }).then(({ data }) => data).catch(({ response }) => {
    const { data } = response;

    throw data.message;
  });
};

export const _POST_ = (url: string, body: any) => {
  const headers = getHeaders(getLocalStorage('access_token'));
  console.log(headers, body);
  return axios.post(url, body, {
    headers
  }).then(({ data }) => data).catch(({ response }) => {
    const { data } = response;

    throw data.message;
  });
};

export const _PUT_ = (url: string, body: any) => {
  const headers = getHeaders(getLocalStorage('access_token'));

  return axios.put(url, body, {
    headers
  }).then(({ data }) => data).catch(({ response }) => {
    const { data } = response;

    throw data.message;
  });
};

export const _DELETE_ = (url: string) => {
  const headers = getHeaders(getLocalStorage('access_token'));

  return axios.delete(url, {
    headers
  }).then(({ data }) => data).catch(({ response }) => {
    const { data } = response;

    throw data.message;
  });
};

export const _PATCH_ = (url: string) => {
  const headers = getHeaders(getLocalStorage('access_token'));

  return axios.patch(url, {
    headers
  }).then(({ data }) => data).catch(({ response }) => {
    const { data } = response;

    throw data.message;
  });
};
