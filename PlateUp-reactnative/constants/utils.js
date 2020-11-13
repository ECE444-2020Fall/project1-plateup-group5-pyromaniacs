import {
  Alert, Dimensions, Platform, ToastAndroid
} from 'react-native';

const { height, width } = Dimensions.get('window');
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    Alert.prompt(msg);
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
