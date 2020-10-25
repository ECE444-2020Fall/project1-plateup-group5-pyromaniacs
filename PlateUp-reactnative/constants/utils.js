import { theme } from 'galio-framework';
import {
  AlertIOS, Platform, StatusBar, ToastAndroid
} from 'react-native';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(msg);
  }
}

export function constructQueryParams(queryParams, newParam) {
  if (queryParams) {
    queryParams += (`&${newParam}`);
  } else {
    queryParams = (`?${newParam}`);
  }

  return queryParams;
}
