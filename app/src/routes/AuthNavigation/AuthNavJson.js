import color from '../../constants/env/color';
import LoginWithOtp from '../../Screens/Auth/LoginWithOtp';
import OtpScreen from '../../Screens/Auth/OtpScreen';
import PasswordForReisterUser from '../../Screens/Auth/PasswordForRegisterUser';
import Login from '../../Screens/Auth/Login';
import Sign_In from '../../Screens/Auth/Sign_In';

import {
  gradientColor,
  headerBackground,
  headerStyle,
} from '../NavigationConstants/NavigationConstants';
import TermsNConditions from '../../Screens/Auth/TermsAndConditions/TermsNConditions';

export const AuthNavJson = [
  {
    options: {
      // headerTintColor: color.white,
      headerTitle: '',
      headerTransparent: true,
      headerStyle: headerStyle,
      headerLeft: () => {},
    },
    name: 'Sign-In',
    component: Sign_In,
  },
  {
    options: {
      headerTitle: 'Password',
      headerTintColor: color.white,
      headerTransparent: true,
      headerStyle: headerStyle,
    },
    name: 'Login',
    component: Login,
  },
  {
    options: {
      headerTitle: 'Password',
      headerTintColor: color.white,
      headerTransparent: true,
      // headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: 'PasswordForReisterUser',
    component: PasswordForReisterUser,
  },
  {
    options: {
      headerTitle: 'Password',
      headerTintColor: color.white,
      headerTransparent: true,
      // headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: 'OtpScreen',
    component: OtpScreen,
  },

  {
    options: {
      headerTitle: 'Login With Otp',
      headerTintColor: color.white,
      headerTransparent: true,
      // headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: 'LoginWithOtp',
    component: LoginWithOtp,
  },
  {
    options: {
      headerShown: false,
      headerTitle: '',
      headerTintColor: color.white,

      // headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: 'termsAndConditions',
    component: TermsNConditions,
  },
];
