import React, { useCallback, useState, useEffect } from 'react';
import { Image, Pressable } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

function CustomAnimatedIcon({ imageUri, size, style, pressedUri, liked, setLiked }) {

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const animateButton = useCallback(() => {
    scale.value = withSpring(1, { stiffness: 200 });
  }, []);

  useEffect(() => {
    animateButton();
  }, []);

  return (
    <Pressable
      onPress={() => {
        scale.value = 0;
        animateButton();
        setLiked(!liked)
      }}>
      <Animated.View>
        <AnimatedImage
          source={!liked ? imageUri : pressedUri}
          resizeMode={'contain'}
          style={[
            {
              height: size,
              width: size,
              tintColor: !liked ? 'black' : 'red',
            },
            rStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

export default CustomAnimatedIcon;
