import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import Bg from '../../../assets/background.png';

function BackGroundImg({style, children}) {
  return (
    <ImageBackground
      source={Bg}
      style={[styles.container, style]}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%', alignItems: 'center'},
});

export default BackGroundImg;
