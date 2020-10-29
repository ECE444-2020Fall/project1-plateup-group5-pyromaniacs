import {
  AlertIOS, Platform, ToastAndroid
} from 'react-native';

export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(msg);
  }
}

export function constructQueryParams(params, keyTransforms) {
  let queryParams = "";

  for (const param in params) {
    if (params[param]) {
      let key = keyTransforms[param] ? keyTransforms[param] : param
      queryParams = appendQueryParam(queryParams, `${key}=${params[param]}`);
    }
  }

  return queryParams;
}

function appendQueryParam(existingQueryParams, newParam) {
  if (existingQueryParams) {
    existingQueryParams += `&${newParam}`;
  } else {
    existingQueryParams = `?${newParam}`;
  }

  return existingQueryParams;
}
