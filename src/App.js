/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {Button, Platform, SafeAreaView} from 'react-native';

import {check, request, PERMISSIONS} from 'react-native-permissions';
import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';

const getPermission = async () => {
  await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
};

export const facebookSDKInit = async () => {
  if (Platform.OS === 'ios' && parseInt(Platform.Version) > 13) {
    const permission = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    if (permission === 'granted') {
      await Settings.setAdvertiserTrackingEnabled(true);
    } else {
      throw new Error('Not correct permissions');
    }
  }
  Settings.initializeSDK();
};

const App: () => Node = () => {
  useEffect(() => {
    getPermission();
    facebookSDKInit();
  }, []);

  const sendEvent = () => {
    console.log('sendEvent()');
    AppEventsLogger.logEvent('test', 9, {type: 'ios'});
  };

  return (
    <SafeAreaView>
      <Button title={'test'} onPress={sendEvent} />
    </SafeAreaView>
  );
};
export default App;
