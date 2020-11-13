import {
  AlertIOS, Dimensions, Platform, StatusBar, ToastAndroid
} from 'react-native';

export const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
export const { width } = Dimensions.get('window');
export const height = Platform.OS === 'ios'
  ? Dimensions.get('window').height
  : Dimensions.get('window').height - StatusBar.currentHeight;

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(msg);
  }
}

export function constructQueryParams(params, keyTransforms) {
  let queryParams = '';

  Object.keys(params).forEach((param) => {
    if (params[param]) {
      const key = keyTransforms[param] ? keyTransforms[param] : param;
      queryParams = appendQueryParam(queryParams, `${key}=${params[param]}`);
    }
  });

  return queryParams;
}

function appendQueryParam(existingQueryParams, newParam) {
  let updatedQueryParams = '';

  if (existingQueryParams) {
    updatedQueryParams = `${existingQueryParams}&${newParam}`;
  } else {
    updatedQueryParams = `?${newParam}`;
  }

  return updatedQueryParams;
}
