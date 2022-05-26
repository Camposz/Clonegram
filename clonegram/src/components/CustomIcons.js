import * as React from 'react';
import { Image } from 'react-native';

function CustomIcons({imageUri, size, tintColor, style}) {

  return (
    <Image 
      source={imageUri} 
      resizeMode={"contain"} 
      style={[{
        height: size,
        width: size,
        tintColor: tintColor
      }, style]}/>
  );
}

export default CustomIcons;
