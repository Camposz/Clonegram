import * as React from 'react';
import { View, Text } from 'react-native';
import RoundedProfile from '../components/RoundedProfile';
import { screenWidth, screenHeight } from '../Dimensions';
import { LinearGradient } from 'expo-linear-gradient';

const RoundedProfileStorie = ({ profilePic, size }) => {
const gradientSize = size * 1.07
  return (
    <LinearGradient
      colors={['#feda75', '#fa7e1e','#d62976']}
      start={{ x: -1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={{
        height: gradientSize,
        width: gradientSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: gradientSize / 2
      }}>
      <RoundedProfile
        imageUri={profilePic}
        size={size}
        borderColor={'white'}
        borderWidth={size * 0.05}
      />
    </LinearGradient>
  );
};

export default RoundedProfileStorie;
