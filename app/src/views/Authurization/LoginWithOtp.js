import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react';
import {StyleSheet, Image, View, Platform} from 'react-native';

import AppButton from '../../Components/AppComponents/AppButton';
import {Text} from 'native-base';
import BackGroundImg from '../../constants/components/BackGroundImg';

import OtpInput from '../../constants/components/OtpInput';

import {setLocalStorage} from '../../utils/Cache/TempStorage';
import Card from '../../constants/components/Card';

import color from '../../constants/env/color';
import MainContext from '../../Context/MainContext';
import {validateOtp} from '../../helper/services/Auth';
import {useContextUpdate} from '../../hooks/useContextUpdate';

// import {
//   login,
//   sendOtp,
//   validateOtp,
// }

function LoginWithOtp({route, navigation}) {
  const [showView, setShowView] = React.useState('auto');
  const [seconds, setSeconds] = React.useState(30);
  const [otp, setOtp] = React.useState('');
  const [transactionCode, setTransactionCode] = React.useState(null);
  const [otpError, setOtpError] = React.useState('');
  const {countryCode, number, directLogin} = route.params;
  const [token, setToken] = React.useState(null);

  useContextUpdate(token, 'HomeNavigation');

  let str = number.split('');
  str.splice(2, 5, 'XXXX');
  str = str.join('');

  const getOTP = () => {
    if (otp) {
      validateOtp({
        domain: 'banjee',
        mobile: number,
        osName: Platform.OS,
        otp: otp,
        source: 'mobile',
        transactionCode: transactionCode,
      })
        .then(res => {
          if (res.valid) {
            // let formData = new FormData();
            // formData.append("password", otp);
            // formData.append("grant_type", "password");
            // formData.append("domain", "banjee");
            // formData.append("accountType", 0);
            // formData.append("passwordType", "otp");
            // formData.append("transactionCode", transactionCode);
            // formData.append("username", number);

            console.log(number, transactionCode, otp);

            axios
              .post(
                'https://gateway.banjee.org/services/system-service/oauth/token',
                `password=${otp}&grant_type=password&domain=banjee&accountType=0&passwordType=otp&transactionCode=${transactionCode}&username=${number}`,
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic aXRwbDppd2FudHVubGltaXRlZA==',
                  },
                },
              )
              .then(res => {
                console.log(res.data);
                // login(formData).then((res) => {
                setToken(res.data.access_token);
                setLocalStorage('token', res.data.access_token);
                const jwtToken = jwtDecode(res.data.access_token);
                setUser(jwtToken);
                if (res) {
                  navigation.navigate('CompleteProfile');
                }
                // else {
                // 	navigation.navigate("CompleteProfile");
                // }
              })
              .catch(err => {
                console.log('-------------', JSON.stringify(err, null, 2));
              });

            setOtp('');
            setSeconds(0);
            setOtpError('');
          } else {
            setOtpError(res.validationRespose);
          }
        })
        .catch(err => {
          console.warn(err);
          setOtpError('Something Went Wrong !');
        });
    }
  };

  const sendOtpToUser = React.useCallback(() => {
    sendOtp({
      mcc: countryCode,
      mobile: number,
      domain: 'banjee',
    })
      .then(res => {
        setTransactionCode(res.transactionCode);
      })
      .catch(err => {
        console.warn(err);
      });
  }, [countryCode, number]);

  React.useEffect(() => {
    sendOtpToUser();
  }, [sendOtpToUser]);

  React.useEffect(() => {
    if (seconds > 0) {
      setShowView('none');
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setShowView('auto');
    }
  }, [seconds]);

  React.useEffect(() => {
    return () => {
      setSeconds(null);
      setTransactionCode(null);
      setOtp('');
    };
  }, []);

  return (
    <BackGroundImg>
      <Card>
        <Image
          source={require('../../assets/logo.png')}
          style={[
            {height: 80, width: 80, marginBottom: 26, alignSelf: 'center'},
            styles.shadow,
          ]}
        />

        <View style={styles.txtBox}>
          <Text style={styles.txt1}>
            Please enter the 4 digit OTP, which is sent to the mobile number
            &nbsp;{str}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              fontStyle: 'italic',
              color: 'red',
            }}>
            {otpError}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            width: '100%',
          }}>
          <OtpInput
            inputContainerStyles={{marginTop: -10}}
            numberOfInputs={4}
            onChangeInput={e => {
              console.log(e);
            }}
            otp={otp}
            onDone={e => {
              console.log(e);
              setOtp(e);
            }}
          />
        </View>

        <View style={{marginTop: 20}}>
          {seconds > 0 && (
            <Text style={{paddingVertical: 10}}>
              {seconds + ' Seconds remaining'}
            </Text>
          )}
        </View>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Sign-In')}>
          Change phone number
        </Text>

        <AppButton
          style={{marginTop: 20, width: '100%'}}
          onPress={getOTP}
          title={'Proceed'}
        />

        {showView !== 'none' ? (
          <View style={{width: '100%'}} pointerEvents={showView}>
            <AppButton
              style={{
                marginTop: 10,
                width: '100%',
              }}
              onPress={() => {
                sendOtpToUser();
                setSeconds(30);
                setOtp(null);
              }}
              title={'Resend'}
            />
          </View>
        ) : (
          <View style={{width: '100%'}} pointerEvents={showView}>
            <AppButton
              disabled={true}
              style={{
                marginTop: 10,
                width: '100%',
              }}
              onPress={e => {
                setOtp(null);
              }}
              title={'Resend'}
            />
          </View>
        )}
      </Card>
    </BackGroundImg>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.card,
    zIndex: 0,
    width: 300,
    padding: 22,
    paddingBottom: 45,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  sign: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.white,
    justifyContent: 'space-evenly',
  },
  txtBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {textAlign: 'center', alignSelf: 'center'},

  underlineStyleBase: {
    width: 40,
    fontSize: 16,
    height: 40,
    color: color.black,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.black,
    backgroundColor: color.white,
  },

  underlineStyleHighLighted: {
    borderColor: color.black,
  },
  link: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: color.link,
  },
});

export default LoginWithOtp;
