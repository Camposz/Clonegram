import * as React from 'react';
import { Image } from 'react-native';
import {screenWidth, screenHeight} from '../Dimensions'

function RoundedProfile({imageUri, size, borderColor, borderWidth}) {
  return (
    <Image 
      source={imageUri} 
      resizeMode={"cover"} 
      style={{
        height: size,
        width: size,
        borderRadius: Math.round(screenWidth + screenHeight) / 2,
        borderColor: borderColor != null ? borderColor : "transparent",
        borderWidth: borderWidth
      }}/>
  );
}

export default RoundedProfile;
