import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  console.log('fbLogin action dispatched');
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    console.log('already has token');
  } else {
    console.log('no token, start FB login process');
    // Start up FB Login process
    doFacebookLoginWithFirebase(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('140978153159621', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

const doFacebookLoginWithFirebase = async dispatch => {

  console.log('doFacebookLoginWithFirebase action dispatched');
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('140978153159621', {
    permissions: ['public_profile']
  });

  console.log({type, token});

  if (type === 'success') {
    console.log('doFacebookLoginWithFirebase type success');
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
    });
  }
  if (type === 'cancel') {
    console.log('doFacebookLoginWithFirebase type cancel');
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  console.log('dispatch FACEBOOK_LOGIN_SUCCESS, token: ', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
